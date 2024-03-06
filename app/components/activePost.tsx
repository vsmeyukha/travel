import { Post } from "../postsData";
import TelegramIcon from '@/public/telegram-svgrepo-com.svg';
import Cross from '@/public/cross.svg';

type ActivePostProps = {
  post: Post,
  setPost: React.Dispatch<React.SetStateAction<Post | null>>,
}

export default function ActivePost({ post, setPost }: ActivePostProps) {  
  return (
    <div
      className="
      w-4/5
      sm:w-[500px] 
      bg-white 
      p-6 
      rounded-md 
      absolute
      top-1/2
      z-30 
      flex 
      flex-col 
      gap-2"
    >
      <Cross
        onClick={() => setPost(null)}
        className="h-[20px] w-[20px] absolute top-3 right-3 text-gray-400 hover:cursor-pointer"
      />
      <h1 className="text-black font-extrabold text-[24px] leading-[28px]">{post.title}</h1>
      <p className="text-gray-500">{post.description}</p>
      <div className="flex flex-col gap-2">
        {post.offroad && 
          <div className="bg-gray-300 text-gray-500 font-bold text-[12px] rounded-sm self-start">
            <p className="mx-[8px]">Бездорожье</p>
          </div>
        }
        <div className="bg-gray-300 text-gray-500 font-bold text-[12px] rounded-sm self-start">
          <p className="mx-[8px]">{post.typeOfTourism}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <a href={`${post.drive2Link}`} target="_blank" className="text-blue-500 font-bold hover:underline">Читать на DRIVE2</a>
        <a href={`${post.tgLink}`} target="_blank" className="">
          <TelegramIcon className="w-6 h-6 transform hover:scale-110 transition-all duration-200" />
        </a>
      </div>
    </div>
  );
}
