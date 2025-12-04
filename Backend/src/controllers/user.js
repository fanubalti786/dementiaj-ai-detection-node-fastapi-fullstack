import { asyncHandler } from "../utils/AsyncHandler.js";
import ErrorHandler from "../utils/ApiError.js";
import { User } from "../models/user.js";
import { Analysis } from "../models/analysics.js";
import ApiResponse from "../utils/ApiResponse.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/Cloudinary.js";
import { sendEmail } from "../utils/send.Email.js";
import crypto from "crypto";
import axios from "axios";

const registerUser = asyncHandler(async (req, res) => {
  const existedUser = await User.findOne({ email: req.body.email });
  if (existedUser) {
    throw new ErrorHandler("User already exists", 400);
  }
  let avatar = null;
  if (req?.files?.avatar) {
    const avatarPath = req.files.avatar.tempFilePath;
    if (!avatarPath) {
      throw new ErrorHandler("avatar and resume path is required", 400);
    }
    avatar = await uploadOnCloudinary(avatarPath, "AVATARS");
  }
  const { fullName, email, password, type } = req.body;
  if (!fullName || !email || !password || !type) {
    throw new ErrorHandler("All fields are required", 400);
  }
  await User.create({
    fullName,
    email,
    password,
    type,
    avatar: avatar ? avatar.secure_url : null,
  });
  return res
    .status(201)
    .json({ success: true, message: "Successfully registered user" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ErrorHandler("All fields are required", 400);
  }

  const userExist = await User.findOne({ email });

  if (!userExist) {
    throw new ErrorHandler("password or email incorrect", 404);
  }
  const isPasswordCorrect = await userExist.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ErrorHandler("email or password incorrect");
  }

  const token = userExist.generatejsonwebtoken();
  const user = await User.findById(userExist._id).select("-password");
  res.status(200).json({
    success: true,
    message: "Successfully logged in",
    data: {
      user: user,
      token: token,
    },
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("token", null, options)
    .json(new ApiResponse(200, null, "User Logged Out Successfully"));
});
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ type: "user" });

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
});

const updateProfile = asyncHandler(async (req, res) => {
  const newUserData = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    aboutMe: req.body.aboutMe,
    portfolioUrl: req.body.portfolioUrl,
    githubUrl: req.body.githubUrl,
    instagramUrl: req.body.instagramUrl,
    linkedinUrl: req.body.linkedinUrl,
    twitterUrl: req.body.twitterUrl,
    facebookUrl: req.body.facebookUrl,
  };

  if (req.files && req.files.avatar) {
    const user = await User.findById(req.userId);
    const avatarId = user.avatar.public_id;
    const avatarPath = req.files.avatar.tempFilePath;
    console.log(avatarPath);
    if (!avatarPath) {
      throw new ErrorHandler("server error", 500);
    }
    await deleteOnCloudinary(avatarId);
    const avatar = await uploadOnCloudinary(avatarPath, "AVATARS");
    if (!avatar || avatar.error) {
      throw new ErrorHandler("Server error", 500);
    }
    newUserData.avatar = {
      public_id: avatar.public_id,
      url: avatar.url,
    };
  }

  if (req.files && req.files.resume) {
    const user = await User.findById(req.userId);
    const resumeId = user.resume.public_id;
    const resumePath = req.files.resume.tempFilePath;
    if (!resumePath) {
      throw new ErrorHandler("server error", 500);
    }
    await deleteOnCloudinary(resumeId);
    const resume = await uploadOnCloudinary(resumePath, "RESUMES");
    if (!resume || resume.error) {
      throw new ErrorHandler("Server error", 500);
    }
    newUserData.resume = {
      public_id: resume.public_id,
      url: resume.url,
    };
  }

  const user = await User.findByIdAndUpdate(req.userId, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res
    .status(200)
    .json(new ApiResponse(200, user, "Profile Updated Successfully!"));
});

const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new ErrorHandler("All fields are required", 400);
  }

  if (newPassword !== confirmPassword) {
    throw new ErrorHandler(
      "new password and confirm password do not match",
      400,
    );
  }

  const user = await User.findById(req.userId).select("+password");

  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  const isPasswordCorrect = await user.comparePassword(currentPassword);

  if (!isPasswordCorrect) {
    throw new ErrorHandler("Current password is incorrect", 400);
  }

  user.password = newPassword;
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, user, "Password updated successfully"));
});

const getUserForPortfolio = asyncHandler(async (req, res) => {
  const user = await User.findById("67bbfcf6f42e50793c938257");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ErrorHandler("Email is required", 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //http://google.com
  const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetPasswordUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    res.status(200).json(new ApiResponse(200, user, "Email sent successfully"));
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    throw new ErrorHandler("Email could not be sent", 500);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!token || !password || !confirmPassword) {
    throw new ErrorHandler("All fields are required", 400);
  }

  if (password !== confirmPassword) {
    throw new ErrorHandler(
      "new password and confirm password do not match",
      400,
    );
  }

  const resetpasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  console.log(resetpasswordToken);

  const user = await User.findOne({
    resetpasswordToken,
    resetpasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new ErrorHandler("Invalid your token or token has expired", 400);
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, user, "Password updated successfully"));
});
const addAnalysicsDementaiaData = asyncHandler(async (req, res) => {
  const { inputData, results } = req.body;

  if (
    !inputData ||
    !inputData.Gender ||
    !inputData.Age ||
    !inputData.EDUC ||
    inputData.MMSE === undefined ||
    inputData.CDR === undefined ||
    !inputData.eTIV ||
    !inputData.nWBV ||
    !inputData.ASF
  ) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, null, "Please provide all required input data"),
      );
  }
  if (
    !results ||
    results.has_dementia === undefined ||
    !results.diagnosis_reason ||
    !results.dementia_severity ||
    !results.prevention_or_treatment
  ) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, null, "Please provide complete analysis results"),
      );
  }
  if (inputData.Gender !== "M" && inputData.Gender !== "F") {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Gender must be M or F"));
  }

  const age = parseFloat(inputData.Age);
  if (isNaN(age) || age < 40 || age > 120) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Age must be between 40 and 120"));
  }

  const educ = parseFloat(inputData.EDUC);
  if (isNaN(educ) || educ < 0 || educ > 30) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Education must be between 0 and 30"));
  }

  const mmse = parseFloat(inputData.MMSE);
  if (isNaN(mmse) || mmse < 0 || mmse > 30) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "MMSE must be between 0 and 30"));
  }

  const cdr = parseFloat(inputData.CDR);
  if (isNaN(cdr) || cdr < 0 || cdr > 3) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "CDR must be between 0 and 3"));
  }
  const nwbv = parseFloat(inputData.nWBV);
  if (isNaN(nwbv) || nwbv <= 0 || nwbv > 1) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "nWBV must be between 0 and 1"));
  }
  const newAnalysis = await Analysis.create({
    userId: req.userId,
    inputData: {
      Gender: inputData.Gender,
      Age: parseFloat(inputData.Age),
      EDUC: parseFloat(inputData.EDUC),
      MMSE: parseFloat(inputData.MMSE),
      CDR: parseFloat(inputData.CDR),
      eTIV: parseFloat(inputData.eTIV),
      nWBV: parseFloat(inputData.nWBV),
      ASF: parseFloat(inputData.ASF),
    },
    results: {
      has_dementia: results.has_dementia,
      diagnosis_reason: results.diagnosis_reason,
      dementia_severity: results.dementia_severity,
      prevention_or_treatment: results.prevention_or_treatment,
      markdown_input_table: results.markdown_input_table,
      markdown_score_table: results.markdown_score_table,
      short_summary: results.short_summary,
      full_markdown_report: results.full_markdown_report,
    },
  });
  return res
    .status(201)
    .json(new ApiResponse(201, newAnalysis, "Analysis saved successfully"));
});
const getAnalyses = asyncHandler(async (req, res) => {
  const analyses = await Analysis.find({ userId: req.userId }).sort(
    "-createdAt",
  );
  return res
    .status(200)
    .json(new ApiResponse(200, analyses, "Analyses fetched successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  updateProfile,
  updatePassword,
  getUserForPortfolio,
  forgetPassword,
  resetPassword,
  getAllUsers,
  addAnalysicsDementaiaData,
  getAnalyses,
};
