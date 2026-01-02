import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage for Instagram token and sessions
let instagramToken = process.env.INSTAGRAM_TOKEN || "";
const sessions = new Map();

// Admin credentials from environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "smokiecigar";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "smokielanchester";

// Middleware to verify session token
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  
  if (!token || !sessions.has(token)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  next();
};

// Admin login route
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Generate a simple session token
    const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    sessions.set(sessionToken, { username, createdAt: Date.now() });
    
    return res.json({ token: sessionToken });
  }
  
  res.status(401).json({ error: "Invalid credentials" });
});

// Update Instagram token route (protected)
app.post("/api/instagram/set-token", requireAuth, (req, res) => {
  const { token } = req.body;
  
  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }
  
  instagramToken = token;
  res.json({ success: true, message: "Token updated successfully" });
});

// Get Instagram posts route
app.get("/api/instagram/posts", async (req, res) => {
  try {
    if (!instagramToken) {
      return res.status(400).json({ error: "Instagram token not configured" });
    }

    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink&limit=10&access_token=${instagramToken}`
    );

    const data = await response.json();

    if (data.error) {
      return res.status(400).json(data.error);
    }

    res.json(data.data || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Instagram posts" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Instagram backend running on http://localhost:${PORT}`);
});
