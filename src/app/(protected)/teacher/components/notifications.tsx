"use client";

import React from "react";

import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";

const Notifications = () => {
  return (
    <Button variant="ghost" size="icon">
      <Bell />
    </Button>
  );
};

export default Notifications;
