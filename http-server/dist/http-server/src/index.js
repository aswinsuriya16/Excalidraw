import dotenv from "dotenv";
dotenv.config();
//TODO : .env is not loading
import express from "express";
import userRouter from "./routes/userRoutes.js";
const app = express();
app.use(express.json());
app.use("/api/user", userRouter);
app.get("/", (req, res) => {
    return res.send("Hello there");
});
app.listen(3000, () => {
    console.log("Port running on 3000");
});
//# sourceMappingURL=index.js.map