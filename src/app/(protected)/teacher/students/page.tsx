"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTeacherBatches, getBatchClasses, getBatchStudents, getTeacherStudents } from "@/actions/batch_actions";
import { markAttendance, getAttendance } from "@/actions/attendance_actions";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Users, Check, X, Eye, CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const AttendancePage = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const urlBatchId = searchParams.get("batchId") || "";
  const urlClassId = searchParams.get("classId") || "";

  const [selectedBatchId, setSelectedBatchId] = useState<string>(urlBatchId);
  const [selectedClassId, setSelectedClassId] = useState<string>(urlClassId);
  const [attendanceData, setAttendanceData] = useState<Record<string, "present" | "absent">>({});
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => {
    const bId = searchParams.get("batchId") || "";
    const cId = searchParams.get("classId") || "";
    if (bId) setSelectedBatchId(bId);
    if (cId) setSelectedClassId(cId);
  }, [searchParams]);

  const { data: batches } = useQuery({
    queryKey: ["teacher-batches"],
    queryFn: getTeacherBatches,
  });

  const { data: teacherStudentsData, isLoading: isTeacherStudentsLoading } = useQuery({
    queryKey: ["teacher-all-students"],
    queryFn: getTeacherStudents,
    enabled: !selectedBatchId,
  });

  const { data: classes } = useQuery({
    queryKey: ["batch-classes", selectedBatchId],
    queryFn: () => getBatchClasses(selectedBatchId),
    enabled: !!selectedBatchId,
  });

  const { data: batchStudentsData, isLoading: isBatchStudentsLoading } = useQuery({
    queryKey: ["batch-students", selectedBatchId],
    queryFn: () => getBatchStudents(selectedBatchId),
    enabled: !!selectedBatchId,
  });

  const dateStr = format(selectedDate, "yyyy-MM-dd");

  const { data: existingAttendance } = useQuery({
    queryKey: ["class-attendance", selectedBatchId, selectedClassId, dateStr],
    queryFn: () => getAttendance({ batchId: selectedBatchId, classId: selectedClassId, date: dateStr }),
    enabled: !!selectedBatchId && !!selectedClassId,
  });

  useEffect(() => {
    if (existingAttendance?.attendance && Array.isArray(existingAttendance.attendance)) {
      const data: Record<string, "present" | "absent"> = {};
      existingAttendance.attendance.forEach((item: any) => {
        data[item.studentId] = item.status;
      });
      setAttendanceData(data);
    } else {
      setAttendanceData({});
    }
  }, [existingAttendance]);

  const mutation = useMutation({
    mutationFn: markAttendance,
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message || "Failed to update attendance");
      }
      queryClient.invalidateQueries({ queryKey: ["class-attendance", selectedBatchId, selectedClassId] });
    },
  });

  const handleStatusChange = (studentId: string, status: "present" | "absent") => {
    setAttendanceData((prev) => ({ ...prev, [studentId]: status }));
    mutation.mutate({
      batchId: selectedBatchId,
      classId: selectedClassId,
      attendance: [{ studentId, status }],
      date: dateStr,
    });
  };

  const displayedStudents = selectedBatchId ? batchStudentsData?.students : teacherStudentsData?.students;
  const isLoadingStudents = selectedBatchId ? isBatchStudentsLoading : isTeacherStudentsLoading;

  const presentCount = Object.values(attendanceData).filter((s) => s === "present").length;
  const absentCount = Object.values(attendanceData).filter((s) => s === "absent").length;

  const isToday = format(selectedDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 md:px-8 py-3 md:py-4">
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <Select
            value={selectedBatchId || "all"}
            onValueChange={(val) => {
              setSelectedBatchId(val === "all" ? "" : val);
              setSelectedClassId("");
              setAttendanceData({});
            }}
          >
            <SelectTrigger className="w-[160px] md:w-[200px] rounded-lg h-10 border-gray-200 bg-white text-sm">
              <SelectValue placeholder="All Students" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Students</SelectItem>
              {batches?.map((batch: any) => (
                <SelectItem key={batch._id} value={batch._id}>
                  {batch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedBatchId && (
            <Select value={selectedClassId || "none"} onValueChange={(val) => setSelectedClassId(val === "none" ? "" : val)}>
              <SelectTrigger className="w-[160px] md:w-[200px] rounded-lg h-10 border-gray-200 bg-white text-sm">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Select Class</SelectItem>
                {classes?.map((cls: any) => (
                  <SelectItem key={cls._id} value={cls._id}>
                    {cls.subject} - {cls.topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Date Picker */}
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-10 px-3 rounded-lg border-gray-200 bg-white text-sm font-medium gap-2",
                  !isToday && "border-purple-300 text-purple-700"
                )}
              >
                <CalendarIcon className="size-4 text-gray-500" />
                {isToday ? "Today" : format(selectedDate, "dd MMM yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) {
                    setSelectedDate(date);
                    setCalendarOpen(false);
                  }
                }}
                disabled={(date) => date > new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex-1 w-full px-4 md:px-8 py-3 md:py-4 flex flex-col">
        {isLoadingStudents ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-50 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm md:text-base font-bold text-gray-900">
                  Your Students
                </h2>
                <span className="text-xs text-purple-600 font-semibold bg-purple-50 px-2 py-0.5 rounded">
                  {displayedStudents?.length || 0} Total
                </span>
                {selectedClassId && (
                  <>
                    <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <Check className="size-3" /> {presentCount}
                    </span>
                    <span className="text-xs text-red-600 font-semibold bg-red-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <X className="size-3" /> {absentCount}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Student List */}
            <div className="space-y-0 border border-gray-100 rounded-xl overflow-hidden">
              {displayedStudents?.map((student: any, index: number) => {
                const standard =
                  typeof student.academic?.standard === "object"
                    ? student.academic.standard.number?.number || student.academic.standard.number
                    : student.academic?.standard;

                return (
                  <div
                    key={student._id}
                    className={`flex items-center justify-between px-4 py-3 md:px-5 md:py-4 ${
                      index !== 0 ? "border-t border-gray-100" : ""
                    } hover:bg-gray-50/50 transition-colors`}
                  >
                    <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                      <div className="size-9 md:size-10 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center font-semibold text-sm uppercase shrink-0">
                        {student.firstname?.[0]}
                        {student.lastname?.[0]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm md:text-[15px] text-gray-900 truncate">
                          {student.firstname} {student.lastname}
                        </h3>
                        <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400">
                          {standard && <span>Std {standard}</span>}
                          {student.email && (
                            <span className="hidden sm:inline truncate max-w-[180px]">
                              {student.email}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          disabled={!selectedClassId}
                          onClick={() => handleStatusChange(student._id, "present")}
                          className={`px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                            attendanceData[student._id] === "present"
                              ? "bg-green-500 text-white"
                              : "text-gray-400 hover:bg-gray-50"
                          } disabled:opacity-30 disabled:cursor-not-allowed`}
                        >
                          P
                        </button>
                        <button
                          disabled={!selectedClassId}
                          onClick={() => handleStatusChange(student._id, "absent")}
                          className={`px-3 py-1.5 text-xs font-semibold transition-colors border-l border-gray-200 cursor-pointer ${
                            attendanceData[student._id] === "absent"
                              ? "bg-red-500 text-white"
                              : "text-gray-400 hover:bg-gray-50"
                          } disabled:opacity-30 disabled:cursor-not-allowed`}
                        >
                          A
                        </button>
                      </div>
                      <Link href={`/student/${student._id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-lg size-8 text-gray-400 hover:text-purple-600 hover:bg-purple-50 cursor-pointer"
                        >
                          <Eye className="size-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {displayedStudents?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Users className="size-12 text-gray-200 mb-3" />
                <p className="text-gray-500 font-semibold text-sm">
                  {selectedBatchId ? "No students in this batch" : "No students found"}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Students will appear here once assigned to your batches
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;
