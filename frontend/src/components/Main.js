import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Grid, CircularProgress, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// Mock blog data
const mockBlogs = [
  { id: 1, title: "My First Blog Post", content: "This is the content of the first blog post." },
  { id: 2, title: "Another Blog Post", content: "This is the content of another blog post." },
  { id: 3, title: "Yet Another Blog", content: "This is the content of yet another blog." },
];

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      setBlogs(mockBlogs);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEditClick = (blog) => {
    setEditBlog(blog);
    setFormData({ title: blog.title, content: blog.content });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditBlog(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    setBlogs(prevBlogs =>
      prevBlogs.map(blog =>
        blog.id === editBlog.id ? { ...blog, ...formData } : blog
      )
    );
    handleClose();
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        All Blogs
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : blogs.length === 0 ? (
        <Typography>No blogs available.</Typography>
      ) : (
        <Grid container spacing={3}>
          {blogs.map(blog => (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <Paper elevation={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {blog.content}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(blog)}
                      style={{ marginTop: '16px' }}
                    >
                      Edit
                    </Button>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Blog</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={formData.content}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BlogList;
