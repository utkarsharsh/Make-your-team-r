import { OtpModel } from "@/models/Otp";
import UserModel from "@/models/UserSchema";
import { dbconnect } from "@/dbConfig/dbConfig";

export async function POST( request:Request){

    await dbconnect();
const {email,code,username}=await request.json();
const otp= await OtpModel.findOne({
    email
});

if(otp){
    console.log(otp?.expiry);  
if(otp.otp==code ){
   const user=await UserModel.findOne({username});
   if(user){
    user.isverifed=true;
    await user.save();
   }
   else{
    return Response.json({
        status:false,
        message:"Invalid user "
    });
   }
    return Response.json({
        status:true,
        message:"Your are verified"
    })
}
else {
    return Response.json({
        status:false,
        message:"Wrong otp"
    });

}
}
return Response.json({
    status:false,
    message:"Something went wrong"
});


}