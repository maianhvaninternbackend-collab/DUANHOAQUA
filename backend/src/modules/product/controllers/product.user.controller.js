const productService = require("../product.service");
const handleServerError = require("../../../helpers/handleServerError");

module.exports.getAllProducts = async (req, res) => {
  try {
    const { search, sort, page, limit, category = "all" } = req.query;
   
    const filter = {
      isActive: true,
      onlyActiveCategory: true,
      category: category,
    };
    const result = await productService.getAllProductsService(
      search,
      sort,
      page,
      limit,
      filter
    );
    if (result.EC !== 0) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    handleServerError(res);
  }
};
module.exports.getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await productService.getProductBySlugService(slug);

    if (result.EC !== 0) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    handleServerError(res);
  }
};
module.exports.getProductByCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await productService.getProductsByCategory(id);
    if (result.EC !== 0) {
      return res.status(404).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    handleServerError(res);
  }
};
module.exports.getTopNewProducts = async (_, res) => {
  try {
 console.log("vào đây rồi nha")
    const result = await productService.getTopNewProductsService(
    );
    if (result.EC !== 0) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    handleServerError(res);
  }
};