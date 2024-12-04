"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function isAlphaNumberic(x) {
  const regex = /^[a-zA-z0-9]*$/;
  return regex.test(x);
}

export const login = async function (prevState, formData) {

  const failObject={
    sucess:false,
    message:"Invalid username / Password"
  }

  const ourUser = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  if (typeof ourUser.username != "string") ourUser.username = "";
  if (typeof ourUser.password != "string") ourUser.password = "";

  const user = await prisma.user.findUnique({
    where:{
      username:ourUser.username
    }
  })
  if(!user){
    return failObject
  }

  const matchOrNot =  bcrypt.compareSync(ourUser.password , user.password)

  if(!matchOrNot){
    return failObject
  }

  //create JWT value
  const ourTokenValue = jwt.sign(
    {
      userId: user.id,
      exp: Math.floor(Date.now() / 100) + 60 * 60 * 24,
    },
    process.env.JWT_SECRET
  );

  //log the user in by giving them a cookie

  const cookiesInstance = await cookies();

  cookiesInstance.set("haikuapp", ourTokenValue, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    secure: true,
  });
  console.log("Welcome" + user.username)
  return redirect("/")

};




export const logout = async function () {
  (await cookies()).delete("haikuapp");
  redirect("/");
};




export const register = async function (prevState, formData) {
  const errors = {};

  const ourUser = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  if (typeof ourUser.username != "string") ourUser.username = "";
  if (typeof ourUser.password != "string") ourUser.password = "";

  ourUser.username = ourUser.username.trim();
  ourUser.password = ourUser.password.trim();

  if (ourUser.username.length < 3)
    errors.username = "Username must be at least 3 characters";
  if (ourUser.username.length > 30)
    errors.username = "Username must be at less than 30 characters";
  if (!isAlphaNumberic(ourUser.username))
    errors.username = "Username can only contain letters and numbers";
  if (ourUser.username == "") errors.username = "You must provide a username";

  //check the username exists
  const checkExists = await prisma.user.findUnique({
    where:{
      username:ourUser.username
    }
  })
  if(checkExists)errors.username = "Username already exists."


  if (ourUser.password.length < 5) errors.password = "password is too short";
  if (ourUser.password.length > 50)
    errors.password = "password must be at less than 30 characters";
  if (ourUser.password == "") errors.password = "You must provide a password";

  if (errors.username || errors.password) {
    return {
      errors: errors,
      sucess: false,
    };
  }

  //hash password first
  const salt = bcrypt.genSaltSync(10);
  ourUser.password = bcrypt.hashSync(ourUser.password, salt);

  //storign new user in database
  const user = await prisma.user.create({
    data: {
      username: ourUser.username,
      password: ourUser.password,
    },
  });

  //create JWT value
  const ourTokenValue = jwt.sign(
    {
      userId: user.id,
      exp: Math.floor(Date.now() / 100) + 60 * 60 * 24,
    },
    process.env.JWT_SECRET
  );

  //log the user in by giving them a cookie

  const cookiesInstance = await cookies();

  cookiesInstance.set("haikuapp", ourTokenValue, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    secure: true,
  });

  return {
    sucess: true,
  };
};
