"use server"

import { redirect } from "next/navigation"
import { getUserFromCookie } from "../lib/getUser"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();


async function sharedHaikuLogic(formData , user){
    const errors = {}
    
    const ourHaiku = {
      author:user.userId,
      line1:formData.get("line1"),
      line2:formData.get("line2"),
      line3:formData.get("line3")
    }
    // console.log(ourHaiku)

    if (ourHaiku.line1.length == 0) errors.line1 = "This field is required."
    if (ourHaiku.line2.length == 0) errors.line2 = "This field is required."
    if (ourHaiku.line3.length == 0) errors.line3 = "This field is required."

    return {
      errors,
      ourHaiku,
    }
}



export const createHaiku = async function(prevstate, formData){
  
  const user = await getUserFromCookie()
  if (!user){
    return redirect("/")
  }
  const results = await sharedHaikuLogic(formData,user)
  
  if (results.errors.line1 || results.errors.line2 || results.errors.line3) {
    return { errors: results.errors }
  }

  //save into db
  const saveHaiku = await prisma.haiku.create({
        data:{
          authorId:user.userId,
          line1:formData.get("line1"),
          line2:formData.get("line2"),
          line3:formData.get("line3")
        }
  })
  return redirect("/")

}

export const editHaiku = async function(prevstate,formData){

}