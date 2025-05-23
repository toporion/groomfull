const { createProduct, getAllProducts } = require("../controllers/ProductController");
const { upload } = require("../middlewares/fileUploader");
const verifyRole = require("../middlewares/verifyRole");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();

router.post('/productCreate',verifyToken,verifyRole,upload.single("profileImage"),createProduct)

router.get('/getAllProducts',verifyToken,verifyRole, getAllProducts)


module.exports = router;