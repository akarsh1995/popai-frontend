import React, { FC } from "react";
import { Poll, Account } from "@prisma/client";

const data = {
  id: "clj3ujsc5000bedxr8dorskjd",
  sourceApi: "https://webhook.com",
  destinationWebhook: "https://google.com",
  interval: 100,
};

export const PollCard: FC<{ poll: Poll }> = ({ poll }) => {
  return (
    <>
      <div>{poll.id}</div>
      <div>{poll.sourceApi}</div>
      <div>{poll.destinationWebhook}</div>
      <div>{poll.interval}</div>
    </>
  );
};

export default PollCard;
