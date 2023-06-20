import Login from "@/components/Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import CreatePollForm from "@/components/PollForm";
import { PollCardHolder } from "@/components/PollCardHolder";
import client from "@/lib/prisma";
import { DefaultSession } from "next-auth";

async function getAllPolls(session: DefaultSession) {
  const user = await client.user.findUnique({
    where: { email: session?.user?.email || undefined },
    include: { polls: true },
  });
  return user?.polls;
}

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div style={{ width: "500px", margin: "0 auto", paddingTop: "30px" }}>
      <Login session={session} />
      {session && <PollCardHolder polls={await getAllPolls(session)} />}
      <CreatePollForm />
    </div>
  );
}
