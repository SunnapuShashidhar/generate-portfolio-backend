"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const cors_1 = __importDefault(require("cors"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const DashBoard_1 = __importDefault(require("./routes/DashBoard"));
const app = (0, express_1.default)();
dotenv_1.default.config();
//connecting data base
(0, database_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
app.use("/api", UserRoute_1.default);
app.use("/dash", DashBoard_1.default);
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});
