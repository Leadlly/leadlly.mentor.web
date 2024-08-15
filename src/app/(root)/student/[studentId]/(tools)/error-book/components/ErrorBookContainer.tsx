"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ErrorList from "./ErrorList";
import { cn } from "@/lib/utils";
import { ErrorBookProps } from "@/helpers/types";

interface UpdatedErrorBookProps extends ErrorBookProps {
  studentId: string; 
}

const ErrorBookContainer = ({ errorBook, studentId }: UpdatedErrorBookProps) => {
  const [isMinimized, setIsMinimized] = useState(true);

  return (
    <motion.div className="flex pt-4 overflow-y-auto">
      {isMinimized && <ErrorList errorBook={errorBook} studentId={studentId}/>}

    </motion.div>
  );
};

export default ErrorBookContainer;
