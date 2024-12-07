import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci"; import { IoShareSocialOutline } from "react-icons/io5";




const BlogCard = () => {
    return (
        <div className="w-[300px] bg-orange-200 flex flex-col justify-start rounded-md hover:shadow-lg">
            <img src="" alt="img" className="object-cover h-[100px] rounded-md" />

            <div className="flex flex-col justify-start p-2">
                <h1 className="line-clamp-2 font-semibold leading-4 mb-2">title Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, sunt, cum consequatur ea quidem inventore laudantium facilis delectus, deleniti eum quibusdam facere. Architecto voluptatibus quod quibusdam quis, modi est mollitia.20</h1>
                <p className="line-clamp-2 text-xs leading-3">description Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero magnam vitae consequatur iure alias neque eius fugit odit itaque quo.</p>
            </div>

            <div className="flex w-full items-center justify-between px-3 mb-2">

                <div className="flex items-center gap-2">
                    <img src="/avatar.png" className="w-8 h-8 rounded-full" alt="profile" />
                    <p className="font-medium text-sm text-slate-500">username</p>
                </div>

                <div className="flex items-center justify-center gap-3 p-1 mt-2 mb-2 ">
                    <SlLike className="hover:scale-110 transition cursor-pointer" />
                    <FaRegComment className="hover:scale-110 transition cursor-pointer" />
                    <IoShareSocialOutline className="hover:scale-110 transition cursor-pointer" />
                    <CiMenuKebab className="hover:scale-110 transition cursor-pointer" />
                </div>
            </div>

        </div>
    )
}

export default BlogCard;