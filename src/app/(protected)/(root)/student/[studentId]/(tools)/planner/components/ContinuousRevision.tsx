"use client";

import { useState } from "react";

import Image from "next/image";

import { ChevronRightIcon, NotebookTextIcon, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ISubject } from "@/helpers/types";
import { useAppSelector } from "@/redux/hooks";

import ContinuousRevisionForm from "./ContinuousRevisionForm";

const ContinuousRevision = ({
  studentSubjects,
  studentStandard,
  studentCompetitiveExam,
}: {
  studentSubjects: ISubject[];
  studentStandard: number;
  studentCompetitiveExam: string;
}) => {
  const [activeSubject, setActiveSubject] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => setActiveSubject(studentSubjects[0].name)}
          className="text-primary cursor-pointer size-5"
        >
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>What did you learned today?</DialogTitle>
          <DialogDescription className="sr-only">
            Add topics to your planner
          </DialogDescription>
        </DialogHeader>
        <ContinuousRevisionForm
          activeSubject={activeSubject}
          setActiveSubject={setActiveSubject}
          userStandard={studentStandard}
          userSubjects={studentSubjects}
          userCompetitiveExam={studentCompetitiveExam}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ContinuousRevision;
