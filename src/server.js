const cors = require('cors');
const express = require('express');
const errorHandler = require('./middlewares/errorHandler.js');


const usersRoute = require('./routes/usersRoute.js');
const authRoutes = require('./routes/authRoutes.js');
const dotenv = require("dotenv")
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
)
app.use(express.json());
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send({message : "Welcome to the MERN Starter Backend!"});
})

app.use('/auth', authRoutes);
app.use('/users', usersRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

