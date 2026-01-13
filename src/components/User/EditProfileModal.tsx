import { useRef, useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateUser } from '@/store/features/authSlice';

import { Input } from '../ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { User, updateUserData } from '@/types/UserTypes';
import { updateUserSchema } from '@/Schemas/updateUser';

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: User;
}

const EditProfileModal = ({
  open,
  onOpenChange,
  profile,
}: EditProfileModalProps) => {
  const { register, handleSubmit, setValue, reset, control } = useForm({
    resolver: zodResolver(updateUserSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      bio: profile.bio || '',
    },
  });
  const { user, loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const max_chars = 150;

  const bioValue = useWatch({
    control,
    name: 'bio',
    defaultValue: '',
  });

  const handleSelectPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setValue('profileImage', file, { shouldValidate: true });

    setSelectedFile(file);

    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  const onSubmit = async (data: updateUserData) => {
    const updateData: updateUserData = { ...data };

    if (selectedFile) {
      updateData.profileImage = selectedFile;
    }

    try {
      await dispatch(updateUser(updateData)).unwrap();
      onOpenChange(false);
      router.push('/profile');
    } catch (err) {
      console.log('Erro ao atualizar o perfil:', err);
    }
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setPreview(null);
      reset(); // Reset do form também
    }
    onOpenChange(isOpen);
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const displayImage = preview || profile.profileImage;
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="w-[60vw] h-[80vh] p-0 overflow-hidden bg-gray-900 
                  text-gray-50 p-0 m-0 rounded-2xl border border-gray-700
                  flex flex-col items-center gap-8"
      >
        <DialogHeader className="flex items-start p-4 w-full max-w-8/10">
          <DialogTitle className="text-xl font-bold">Editar Perfil</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-4 overflow-hidden w-full max-w-8/10 px-4"
        >
          <input
            ref={fileInputRef}
            accept="image/*"
            onChange={handleChangePhoto}
            type="file"
            hidden
          />
          <div className="p-4 rounded-2xl flex justify-between bg-gray-950">
            <div className="flex gap-4">
              <img
                src={displayImage}
                alt={profile.username}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-base">
                  {profile.username}
                </span>
                <span className="text-sm text-gray-400">
                  {profile.firstName}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={handleSelectPhoto}
                type="button"
                className="bg-blue-600 rounded-lg p-2 px-4 text-gray-50 text-sm 
                font-semibold opacity-90 hover:opacity-100 cursor-pointer"
              >
                {preview ? 'Alterar Foto' : 'Selecionar Foto'}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor={profile.firstName}
              className="font-semibold text-base"
            >
              Primeiro Nome
            </label>
            <Input
              {...register('firstName')}
              className="border-gray-600 focus:border-gray-100 focus:border-1 
              h-12 py-3 rounded-lg text-gray-50 bg-transparent"
            />

            <label
              htmlFor={profile.lastName}
              className="font-semibold text-base"
            >
              Sobrenome
            </label>
            <Input
              {...register('lastName')}
              className="border-gray-600 focus:border-gray-100 focus:border-1 
              h-12 py-3 rounded-lg bg-transparent "
            />

            <label
              htmlFor={profile.firstName}
              className="font-semibold text-base"
            >
              Bio
            </label>
            <div className="relative">
              <textarea
                {...register('bio')}
                className="border-gray-600 border-1 focus:border-gray-100 
                rounded-lg text-gray-50 bg-transparent
                p-3 h-24 resize-none w-full pr-20"
                maxLength={max_chars}
              />
              <span className="absolute bottom-2 right-3 text-xs pointer-events-none text-gray-600">{`${
                bioValue?.length || 0
              } / ${max_chars}`}</span>
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 rounded-lg py-3 px-24 text-gray-50 text-sm 
                font-semibold opacity-90 hover:opacity-100 cursor-pointer w-full mt-4"
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
