const {
  getAllCategoriesService,
  getCategoryById,
} = require("../category.service");
const handleServerError = require("../../../helpers/handleServerError");
module.exports.getAllCategories = async (req, res) => {
  try {
    const { search, sort, page, limit } = req.query;
    const filter = { isActive: true };
    const result = await getAllCategoriesService(
      search,
      sort,
      page,
      limit,
     
      filter
    );
    return res.status(200).json(result);
  } catch (error) {
    handleServerError(res);
  }
};

module.exports.getCategoryDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getCategoryById(id);

    if (result.EC === 0 && !result.DT) {
      return res.status(404).json({
        EC: 3,
        EM: "Không tìm thấy danh mục",
        DT: null,
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    handleServerError(res);
  }
};
