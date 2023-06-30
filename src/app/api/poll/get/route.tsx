import { NextResponse } from "next/server";
// import { withAuth } from "next-auth/middleware";
import prisma from "@/lib/prisma";

const handler = async () => {
  const polls = await prisma.poll.findMany();
  return NextResponse.json(polls);
};

export { handler as GET };
