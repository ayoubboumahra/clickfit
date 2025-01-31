const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: "public/images/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Set EJS as the template engine
app.set("view engine", "ejs");

// Serve static files from "public" directory
app.use(express.static("public"));

// Define a route
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/text", async(req, res) => {
  const response = await fetch("http://numbersapi.com/1/30/date?json");
  const data = await response.json();
  res.json(data);
})

// Handle file upload
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ imageUrl: `./images/${req.file.filename}` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
