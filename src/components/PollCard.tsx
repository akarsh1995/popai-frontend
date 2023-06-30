"use client";
import React, { FC } from "react";
import { Poll } from "@prisma/client";
import { Button } from "@chakra-ui/react";
import { PollStatus } from "./PollCardHolder";

const StatusSymbol: FC<{ colorClass: string; colorClass2: string }> = ({
  colorClass,
  colorClass2,
}) => (
  <span className="relative flex h-3 w-3">
    <span
      className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colorClass} opacity-75`}
    ></span>
    <span
      className={`relative inline-flex rounded-full h-3 w-3 ${colorClass2}`}
    ></span>
  </span>
);

const Warning = () => (
  <StatusSymbol colorClass="bg-yellow-400" colorClass2="bg-yellow-500" />
);
const Error = () => (
  <StatusSymbol colorClass="bg-red-400" colorClass2="bg-red-500" />
);
const Success = () => (
  <StatusSymbol colorClass="bg-green-400" colorClass2="bg-green-500" />
);

export const PollCard: FC<{ poll: Poll; status: PollStatus }> = ({
  poll,
  status,
}) => {
  return (
    <div>
      <div className="flex">
        <div className="flex flex-grow flex-col justify-center space-y-1">
          <strong>Name</strong>
          <strong>Source API</strong>
          <strong>Destination Webhook</strong>
          <strong>Frequency</strong>
          <strong>Status</strong>
        </div>
        <div className="flex flex-grow flex-col justify-center space-y-1">
          <div>{poll.id}</div>
          <div>{poll.sourceApi}</div>
          <div>{poll.destinationWebhook}</div>
          <div>{`${poll.interval} secs`}</div>
          {status.message === "running" ? <Success /> : <Error />}
        </div>
      </div>
      {/* {status && ( */}
      {/*   <> */}
      {/*     <div>{status.status}</div> */}
      {/*     <div>{status.message}</div> */}
      {/*   </> */}
      {/* )} */}

      {/* <Button */}
      {/*   onClick={async () => { */}
      {/*     const response = await fetch("http://localhost:8000/poll/create", { */}
      {/*       body: JSON.stringify(poll), */}
      {/*       method: "POST", */}
      {/*       headers: { */}
      {/*         "Content-Type": "application/json; charset=utf8", */}
      {/*       }, */}
      {/*     }); */}
      {/*     console.log(await response.text()); */}
      {/*   }} */}
      {/* > */}
      {/*   Run the poll */}
      {/* </Button> */}
    </div>
  );
};

export default PollCard;
