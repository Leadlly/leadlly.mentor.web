"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

import { clearInviteInstituteCode } from "@/helpers/institute-invite";
import { MentorPersonalInfoProps } from "@/helpers/types";
import { userData } from "@/redux/slices";
import { AppStore, makeStore } from "@/redux/store";

export default function StoreProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: MentorPersonalInfoProps | null;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(userData(user));
  }

  useEffect(() => {
    const hasInstitute =
      (Array.isArray(user?.institutes) && user.institutes.length > 0) ||
      !!user?.institute;
    if (hasInstitute) clearInviteInstituteCode();
  }, [user]);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
