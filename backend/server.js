const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
const port = process.env.PORT;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  
  app.get('/',(req, res) => {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
    });
} 

  
  app.use(errorHandler);

  app.listen(port, () => console.log(`Server started on port ${port}`));