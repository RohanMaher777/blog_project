
const express = require("express")
const router = express.Router()
const user = require("./user_routes/user.routes")
const blog = require("./blog_routes/blog.routes")
// const employee = require("./employee_routes/employee.routes")


router.use("/users", user)

router.use("/blog", blog)

// router.use("/employee", employee)


module.exports = router

