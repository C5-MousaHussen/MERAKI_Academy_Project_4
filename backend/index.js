const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Import Routers
const usersRouter = require("./routes/user");
const loginRouter = require("./routes/login");
const postRouter = require("./routes/post");
const profileRouter = require("./routes/profile");


// Routes Middleware
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/posts", postRouter);

app.use("/profile", profileRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
