"use client";
import React, { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface IReactQueryProviders {
  children: ReactNode;
}

const queryClient = new QueryClient();
const ReactQueryProviders: FC<IReactQueryProviders> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProviders;
