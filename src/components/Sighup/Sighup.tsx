import React, { useState } from 'react';
import { Sighupschema } from '@/schemas/signup'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { string, z } from "zod"
import { Button } from "@/components/ui/button"
import ReCAPTCHA from "react-google-recaptcha";
import { Loader2 } from "lucide-react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import axios from 'axios';
import { useRouter } from 'next/navigation'
const Sighup = () => {
  const router=useRouter()
  const { toast } = useToast()
  const [token, setToken] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [username, setusername] = useState<string>("");
  const [otppage, setotppage] = useState<boolean>(false);
  const [otploader, setotploder] = useState<boolean>(false);
  const [otp,setotp]=  useState<string>("");
  const [sloader, setsloder] = useState<boolean>(false);
  const cap=process.env.NEXT_PUBLIC_RECHAPCHA_KEY;
 
  const form = useForm<z.infer<typeof Sighupschema>>({
    resolver: zodResolver(Sighupschema),
    defaultValues: {
      username: "",
      email:"",
      password:""
    },
  })
async  function  onSubmit(values: z.infer<typeof Sighupschema>) {
    setsloder(true)
    if(token==""){
     
      toast({
        title: "Invalid ReCAPTCHA",
        description: "Revalided the ReCAPTCHA",
      });
      setsloder(false)
    
 return;
    }
 
  let x={...values,...{token:token}};
  type resposes={data:
    {status?:boolean,
    message?:string}
  } 
  const {data}:resposes= await axios.post("http://localhost:3000/api/signup",x);
  if(data.status){
    setusername(x.username);
    setemail(x.email);
    toast({
      title: "Signup successful",
      description: "verify email",
    });
    setsloder(false)
    setotppage(true);
  }
  else{
    toast({
      title: "Signup failed",
      description: `${data.message}`,
    });
    setsloder(false)
  }


  setsloder(false);
  }

  async function handleotpverification(){
    setotploder(true);
    if(username=="" || email=="") {
      setotploder(false);
      toast({
        title: "Otp",
        description: "Error || Refresh and try again",
      });
      return;
    }
    if(otp.length<6){
      toast({
        title: "Otp",
        description: "Enter valid otp",
      });
      setotploder(false);
      return;
    }
    let x={
      username,email,code:otp
    }
    type resposes={data:
      {status?:boolean,
      message?:string}
    } 
    console.log(x);
    try{
    const {data}:resposes= await axios.post("http://localhost:3000/api/verify",x);
    if(data.status){
      toast({
        title: `${data.status}`,
        description: `${data.message}`,
      });
      router.push("http://localhost:3000/api/auth/signin");
      return;
    }
    toast({
      title: `${data.status}`,
      description: `${data.message}`,
    });
    setotploder(false);}
    catch (err){
      setotploder(false);
      alert(err);
    }
  }
  function setTokenFunc(getToken:string)  {
    setToken(getToken);
  };

if(otppage) return(<>

<h1>Verify your Account</h1>
<InputOTP maxLength={6}
onChange={(e)=>{setotp(e) }}
>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
{otploader ? <Button disabled >
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button> :<Button onClick={handleotpverification}>Verify</Button>
  }
</>
)

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="Username" {...field}  />
            </FormControl>
            <FormDescription>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Email" {...field}  />
            </FormControl>
            <FormDescription>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input placeholder="Password" {...field} />
            </FormControl>
            <FormDescription>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      /> 
      {
        <ReCAPTCHA
        sitekey={cap}
        onChange={setTokenFunc}
        />
      } 
     {sloader ? <Button disabled >
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button> :<Button type="submit">Button</Button>
  }
    </form>
   
  </Form>

  )
}

export default Sighup