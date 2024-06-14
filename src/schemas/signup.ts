import { z } from "zod";

const customEmailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const Sighupschema = z.object({
    username: z.string(),
    password:z.string().min(6,"Password should be of minimum 6 length"),
    email:z.string().regex(customEmailPattern,"Invalid email type")
  });