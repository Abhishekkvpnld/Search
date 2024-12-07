import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import BlogRoute from "./routes/blogRoute.js";
import { dbConnect } from "./config/dbConnection.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
  })
);

app.use("/api/v1/blog", BlogRoute);

app.get("/", (req, res) => {
  res.send("Server running...");
});

const Port = process.env.PORT;

dbConnect().then(() => {
  app.listen(Port, () => {
    console.log(`Server running on port ${Port}`);
  });
});
