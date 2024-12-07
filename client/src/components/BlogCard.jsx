import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci"; import { IoShareSocialOutline } from "react-icons/io5";




const BlogCard = ({ data }) => {
    return (
        <div className="w-[300px] bg-slate-50 border flex flex-col justify-start rounded-md hover:shadow-lg">
            <img src={data?.blogImg} alt="img" className="object-cover min-h-[100px]  max-h-[100px] rounded-md" />

            <div className="flex flex-col justify-start p-2">
                <h1 className="line-clamp-2 font-semibold leading-4 mb-2">{data?.title}</h1>
                <p className="line-clamp-2 text-xs leading-3">{data?.description}</p>
            </div>

            <div className="flex w-full items-center justify-between px-3 mb-2">

                <div className="flex items-center gap-2">
                    <img src={data?.profileImg} className="w-8 h-8 rounded-full" alt="profile" />
                    <p className="font-medium text-sm text-slate-500">{data?.username}</p>
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