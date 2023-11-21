import { ConncectDB } from "@/dbConfig/db";
import { userModel } from "@/models/UserModel.models";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
ConncectDB();
const Responce = ({ obj, status }) => {
  return NextResponse.json(obj, {
    status,
  });
};

export const POST = async (req) => {
  try {
    const { username, email, password } = await req.json();
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return Responce({
        obj: { error: "User Already Exist", success: false },
        status: 501,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hasspassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      username,
      email,
      password: hasspassword,
    });
    return Responce({
      obj: { error: null, message: "User Register Succusully", success: true },
      status: 201,
    });
  } catch (error) {
    return Responce({
      obj: { error: error.message, success: false },
      status: 500,
    });
  }
};
