import dotenv from "dotenv";
import express from "express";
import ConnectDB from "./config/database";
import cors from "cors";
import router from "./routes/UserRoute";

const app = express();
dotenv.config();

//connecting data base
ConnectDB();
app.use(express.json());
app.use(cors({ origin: "*" })); //replacing star with frontend url
// app.use("/", (req, res) => {
//   res.send({ state: 200, message: "working fine..!" });
// });
app.use("/api", router);

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
