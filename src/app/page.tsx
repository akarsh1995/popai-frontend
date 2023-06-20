import Login from "@/components/Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import DeployedPoll from "@/components/PollForm";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div style={{ width: "500px", margin: "0 auto", paddingTop: "30px" }}>
      <Login session={session} />
      <DeployedPoll />
    </div>
  );
}
