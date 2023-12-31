import dotenv from "dotenv";
import express from "express";
import ConnectDB from "./config/database";
import cors from "cors";
import router from "./routes/UserRoute";
import dashboard from "./routes/DashBoard";

const app = express();
dotenv.config();

//connecting data base
ConnectDB();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api", router);
app.use("/dash", dashboard);
let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
