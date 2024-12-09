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


    const handleSortData = async (value) => {
        let sortedData;

        if (value === "accending") {
            sortedData = [...data].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (value === "descending") {
            sortedData = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        return setData(sortedData || data);
    };

    const fetchAllBlogs = async () => {
        try {
            const res = await axios.get(`${backend_url}/blog/all`, { withCredentials: true });
                setData(res?.data?.data || [])
            
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    };

    const handleFilterData = async (value) => {
        let filterData;

        if (value === "all") {
            filterData = data;
        } else {
            filterData = data.filter((user) => user?.category?.toLowerCase() === value.toLowerCase());
        }

        return setData(filterData || data);
    };

    const handleSearch = async () => {
        if (searchData) {
            try {
                const res = await axios.get(`${backend_url}/blog/search?content=${searchData}`, { withCredentials: true });
                setData(res?.data?.data);
                toast.success(res?.data?.message)
            } catch (error) {
                toast.error(error?.response?.data?.message);
            }
        } else {
            fetchAllBlogs();
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
                        <input type="text" placeholder="Search username or content..." className="px-2 py-1 rounded-md w-[100%]" value={searchData} onChange={(e) => setSearchData(e.target.value)} />
                        <span className="flex text-xl gap-1">
                            <IoIosClose onClick={() => setSearchData("")} title="clear" className={`text-white ${searchData ? "block" : "hidden"} bg-red-600 rounded-full hover:scale-125 transition-all`} />
                            <IoIosSearch title="search" className="hover:scale-125 cursor-pointer transition-all" onClick={handleSearch} />
                        </span>
                    </div>

                    <div className="flex items-center gap-5">
                        <select onChange={(e) => handleFilterData(e.target.value)} className="px-6 bg-green-50 border py-1 font-semibold text-slate-500 rounded-md">
                            <option value="" className="bg-slate-300">Filter</option>
                            <option value="all">All</option>
                            <option value="travel">Travel</option>
                            <option value="technology">Technology</option>
                            <option value="food">Food</option>
                            <option value="fashion">Fashion</option>
                        </select>
                        <select onChange={(e) => handleSortData(e.target.value)} className="bg-blue-50 px-6 py-1 text-slate-600 font-semibold rounded-md">
                            <option className="bg-slate-300" value="">Sort</option>
                            <option value="accending">Ascending  </option>
                            <option value="descending">Descending </option>
                        </select>
                    </div>
                </div>



            </div>

            <div className="w-[90%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-1 mt-4">
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