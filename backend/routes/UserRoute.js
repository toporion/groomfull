const router=require("express").Router();

const { createUser, loginUser, getUser, getUserByEmail, deleteUser, makeRole, getAllGroomers } = require("../controllers/UserController");
const { upload } = require("../middlewares/fileUploader");
const verifyRole = require("../middlewares/verifyRole");
const verifyToken = require("../middlewares/verifyToken");


router.post("/create",upload.single("profilePicture"),createUser);
router.post("/login",loginUser);
router.get("/users",verifyToken,verifyRole('admin'),getUser);
router.get('/user-by-email', getUserByEmail);
router.delete('/deleteUser/:id', deleteUser);
router.patch('/makerole/:id',verifyToken,verifyRole('admin'),makeRole)
router.get('/groomers',verifyToken,getAllGroomers)
module.exports=router;
