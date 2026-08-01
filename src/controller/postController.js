import Post from '../models/postModel'

const createPost = async (req, res) => {
    const {description, title, image} = req.body;
    if(!description || !title || !image) {
        return res.status(404).json({
            success: false,
            message: "all field are required"
        })
    }
    const newEntry = await Post.create({
        description,
        title,
        image
    })

    res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: newEntry
    })

}