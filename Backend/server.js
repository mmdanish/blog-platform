import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
// Add the following declarations after loading dotenv
const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_KEY;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected...."))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

// Middleware to authenticate users
const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// User registration route
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// User login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to create a post (protected)
app.post("/api/posts", authenticate, async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = new Post({
      title,
      content,
      author: req.user.userId,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Retrieve all posts (Public)
app.get("/api/posts", async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  let userId = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      userId = decoded.userId;
    } catch (error) {
      console.log("Token in invalid")
    }
  }

  try {
    const posts = await Post.find().populate("author", "name email");
    const postsWithAuth = posts.map((post) => ({
      ...post._doc, // Use ._doc to access the raw document
      isAuthor: userId ? post.author._id.toString() === userId : false,
    }));
    res.json(postsWithAuth);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Retrieve a specific post by ID (Public)
app.get("/api/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate("author", "name email");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a post (Protected)
app.put("/api/posts/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    post.title = title;
    post.content = content;

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a post (Protected)
app.delete("/api/posts/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Ensure the user is the author of the post
    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await Post.findByIdAndDelete(id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
