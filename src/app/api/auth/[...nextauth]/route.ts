import NextAuth from "next-auth/next";
import { authOPtions } from "./options";

const handler=NextAuth(authOPtions)
export {handler as GET,handler as POST}