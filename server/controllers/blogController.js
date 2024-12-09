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


export const search = async (req, res) => {
  try {
    const { content } = req.query;

    if (!content) {
      throw new Error("Please enter a content to search...");
    }


    const regExp = new RegExp(content, "i");
    const allDoc = await Blog.find({
      $or: [
        { username: { $regex: regExp } },
        { title: { $regex: regExp } },
        { description: { $regex: regExp } }
      ]
    });

    if (allDoc.length === 0) {
      return res.status(200).json({
        success: true,
        error: false,
        message: "No data found with the given content...❌",
        data: allDoc || [],
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      data: allDoc,
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