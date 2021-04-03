const express = require("express");
const dotenv = require("dotenv");
const corsConfig = require("./middlewares/corsConfig");
// const bodyParser = require("body-parser")
// const cors= require("cors")
const indexRoutes = require("./routes/rootRouter");
dotenv.config();
const PORT = process.env.PORT || 5500;
// init express
const app = express();
// app.use(cors)
app.use(corsConfig)
// app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
// app.use(bodyParser.json())
app.use(express.json());

app.use("/", indexRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port:${PORT}`);
});
