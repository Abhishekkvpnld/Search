import { IoIosClose, IoIosSearch } from "react-icons/io";
import axios from "axios";
import { backend_url } from "../utils/backend_url";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { MdOutlineExplore } from "react-icons/md";
import BlogCard from "./BlogCard";


const Result = () => {


    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState("");



    const handleFilterData = async (value) => {
        let filterData;

        if (value === "Active") {
            filterData = data.filter((user) => user?.status === "Active");
        } else if (value === "InActive") {
            filterData = data.filter((user) => user?.status === "InActive");
        } else if (value === "User") {
            filterData = data.filter((user) => user?.role === "User");
        } else if (value === "Admin") {
            filterData = data.filter((user) => user?.role === "Admin");
        } else if (value === "CreatedAt") {
            filterData = [...data].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        setData(filterData || data);
    };

    const fetchAllBlogs = async () => {
        try {
            const res = await axios.get(`${backend_url}/blog/all`, { withCredentials: true })
            setData(res?.data?.data);
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    };

    const handleSearch = async () => {
        if (searchData) {
            try {
                const res = await axios.get(`${backend_url}/blog/search?username=${searchData}`, { withCredentials: true });
                setData(res?.data?.data);
                toast.success(res?.data?.message)
            } catch (error) {
                toast.error(error?.response?.data?.message);
            }
        } else {
            toast.error("Please enter username...❌")
        }
    }

    useEffect(() => {
        // fetchAllUsers();
    }, []);


    return (
        <div className="flex items-center justify-center flex-col gap-2 w-[100vw] p-3 ">
            <h1 className="font-bold text-2xl text-slate-600 m-3 flex items-center justify-center text-center">Manage and Discover Blogs Your Way... <span><MdOutlineExplore color="red" /></span></h1>

            <div className="flex-row flex items-center justify-between px-4 gap-3 w-[100vw] ">

                <div className="w-full px-6 flex flex-col md:flex-row gap-3 md:gap-0 items-center justify-between">
                    <div className="flex items-center justify-between gap-2 pr-2 border-2 rounded-md w-[100%] md:w-[50%]">
                        <input type="text" placeholder="Search username..." className="px-2 py-1 rounded-md w-[100%]" value={searchData} onChange={(e) => setSearchData(e.target.value)} />
                        <span className="flex text-xl gap-1">
                            <IoIosClose onClick={() => setSearchData("")} title="clear" className={`text-white ${searchData ? "block" : "hidden"} bg-red-600 rounded-full hover:scale-125 transition-all`} />
                            <IoIosSearch title="search" className="hover:scale-125 cursor-pointer transition-all" onClick={handleSearch} />
                        </span>
                    </div>

                    <div className="flex items-center gap-5">
                        <select className="px-6 bg-green-700 text-white py-1 rounded-md">
                            <option value="">Filter</option>
                        </select>
                        <select className="bg-blue-600 px-6 py-1 text-white rounded-md">
                            <option className="bg-green-200" value="">Sort</option>
                        </select>
                    </div>
                </div>



            </div>

           <div className="w-[90%] grid grid-cols-3 gap-1 mt-4">
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
           </div>


        </div>
    )
}

export default Result;