"use client";

import { Poll } from "@prisma/client";
import React, { FC, useEffect, useState } from "react";
import PollCard from "./PollCard";

export interface PollStatus {
  message: "error" | "notFound" | "running" | "stopped";
  pollId: string;
  status: "Fail" | "Success";
}

export const PollCardHolder: FC<{ polls: Poll[] }> = ({ polls }) => {
  const st: { [key: string]: PollStatus } = {};
  polls.forEach((poll) => {
    st[poll.id] = {
      message: "running",
      pollId: poll.id,
      status: "Success",
    };
  });

  const [statuses, setStatuses] = useState<{ [key: string]: PollStatus }>(st);

  const addUpdate = (up: PollStatus) =>
    setStatuses((old) => ({ ...old, [up.pollId]: up }));

  useEffect(() => {
    const url = `ws://${
      process.env.NEXT_PUBLIC_POLLING_SERVER_ENDPOINT?.split("//")[1]
    }/poll/status`;
    const ws = new WebSocket(url);

    ws.addEventListener("open", () => {
      polls.map((poll) => ws.send(JSON.stringify({ id: poll.id })));
    });

    ws.addEventListener("message", ({ data }) => {
      const packet: PollStatus = JSON.parse(data);
      addUpdate(packet);
    });

    return () => ws.close();
  }, []);

  return (
    <div className="space-y-8 py-10">
      {polls.map((poll) => (
        <div key={poll.id}>
          <PollCard poll={poll} status={statuses[poll.id]} />
        </div>
      ))}
    </div>
  );
};
