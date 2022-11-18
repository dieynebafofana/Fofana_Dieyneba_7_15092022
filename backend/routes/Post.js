const express = require("express");
const router = express.Router();

const PostCtrl = require("../controllers/Post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer.config");

router.get("/", auth, PostCtrl.AllPosts);
router.get("/:id", auth, PostCtrl.PostId);
// router.post("/", auth, multer, PostCtrl.AddPost);
router.post("/", auth, PostCtrl.AddPost);
router.post("/:id/like", auth, PostCtrl.likePost);
router.put("/:id", auth, multer, PostCtrl.ModifyPost);
router.delete("/:id", auth, PostCtrl.deletePost);



module.exports = router;
