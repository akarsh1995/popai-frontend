import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import prisma from "@/lib/prisma";

const handler = withAuth(async (req) => {
  const data = await req.json();
  const poll = await prisma.poll.create({
    data: { userId: req.nextauth.token?.sub, ...data },
  });
  return NextResponse.json({ poll });
});

export { handler as POST };
