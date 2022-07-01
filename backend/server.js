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


app.use('/api', require(path.join(__dirname, 'routes', 'goalRoutes.js', 'userRoutes.js')))
// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('/*', (req, res) =>
    res.sendFile(
      path.join(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} 

  
  app.use(errorHandler);

  app.listen(port, () => console.log(`Server started on port ${port}`));