import { postService } from '@/lib/services/postService';
import { Post } from '@/types/PostsTypes';

const Dashboard = async () => {
  const posts = await postService.getPosts();
  return (
    <div className="w-full flex justify-center px-24">
      <div className="grid w-full max-w-6xl grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4">
        {/* Feed */}
        <div className="flex flex-col items-center gap-4 p-8 text-gray-50">
          <h1 className="text-3xl font-bold">Feed</h1>

          {posts &&
            posts.map((post: Post) => (
              <div key={post._id}>
                <img
                  src={`${process.env.NEXT_PUBLIC_URL}/uploads/photos/${post.image}`}
                  alt={post.title}
                />
                <p>{post.title}</p>
              </div>
            ))}
        </div>

        {/* Profile */}
        <div className="flex flex-col gap-4 py-8 pl-8 text-gray-50">
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
