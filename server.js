const {sequelize, User, Blog} = require('./models');
const express = require('express');

const app = express();
app.use(express.json());

// Create a new blog
app.post('/blogs', async (req, res) => {
    const {title, content, userId} = req.body;
   
    try {
        const newBlog = await Blog.create({title, content, userId});
   
        return res.status(201).json({
            message: "blog created",
            data: newBlog
        });
   
    } catch (err) {
        console.log("error "+err);
        return res.status(500).json(err);
    }
});

// Get all blogs
app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            include: [User]
        });

        return res.status(200).json({
            message: "blogs retrieved",
            data: blogs
        });
    } catch (err) {
        console.log("error "+err);
        return res.status(500).json(err);
    }
});

// Get a blog by id
app.get('/blogs/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const blog = await Blog.findOne({
            where: {id},
            include: [User]
        });

        if (!blog) {
            return res.status(404).json({
                message: "blog not found"
            });
        }

        return res.status(200).json({
            message: "blog retrieved",
            data: blog
        });
    } catch (err) {
        console.log("error "+err);
        return res.status(500).json(err);
    }
});

// Update a blog by id
app.put('/blogs/:id', async (req, res) => {
    const id = req.params.id;
    const {title, content, userId} = req.body;

    try {
        const [numRowsUpdated, [updatedBlog]] = await Blog.update(
            {title, content, userId},
            {where: {id}, returning: true}
        );

        if (numRowsUpdated !== 1) {
            return res.status(404).json({
                message: "blog not found"
            });
        }

        return res.status(200).json({
            message: "blog updated",
            data: updatedBlog
        });
    } catch (err) {
        console.log("error "+err);
        return res.status(500).json(err);
    }
});

// Delete a blog by id
app.delete('/blogs/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const numRowsDeleted = await Blog.destroy({
            where: {id}
        });

        if (numRowsDeleted !== 1) {
            return res.status(404).json({
                message: "blog not found"
            });
        }

        return res.status(200).json({
            message: "blog deleted"
        });
    } catch (err) {
        console.log("error "+err);
        return res.status(500).json(err);
    }
});

app.listen({port:3000}, async () => {
    console.log('Server listening on http://localhost:3000');
    await sequelize.authenticate();
    console.log('Connected to db');
});
