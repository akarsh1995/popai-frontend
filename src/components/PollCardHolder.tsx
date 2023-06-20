import { Poll } from "@prisma/client";
import React, { FC } from "react";
import PollCard from "./PollCard";

export const PollCardHolder: FC<{ polls: Poll[] }> = ({ polls }) => {
  return (
    <div>
      {polls.map((poll) => (
        <div key={poll.id}>
          <PollCard poll={poll} />
        </div>
      ))}
    </div>
  );
};
