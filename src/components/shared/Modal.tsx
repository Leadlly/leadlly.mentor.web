"use client";

import React from "react";
import { Dialog, DialogContent, DialogOverlay } from "../ui/dialog";
import { cn } from "@/lib/utils";

const Modal = ({
  children,
  setOpenDialogBox,
  className,
}: {
  children: React.ReactNode;
  setOpenDialogBox: (openDialogBox: boolean) => void;
  className?: string;
}) => {
  const handleOpenChange = () => {
    setOpenDialogBox(false);
  };
  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay className="backdrop-blur-sm">
        <DialogContent
          className={cn(
            "text-black shadow-dialog bg-white rounded-xl max-w-4xl w-full p-4 overflow-hidden",
            className
          )}
        >
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default Modal;
