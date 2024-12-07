import Blog from "../models/blogModel.js";

export const fetchAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find();

    res.status(200).json({
      success: true,
      error: false,
      data: allBlogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { username, title, description, blogImg, profileImg } = req.body;
    await Blog.create({
      username,
      title,
      description,
      blogImg,
      profileImg,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};
