const jwt = require("jsonwebtoken")
const db = require("../../../config/db.config")
const { where,Sequelize } = require("sequelize")
const User = db.user
const Blog = db.blog
const access_secret_key = process.env.ACCESS_SECRET_KEY



// create Blog 
exports.createBlog = async (req, res) => {
   
    try {
        const { title, content, } = req.body
        const isEmptykey = Object.keys(req.body).some(key => {
            const value = req.body[key]
            return value === '' || value === null || value === undefined;
        })
        if (isEmptykey) {
            return res.status(400).json({ error: "please do not give empty fileds" })
        }

        const creatingBlog = await Blog.create({
            title: title,
            content: content
        })

        return res.status(200).json({
            status: true,
            message: "Blog created successfully",
            data: creatingBlog
        })

    }
    catch (error) {
        console.error('Add_Blog_error:', error.message);
        return res.status(500).json({ 
            status : false,
            message: 'Internal Server error' 
        });
    }
}


//Updat blog by its id  
exports.update_blog_by_id = async (req, res) => {
    try {

        const auth_header = req.headers['authorization']

        if (!auth_header) {
            return res.status(401).json({ message: 'Authorization header missing' })
        }
        const token = auth_header.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Bearer token missing' });
        }
        const decode_Token = jwt.verify(token, access_secret_key)
        const find_user = await User.findByPk(decode_Token.id)
        if (!find_user) {
            return res.status(400).json({ error: "Invalid access token" })
        }


        const id = req.params.blog_id 
        const {title, content} = req.body
        if(!id){
            return res.status(400).json({
                status :false,
                message : "Please provide blog id"
            })
        }
        const blog = await Blog.findByPk(id)
        if(!blog){
            return res.status(400).json({
                status : false,
                message : "Blog not found"
            })
        }
        const time_of_updation = Date.now()
    //     const updateNote = await .update({
    //         title : title,
    //         body : body,
    //         updation_time : time_of_updation
    //     },
    //    { where : {id : id}})

    if (blog.isLocked && blog.lockedBy !== find_user.id) {
        return res.status(400).json({ msg: 'Blog is currently locked by another user' });
      }
  
      blog.title = title;
      blog.content = content;
      blog.lastEditedBy = find_user.id;
      blog.isLocked = false;
    //   blog.lockedBy = null;
    //   blog.lockedAt = null;
  
      await blog.save();

        return res.status(200).json({
            status: true,
            message: "Blog edited successfully",
            data: blog
        })

    }
    catch (error) {
        console.error('Update_blog_by_id_error:', error.message);
        return res.status(500).json({ 
            status : false,
            message: 'Internal Server error' 
        });
    }
}


exports.lockBlog = async (req, res) => {
    try {

        const auth_header = req.headers['authorization']

        if (!auth_header) {
            return res.status(401).json({ message: 'Authorization header missing' })
        }
        const token = auth_header.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Bearer token missing' });
        }
        const decode_Token = jwt.verify(token, access_secret_key)
        const find_user = await User.findByPk(decode_Token.id)
        if (!find_user) {
            return res.status(400).json({ error: "Invalid access token" })
        }


        const id = req.params.blog_id 
        if(!id){
            return res.status(400).json({
                status :false,
                message : "Please provide blog id"
            })
        }
        const blog = await Blog.findByPk(id)
      if (!blog) {
        return res.status(404).json({ msg: 'Blog not found' });
      }
  
      if (blog.isLocked && blog.lockedBy !== find_user.id) {
        return res.status(400).json({ msg: 'Blog is currently locked by another user' });
      }
  
      blog.isLocked = true;
      blog.lockedBy = find_user.id;
      blog.lockedAt = Date.now();
  
      await blog.save();
      return res.status(200).json({
        status: true,
        message: "Blog locked successfully",
    })
    } catch (error) {
        console.error('lock_blog_by_id_error:', error.message);
        return res.status(500).json({ 
            status : false,
            message: 'Internal Server error' 
        });
    }
  };


  exports.unlockBlog = async (req, res) => {
    try {

        const auth_header = req.headers['authorization']

        if (!auth_header) {
            return res.status(401).json({ message: 'Authorization header missing' })
        }
        const token = auth_header.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Bearer token missing' });
        }
        const decode_Token = jwt.verify(token, access_secret_key)
        const find_user = await User.findByPk(decode_Token.id)
        if (!find_user) {
            return res.status(400).json({ error: "Invalid access token" })
        }

        const id = req.params.blog_id 
        if(!id){
            return res.status(400).json({
                status :false,
                message : "Please provide blog id"
            })
        }

        const blog = await Blog.findByPk(id)
      if (!blog) {
        return res.status(404).json({ msg: 'Blog not found' });
      }
  
      if (blog.lockedBy !== find_user.id) {
        return res.status(400).json({ msg: 'You cannot unlock a blog locked by another user' });
      }
  
      blog.isLocked = false;
      blog.lockedBy = null;
      blog.lockedAt = null;
      blog.unlockedBy = find_user.id
  
      await blog.save();
      res.json(blog);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


  exports.getAllBlog = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const pageSize = parseInt(req.query.pageSize) || 5
        const offset = (page - 1) * pageSize
        const All_blog = await Blog.findAll(
            {
                offset: offset,
                limit: pageSize
            }
        )
        if(!All_blog){
            return res.status(400).json({
                status : false,
                message : "Blogs are not exists"
            })
        }

        return res.status(200).json({
            status: true,
            message: "Blogs retrived successfully",
            data: All_blog
        })

    }
    catch (error) {
        console.error('Get_All_Blogs_error:', error.message);
        return res.status(500).json({ 
            status : false,
            message: 'Internal Server error' 
        });
    }
}