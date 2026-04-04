const { Mongoose } = require("mongoose");
const Category = require("../models/category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});
		console.log(CategorysDetails);
		return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};

exports.showAllCategories = async (req, res) => {
	try {
        console.log("INSIDE SHOW ALL CATEGORIES");
		const allCategorys = await Category.find({});
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};


exports.categoryPageDetails = async (req, res) => {
  try {
    console.log("📩 Request Body:", req.body);

    const { categoryId } = req.body;
    console.log("🧩 Category ID received:", categoryId);

    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        populate: {
          path: "instructor",
        },
      })
      .exec();

    console.log("📦 Selected Category:", selectedCategory);

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found in database",
      });
    }

    const categoriesExceptSelected = await Category.find({
      _id: { $ne: selectedCategory._id },
    }).populate("courses");

    console.log("🗂️ Other Categories:", categoriesExceptSelected.length);

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        categoriesExceptSelected,
      },
    });
  } catch (error) {
    console.error("❌ Error in getCategoryPageDetails:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
