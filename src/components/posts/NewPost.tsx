'use client';

import { useRef, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getProfile } from '@/store/features/authSlice';
import { API_URL } from '@/config/env';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { User, Smile } from 'lucide-react';
import { Input } from '@/components/ui/input';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';

interface newPostProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Preview {
  file: File;
  url: string;
  type: 'image' | 'video';
}

type Step = 'select' | 'details';

const NewPost = ({ open, onOpenChange }: newPostProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [step, setStep] = useState<Step>('select');
  const [title, setTitle] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const max_chars = 2200;

  function handleSelectFile() {
    fileInputRef.current?.click();
  }

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const type = file.type.startsWith('image') ? 'image' : 'video';

    const url = URL.createObjectURL(file);
    setPreview({ file, type, url });
  };

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    }

    console.log(process.env.NEXT_PUBLIC_API_URL);
    return () => {
      if (preview?.url) {
        URL.revokeObjectURL(preview.url);
      }
    };
  }, [preview, user, dispatch]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[60vw] h-[80vh] p-0 overflow-hidden bg-gray-800 
                  text-gray-50 p-0 m-0 rounded-xl border border-gray-700
                  flex flex-col"
      >
        <DialogHeader className="flex flex-row items-center justify-between bg-gray-950 p-3 border-b border-gray-600">
          {step === 'details' ? (
            <button
              type="button"
              onClick={() => setStep('select')}
              className="text-sm text-gray-300 hover:text-white cursor-pointer"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          <DialogTitle className="text-lg font-semibold">
            {step === 'select' ? 'Create new post' : 'Post details'}
          </DialogTitle>

          {step === 'select' && preview ? (
            <button
              type="button"
              onClick={() => setStep('details')}
              className="text-sm font-medium text-blue-500 hover:text-blue-400 cursor-pointer"
            >
              Next
            </button>
          ) : step === 'details' ? (
            <button
              type="button"
              className="text-sm font-medium text-blue-500 hover:text-blue-400 cursor-pointer"
            >
              Share
            </button>
          ) : (
            <div />
          )}
        </DialogHeader>
        <form className="flex flex-1 flex-col overflow-hidden">
          <Input
            ref={fileInputRef}
            accept="image/*,video/*"
            onChange={handleChangeFile}
            type="File"
            hidden
            className="bg-blue-500 cursor-pointer border-blue-500 focus:border-blue-500 outline-none"
          />
          {/* STEP 1 - Selecionar imagem */}
          {!preview && (
            <button
              type="button"
              onClick={handleSelectFile}
              className="m-auto flex h-64 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg "
            >
              <p className="text-2xl font-medium">
                Arraste seus vídeos ou fotos
              </p>
              <span className="text-lg text-muted-foreground">
                Ou clique para selecionar
              </span>
            </button>
          )}
          {/* STEP 2 - Preview da imagem selecionada*/}
          {preview && step === 'select' && (
            <div className="flex-1 w-full h-full">
              <div className="relative h-full w-full overflow-hidden bg-black">
                {preview.type === 'image' ? (
                  <img
                    src={preview.url}
                    alt="Preview"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <video
                    src={preview.url}
                    className="absolute inset-0 h-full w-full object-cover"
                    controls
                  />
                )}
                <button
                  type="button"
                  onClick={() => setPreview(null)}
                  className="absolute top-2 right-2 rounded bg-black/60 px-2 py-1 text-sm text-gray-50 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
          {/* STEP 3 - Detalhes + Formulário de Post */}
          {preview && step === 'details' && (
            <div className="flex flex-1 overflow-hidden">
              <div className="flex-[2] h-full bg-black">
                <div className="relative h-full w-full overflow-hidden">
                  {preview.type === 'image' ? (
                    <img
                      src={preview.url}
                      alt="Preview"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <video
                      src={preview.url}
                      className="absolute inset-0 h-full w-full object-cover"
                      controls
                    />
                  )}
                </div>
              </div>
              <div className="flex-[1] h-full p-6 flex flex-col gap-4 overflow-y-auto">
                <div className="flex gap-3 items-center">
                  {!user?.profileImage && (
                    <User className="bg-gray-600 rounded-full p-2 w-10 h-10" />
                  )}
                  {user?.profileImage && (
                    <img
                      src={`${API_URL}/uploads/users/${user.profileImage}`}
                      alt={user.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <span className="font-bold text-sm">{user?.username}</span>
                </div>
                <textarea
                  className="w-full h-32 rounded-md bg-transparent font-medium
                             focus:outline-none focus:border-blue-500 text-gray-50 resize-none"
                  value={title}
                  maxLength={max_chars}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white text-sm cursor-pointer"
                  >
                    <Smile size={20} />
                  </button>

                  <span
                    className={`flex justify-end text-xs ${
                      title.length >= max_chars
                        ? 'text-red-500'
                        : title.length > max_chars * 0.9
                        ? 'text-yellow-400'
                        : 'text-gray-400'
                    }`}
                  >
                    {title.length} / {max_chars}
                  </span>
                </div>
                {/* Picker Emoji */}
                {showEmojiPicker && (
                  <div className="relative mt-2">
                    <EmojiPicker
                      theme={Theme.DARK}
                      className="absolute w-full max-w-64 max-h-80"
                      searchDisabled
                      previewConfig={{ showPreview: false }}
                      onEmojiClick={(emojiData: EmojiClickData) => {
                        setTitle((prev) => prev + emojiData.emoji);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPost;
