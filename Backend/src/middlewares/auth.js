import dotenv from "dotenv";
import { asyncHandler } from "../utils/AsyncHandler.js";
import ErrorHandler from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
dotenv.config();

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    throw new ErrorHandler("Please login to access this resource", 401);
  }
  const decoded = jwt.verify(
    token,
    "asldkfj20398402394as;dfka;sldkfja;lskdjf;lasjd;lfkjs;l",
  );
  req.userId = decoded.id;
  next();
});

export { isAuthenticated };
