"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </SessionProvider>
  );
};
