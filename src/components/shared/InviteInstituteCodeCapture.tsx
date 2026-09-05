"use client";

import { useEffect } from "react";

import { captureInviteInstituteCodeFromUrl } from "@/helpers/institute-invite";

const InviteInstituteCodeCapture = () => {
  useEffect(() => {
    captureInviteInstituteCodeFromUrl();
  }, []);

  return null;
};

export default InviteInstituteCodeCapture;
