import Blog from "../models/blogModel.js";

export const fetchAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find();

    return res.status(200).json({
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
    const { username, title, description, blogImg, profileImg, category } =
      req.body;
    await Blog.create({
      username,
      category,
      title,
      description,
      blogImg,
      profileImg,
    });

    return res.status(200).json({
        success:true,
        error:false,
        message:"Blog created...✅"
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};
