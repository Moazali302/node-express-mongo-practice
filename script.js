const fs = require("fs");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }, // 1 minute expiry
  })
);

// Static files
app.use(express.static(path.join(__dirname, "public")));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// -------------------- Authentication Routes --------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "12345") {
    // Save in cookie
    res.cookie("username", username, { maxAge: 700000, httpOnly: true });

    // Save in session
    req.session.user = username;

    res.send(
      `Login successful <br><a href='/profile'>Go to Profile</a>`
    );
  } else {
    res.send("Invalid credentials  <br><a href='/'>Try Again</a>");
  }
});

app.get("/profile", (req, res) => {
  if (req.session.user) {
    res.send(
      `Hello ${req.session.user}, (from SESSION) Welcome Back! <br><a href='/logout'>Logout</a>`
    );
  } else if (req.cookies.username) {
    res.send(
      `Hello ${req.cookies.username}, (from COOKIE) Welcome Back! <br><a href='/logout'>Logout</a>`
    );
  } else {
    res.send("No session/cookie found  <br><a href='/'>Login</a>");
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("username");

  req.session.destroy(() => {
    res.send(
      "Logged out (Session + Cookie cleared) <br><a href='/'>Login again</a>"
    );
  });
});

// -------------------- File System Routes --------------------
app.get("/files", (req, res) => {
  fs.readdir("./files", function (err, files) {
    if (err) return res.status(500).send("Error reading files");
    res.render("index", { files: files });
  });
});

app.get("/file/:filename", function (req, res) {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, filedata) {
    if (err) {
      return res.status(500).send("Error reading file");
    }
    res.render("show", { filename: req.params.filename, filedata: filedata });
  });
});

app.get("/edit/:filename", function (req, res) {
  res.render("edit", { filename: req.params.filename });
});

app.post("/edit", function (req, res) {
  fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, function (err) {
    if (err) return res.status(500).send("Error renaming file");
    res.redirect("/files");
  });
});

app.post("/create", function (req, res) {
  fs.writeFile(`./files/${req.body.title}.txt`, req.body.details, function (err) {
    if (err) return res.status(500).send("Error creating file");
    res.redirect("/files");
  });
});

// -------------------- MongoDB + Mongoose --------------------
const userModel = require("./user_model");

app.get("/createUser", async (req, res) => {
  try {
    const createdUser = await userModel.create({
      name: "Muaz",
      age: 20,
      username: "muazjutt",
      email: "moazj048@gmail.com",
    });
    res.send(createdUser);
  } catch (err) {
    res.status(500).send("Error creating user: " + err.message);
  }
});

// -------------------- 404 Handler --------------------
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// -------------------- Start Server --------------------
app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
