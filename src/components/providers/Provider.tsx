import React from "react";

import { getUser } from "@/actions/user_actions";

import StoreProvider from "./StoreProvider";

const Provider = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  return <StoreProvider user={user?.user}>{children}</StoreProvider>;
};

export default Provider;
