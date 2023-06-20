import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });
  console.log("JSON Web Token", token);
  return NextResponse.json({ token });
}

export { handler as GET };
