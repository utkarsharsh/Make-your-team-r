import { dbconnect } from "@/dbConfig/dbConfig";
import  UserModel  from "@/models/UserSchema";
import VerificationEmail from "../../../../email/EmailTemplates"
import { Resend } from 'resend';
import { OtpModel } from "@/models/Otp";
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
import axios from "axios";
import bcrypt from "bcryptjs"

export async function POST( request:Request){
    await dbconnect();
    const {username,email,password,token}=await request.json();
    try{  
        const {data}= await  axios.post("https://www.google.com/recaptcha/api/siteverify",{
        secret:`${process.env.NEXT_PUBLIC_SECRETROBO}`,
        response:token
    },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    if(!data.success) 
        return    Response.json({
        status:false,
        message:"Invalid capcha"
    });
    
}
catch (err){
    return  Response.json({
        status:false,
        message:"Invalid capcha"
    })
}

    const user= await UserModel.findOne({username});
    const userbyemail= await UserModel.findOne({email});
    if(user && !user.isverified ) {
        return Response.json({
            status:false,
            message:"username is already taken"
        })
    }
    // mailing
    const verifyotp = Math.floor(100000 + Math.random() * 900000).toString();
    try{
    const otp=await OtpModel.findOneAndDelete({email});
    const newotp=await OtpModel.create({email,otp:verifyotp,expiry:(Date.now()).toString()});
    await newotp.save();
    }
    catch(err){
        console.log(err);
    }
     
    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ["harshupadhyay7786@gmail.com"],
        subject: 'Verification',
        react: VerificationEmail({ username,otp:verifyotp }),
      });
    
      if (error) {
        console.log(error);
        return Response.json({
            status:false,
            message:"Error with email"
        })
      }
      var salt =  bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
    const newuser= await UserModel.create({
        username,email,password:hash
    });
    await newuser.save();
    
    return Response.json({
        status:true,
        message:"You are registered"
    })
    };



    
    

