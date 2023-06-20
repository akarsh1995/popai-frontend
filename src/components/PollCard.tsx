"use client";
import React, { FC } from "react";
import { Poll } from "@prisma/client";
import { Button } from "@chakra-ui/react";

export const PollCard: FC<{ poll: Poll }> = ({ poll }) => {
  return (
    <>
      <div>{poll.id}</div>
      <div>{poll.sourceApi}</div>
      <div>{poll.destinationWebhook}</div>
      <div>{poll.interval}</div>
      <Button
        onClick={async () => {
          const response = await fetch("http://localhost:8000", {
            body: JSON.stringify(poll),
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf8",
            },
          });
          console.log(await response.json());
        }}
      >
        Run the poll
      </Button>
    </>
  );
};

export default PollCard;
