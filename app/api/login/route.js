import { ConncectDB } from "@/dbConfig/db";
import { userModel } from "@/models/UserModel.models";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
ConncectDB();
const Responce = ({ obj, status }) => {
  return NextResponse.json(obj, {
    status,
  });
};

export const POST = async (req) => {
  try {
    const { email, password } = await req.json();
    const existUser = await userModel.findOne({ email });
    if (!existUser) {
      return Responce({
        obj: { error: "User Not Exist", success: false },
        status: 400,
      });
    }
    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) {
      return Responce({
        obj: { error: "Credetials Not Valid", success: false },
        status: 401,
      });
    }
    const token = jwt.sign(
      { userId: existUser._id },
      "27eehss3gheeg2h72728hss",
      {
        expiresIn: "1d",
      }
    );
    const response = Responce({
      obj: {
        error: null,
        message: "User Register Succusully",
        token,
        success: true,
      },
      status: 201,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
    // return Responce({
    //   obj: {
    //     error: null,
    //     message: "User Register Succusully",
    //     token,
    //     success: true,
    //   },
    //   status: 201,
    // }).cookies.set("token", token, {
    //   httpOnly: true,
    // });
  } catch (error) {
    return Responce({
      obj: { error: error.message, success: false },
      status: 500,
    });
  }
};
