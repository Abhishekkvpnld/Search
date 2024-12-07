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

    console.log(data)


    const handleFilterData = async (value) => {
        let filterData;

        if (value === "all") {
            filterData = data.filter((user) => user?.category === "all");
        } else if (value === "traval") {
            filterData = data.filter((user) => user?.category === "traval");
        } else if (value === "technology") {
            filterData = data.filter((user) => user?.category === "technology");
        } else if (value === "Food") {
            filterData = data.filter((user) => user?.category === "Food");
        } else if (value === "Fashion") {
            // filterData = [...data].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            filterData = data.filter((user) => user?.category === "Fashion");
        }

        setData(filterData || data);
    };

    const fetchAllBlogs = async () => {
        try {
            const res = await axios.get(`${backend_url}/blog/all`, { withCredentials: true });
            if (res.data.success) {
                setData(res?.data?.data)
            }
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
        fetchAllBlogs();
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
                        <select onChange={(e) => handleFilterData(e.target.value)} className="px-6 bg-green-50 border py-1 font-semibold text-slate-500 rounded-md">
                            <option disabled value="" className="bg-slate-300">Filter</option>
                            <option value="all">All</option>
                            <option value="traval">Traval</option>
                            <option value="technology">Technology</option>
                            <option value="food">Food</option>
                            <option value="fashion">Fashion</option>
                        </select>
                        <select className="bg-blue-50 px-6 py-1 text-slate-600 font-semibold rounded-md">
                            <option disabled className="bg-slate-300" value="">Sort</option>
                            <option value="traval">Ascending  </option>
                            <option value="technology">Descending </option>
                        </select>
                    </div>
                </div>



            </div>

            <div className="w-[90%] grid grid-cols-3 gap-y-8 gap-1 mt-4">

                {
                    data?.map((item, index) => (
                        <BlogCard data={item} key={index} />
                    ))
                }
            </div>


        </div>
    )
}

export default Result;