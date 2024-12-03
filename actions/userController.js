"use server"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

function isAlphaNumberic(x){
    const regex = /^[a-zA-z0-9]*$/
    return regex.test(x)
}

export const register = async function(prevState,formData){
    const errors = {}

    const ourUser = {
      username:formData.get("username"),
      password:formData.get("password")
    }
    if(typeof ourUser.username != "string") ourUser.username = ""
    if(typeof ourUser.password != "string") ourUser.password = ""
    
    ourUser.username = ourUser.username.trim()
    ourUser.password = ourUser.password.trim()

    if(ourUser.username.length < 3) errors.username = "Username must be at least 3 characters"
    if(ourUser.username.length > 30) errors.username = "Username must be at less than 30 characters"
    if(!isAlphaNumberic(ourUser.username)) errors.username = "Username can only contain letters and numbers" 
    if(ourUser.username == "")errors.username = "You must provide a username"

    if(ourUser.password.length < 5) errors.password = "password is too short"
    if(ourUser.password.length > 50) errors.password = "password must be at less than 30 characters"
    if(ourUser.password == "")errors.password = "You must provide a password"

    if(errors.username || errors.password){
      return {
        errors:errors,
        sucess:false
      }
    }

   

    //storign new user in database
    const user = await prisma.user.create({
      data:{
        username:ourUser.username,
        password:ourUser.password
      }
    })

    return{
      sucess:true
    }
}