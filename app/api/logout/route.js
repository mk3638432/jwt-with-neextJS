import { NextResponse } from "next/server";
const Responce = ({ obj, status }) => {
  return NextResponse.json(obj, {
    status,
  });
};

export const GET = async (req) => {
  try {
    const responce = Responce({
      obj: {
        error: null,
        message: "User Logout Succusully",
        success: true,
      },
      status: 201,
    });
    responce.cookies.delete("token");
    return responce;
  } catch (error) {
    return Responce({
      obj: { error: error.message, success: false },
      status: 500,
    });
  }
};
