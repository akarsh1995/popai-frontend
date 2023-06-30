import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import prisma from "@/lib/prisma";

const handler = withAuth(async (req) => {
  const data = await req.json();
  const poll = await prisma.poll.create({
    data: { userId: req.nextauth.token?.sub, ...data },
  });

  const deploy_poll = await fetch(
    `${process.env.NEXT_PUBLIC_POLLING_SERVER_ENDPOINT}/poll/create`,
    {
      body: JSON.stringify(poll),
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf8",
      },
    }
  );
  if (deploy_poll.status === 200) {
    return NextResponse.json({ poll });
  } else {
    // delete poll from db because the fetching has failed.
    await prisma.poll.delete({ where: { id: poll.id } });
    return NextResponse.json(
      { poll: await deploy_poll.json() }, // error
      { status: deploy_poll.status }
    );
  }
});

export { handler as POST };
