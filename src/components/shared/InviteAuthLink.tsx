"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  captureInviteInstituteCodeFromUrl,
  withInstituteCodeQuery,
} from "@/helpers/institute-invite";

interface InviteAuthLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const InviteAuthLink = ({ href, className, children }: InviteAuthLinkProps) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    setCode(captureInviteInstituteCodeFromUrl());
  }, []);

  return (
    <Link href={withInstituteCodeQuery(href, code)} className={className}>
      {children}
    </Link>
  );
};

export default InviteAuthLink;
