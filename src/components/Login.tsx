"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { DefaultSession } from "next-auth";

// Default Session TYPE

export function UserCard({ user }: { user: DefaultSession["user"] }) {
  return (
    <div className="card">
      <div className="card-body">
        <p>Current Logged In User</p>
        <h5 className="card-title">{user?.name}</h5>
        <p className="card-text">{user?.email}</p>
      </div>
    </div>
  );
}

export default function Login() {
  // get session from nextAuth
  const { data: session } = useSession();
  // useSession uses React Context

  // if the user exists -> show a Sign Out button and their information
  if (session) {
    return (
      <>
        <button
          onClick={() => signOut()}
          type="button"
          className="btn btn-primary"
        >
          Sign Out of Google
        </button>
        {/* Pass session info to server component */}
        <UserCard user={session?.user} />
      </>
    );
  } else {
    return (
      <>
        <button
          onClick={() => signIn()}
          type="button"
          className="btn btn-primary"
        >
          Sign In with Google
        </button>
      </>
    );
  }
}
