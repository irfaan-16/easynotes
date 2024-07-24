"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

const Providers = (props: {
  children:
    | string
    | number
    | bigint
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | Promise<React.AwaitedReactNode>
    | null
    | undefined;
}) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};

export default Providers;
