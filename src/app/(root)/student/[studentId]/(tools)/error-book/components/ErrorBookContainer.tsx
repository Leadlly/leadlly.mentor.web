"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ErrorList from "./ErrorList";
import { cn } from "@/lib/utils";
import { ErrorBookProps } from "@/helpers/types";

const ErrorBookContainer = ({ errorBook}: ErrorBookProps) => {
  const [isMinimized, setIsMinimized] = useState(true);

  return (
    <motion.div className="flex pt-4 overflow-y-auto">
      {isMinimized && <ErrorList errorBook={errorBook} />}

    </motion.div>
  );
};

export default ErrorBookContainer;
