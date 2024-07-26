
const express = require("express")
const router = express.Router()
const {createBlog,getAllBlog, unlockBlog,lockBlog, update_blog_by_id } = require("../../controller/blog_controller/blog.controller")
const {authorize} = require("../../middleware/autherization")

router.post("/",authorize(['user', 'admin']), createBlog)

router.get("/",authorize(['user', 'admin']), getAllBlog)

router.post("/:blog_id",authorize(['user', 'admin']), unlockBlog)

router.patch("/:blog_id", authorize(['user', 'admin']), update_blog_by_id)

router.post("/:blog_id",authorize(['user', 'admin']), lockBlog)



module.exports = router

