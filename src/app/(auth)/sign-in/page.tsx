"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { useState } from "react"
 
export default function SignIn() {
  const {data:session}=useSession()
  if(session){
    return(
    <>
        Signed in as {session.user.email}<br/>
        <button onClick={()=>signOut()}>Sign Out</button>
    </>
    )
  }
  return(
    <>
        Not Signed in <br/>
        <button
        className="bg-orange-500 py-1 px-3 m-4" 
        onClick={()=>signIn()}>Sign In</button>
    </>
  )
}