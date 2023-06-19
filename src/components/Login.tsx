"use client";
import { signIn, signOut } from "next-auth/react";
import { DefaultSession } from "next-auth";
import { FC } from "react";

const Login: FC<{ session: DefaultSession | null }> = ({ session }) => {
  if (session) {
    return (
      <>
        <button onClick={() => signOut()} type="button">
          Sign Out of Google
        </button>
        Pass session info to server component
      </>
    );
  } else {
    return (
      <>
        <button onClick={() => signIn()} type="button">
          Sign In with Google
        </button>
      </>
    );
  }
};

export default Login;
