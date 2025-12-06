import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import { userRouter } from "./router/user.js";

import "./database/db.js";
import { blogsRouter } from "./router/blogsRouter.js";

const app = express();

app.use(cors());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
// app.use(fileUpload({
//     useTempFiles: true,
//     tempFileDir: path.join(__dirname, "tmp"),
// }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/blogs", blogsRouter);
app.use(errorMiddleware);

app.listen(3000, () => {
  console.log(`Server is running`);
});
