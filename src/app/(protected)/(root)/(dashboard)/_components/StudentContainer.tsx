"use client";
import ArrowIcon from "@/components/icons/ArrowIcon";
import RoundArrowIcon from "@/components/icons/RoundArrowIcon";

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Students from "./Students";
import { Button } from "@/components/ui/button";
import { Studentinformation } from "@/helpers/types";
import RescheduleDialogBox from "../../student/[studentId]/components/RescheduleDialogBox";

const StudentContainer = ({ students }: { students: Studentinformation[] }) => {
  const [AscOrder, setAscOrder] = useState<Boolean>(true);
  const [canSelectStudents, setCanSelectStudents] = useState(false);
  const [studentIds, setStudentIds] = useState<string[]>([]);
  const [scheduleMeeting, setScheduleMeeting] = useState(false);

  const allStudentIds = students.map((student) => student._id);

  const handleSelectAllStudents = () => {
    setStudentIds([...allStudentIds]);
  };

  const handleOnClose = () => {
    setStudentIds([]);
    setCanSelectStudents(false);
  };

  return (
    <div className="md:h-full h-[calc(100dvh-200px)] md:max-h-[calc(100dvh-140px)] md:mt-0 mt-[5%] overflow-y-auto custom__scrollbar md:min-h-[calc(100dvh-140px)] text-black md:border-[#D7D7D7] md:border-[2px] md:p-4 lg:rounded-3xl flex flex-col lg:gap-5">
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="md:flex gap-5 hidden">
          <p>Sort by</p>
          <button
            id="sort"
            className="flex justify-center gap-1 shadow-md items-center bg-[#F0EEEE] rounded px-2"
            onClick={() => {
              setAscOrder((order) => !order);
            }}
          >
            A<ArrowIcon />Z
            <RoundArrowIcon
              stroke="#6200EE"
              className={
                AscOrder ? "translate-y-1 " : "rotate-180 translate-y-0"
              }
            />
          </button>
        </div>

        <div className="md:block hidden">
          <SearchBar />
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 mb-3 md:mt-3 lg:mt-0 lg:mb-0">
        {canSelectStudents && studentIds.length > 0 && (
          <Button size={"sm"} onClick={() => setScheduleMeeting(true)}>
            Schedule Meeting
          </Button>
        )}
        {!canSelectStudents ? (
          <Button size={"sm"} onClick={() => setCanSelectStudents(true)}>
            Select Students
          </Button>
        ) : (
          <>
            <Button
              size={"sm"}
              onClick={handleSelectAllStudents}
              disabled={studentIds.length === allStudentIds.length}
            >
              Select All
            </Button>
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={() => setStudentIds([])}
              disabled={!studentIds.length}
            >
              Unselect All
            </Button>
            <Button size={"sm"} variant={"secondary"} onClick={handleOnClose}>
              Cancel
            </Button>
          </>
        )}
      </div>
      <Students
        students={students}
        setStudentIds={setStudentIds}
        studentIds={studentIds}
        canSelectStudents={canSelectStudents}
        setCanSelectStudents={setCanSelectStudents}
      />
      {scheduleMeeting && (
        <RescheduleDialogBox
          setOpenRescheduleDialog={setScheduleMeeting}
          studentIds={studentIds}
          meetingType="group-meeting"
          onClose={handleOnClose}
        />
      )}
    </div>
  );
};

export default StudentContainer;
