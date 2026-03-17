"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTeacherBatches, getBatchClasses, getBatchStudents, getTeacherStudents } from "@/actions/batch_actions";
import { markAttendance, getAttendance } from "@/actions/attendance_actions";
import { getUser } from "@/actions/user_actions";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Check, X, Eye, Loader2, Save, Filter, Flame, Trophy, Mail } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import dayjs from "dayjs";

const AttendancePage = () => {
  const queryClient = useQueryClient();
  const [selectedBatchId, setSelectedBatchId] = useState<string>("");
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [attendanceData, setAttendanceData] = useState<Record<string, "present" | "absent">>({});

  // Fetch current user
  const { data: userData } = useQuery({
    queryKey: ["current-user"],
    queryFn: getUser,
  });

  // Fetch teacher's assigned batches
  const { data: batches, isLoading: isBatchesLoading } = useQuery({
    queryKey: ["teacher-batches"],
    queryFn: getTeacherBatches,
  });

  // Fetch all students from teacher's batches (default view)
  const { data: teacherStudentsData, isLoading: isTeacherStudentsLoading } = useQuery({
    queryKey: ["teacher-all-students"],
    queryFn: getTeacherStudents,
    enabled: !selectedBatchId,
  });

  // Fetch classes for selected batch
  const { data: classes, isLoading: isClassesLoading } = useQuery({
    queryKey: ["batch-classes", selectedBatchId],
    queryFn: () => getBatchClasses(selectedBatchId),
    enabled: !!selectedBatchId,
  });

  // Fetch students for selected batch (filter view)
  const { data: batchStudentsData, isLoading: isBatchStudentsLoading } = useQuery({
    queryKey: ["batch-students", selectedBatchId],
    queryFn: () => getBatchStudents(selectedBatchId),
    enabled: !!selectedBatchId,
  });

  // Fetch existing attendance for selected class
  const { data: existingAttendance, isLoading: isAttendanceLoading } = useQuery({
    queryKey: ["class-attendance", selectedBatchId, selectedClassId],
    queryFn: () => getAttendance({ batchId: selectedBatchId, classId: selectedClassId }),
    enabled: !!selectedBatchId && !!selectedClassId,
  });

  // Sync state with existing attendance
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
      if (data.success) {
        // queryClient.invalidateQueries({ queryKey: ["class-attendance", selectedBatchId, selectedClassId] });
      } else {
        toast.error(data.message || "Failed to update attendance");
      }
    },
  });

  const handleStatusChange = (studentId: string, status: "present" | "absent") => {
    setAttendanceData((prev) => ({ ...prev, [studentId]: status }));
    
    // Auto-save
    mutation.mutate({
      batchId: selectedBatchId,
      classId: selectedClassId,
      attendance: [{ studentId, status }]
    });
  };

  const markAll = (status: "present" | "absent") => {
    const students = selectedBatchId ? batchStudentsData?.students : teacherStudentsData?.students;
    if (!students) return;

    const toastId = toast.loading(`Marking all as ${status}...`);

    const newData: Record<string, "present" | "absent"> = {};
    const attendanceArray: { studentId: string; status: "present" | "absent" }[] = [];
    
    students.forEach((student: any) => {
      newData[student._id] = status;
      attendanceArray.push({ studentId: student._id, status });
    });
    
    setAttendanceData(newData);

    mutation.mutate({
      batchId: selectedBatchId,
      classId: selectedClassId,
      attendance: attendanceArray
    }, {
      onSuccess: () => {
        toast.success(`All marked as ${status}`, { id: toastId });
      },
      onError: () => {
        toast.error("Failed to update all", { id: toastId });
      }
    });
  };

  const displayedStudents = selectedBatchId ? batchStudentsData?.students : teacherStudentsData?.students;
  const isLoadingStudents = selectedBatchId ? isBatchStudentsLoading : isTeacherStudentsLoading;

  const presentCount = Object.values(attendanceData).filter((status) => status === "present").length;
  const absentCount = Object.values(attendanceData).filter((status) => status === "absent").length;

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Header outside */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4 px-4 md:px-8 py-4 md:py-6 mb-1 md:mb-2">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
            <Users className="size-5 md:size-6" />
          </div>
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-gray-900 tracking-tight">
              {selectedBatchId ? "Class Attendance" : "All Students"}
            </h1>
            <p className="text-[10px] md:text-xs text-gray-500 font-medium">
              {selectedBatchId ? "Marking attendance for selected class" : "Listing all students from your batches"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-4 w-full md:w-auto">
          <Select value={selectedBatchId} onValueChange={(val) => {
            setSelectedBatchId(val === "all" ? "" : val);
            setSelectedClassId("");
            setAttendanceData({});
          }}>
            <SelectTrigger className="w-full md:w-[200px] rounded-xl h-11 border-gray-200 bg-white">
              <SelectValue placeholder="All Students" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-100">
              <SelectItem value="all">All Students</SelectItem>
              {batches?.map((batch: any) => (
                <SelectItem key={batch._id} value={batch._id}>{batch.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedBatchId && (
            <Select value={selectedClassId} onValueChange={setSelectedClassId}>
              <SelectTrigger className="w-full md:w-[200px] rounded-xl h-11 border-gray-200 bg-white">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-100">
                {classes?.map((cls: any) => (
                  <SelectItem key={cls._id} value={cls._id}>{cls.subject} - {cls.topic}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <div className="flex-1 w-full bg-white rounded-t-[24px] md:rounded-t-[40px] shadow-[0_-4px_20px_rgba(0,0,0,0.02)] px-4 md:px-8 py-5 md:py-8 border-t border-gray-100 flex flex-col">
        {isLoadingStudents ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-24 bg-gray-50 animate-pulse rounded-[24px]" />
            ))}
          </div>
        ) : (
          <div className="space-y-4 md:space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                <h2 className="text-base md:text-xl font-bold text-gray-900 tracking-tight">
                  {selectedBatchId ? "Batch Students" : "Your Students"}
                </h2>
                <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                  <span className="px-2 py-0.5 bg-purple-50 text-[#A855F7] rounded-full text-[10px] md:text-[11px] font-bold border border-purple-100">
                    {displayedStudents?.length || 0} Total
                  </span>
                  {selectedClassId && (
                    <>
                      <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-[10px] md:text-[11px] font-bold border border-green-100 flex items-center gap-1">
                        <Check className="size-3" />
                        {presentCount} Present
                      </span>
                      <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded-full text-[10px] md:text-[11px] font-bold border border-red-100 flex items-center gap-1">
                        <X className="size-3" />
                        {absentCount} Absent
                      </span>
                    </>
                  )}
                </div>
              </div>
              
              {selectedClassId && (
                <div className="flex items-center gap-2 md:gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => markAll("present")}
                    className="rounded-full font-bold text-green-600 hover:text-green-700 hover:bg-green-50 border-green-100 h-8 md:h-9 px-3 md:px-4 text-xs md:text-sm"
                  >
                    Mark All Present
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => markAll("absent")}
                    className="rounded-full font-bold text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100 h-8 md:h-9 px-3 md:px-4 text-xs md:text-sm"
                  >
                    Mark All Absent
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 pb-10">
              {displayedStudents?.map((student: any) => (
                <div 
                  key={student._id} 
                  className="bg-white border border-gray-200 p-3 md:p-4 rounded-2xl md:rounded-[24px] transition-all flex items-center justify-between group h-auto min-h-[80px] md:min-h-[90px] hover:border-purple-300 hover:bg-purple-50/5"
                >
                  <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                    <div className="size-10 md:size-12 rounded-lg md:rounded-xl bg-gradient-to-br from-gray-50 to-white text-gray-500 flex items-center justify-center font-bold text-sm md:text-lg border border-gray-100 uppercase shadow-sm shrink-0 group-hover:text-[#A855F7] group-hover:border-purple-100 transition-all">
                      {student.firstname[0]}{student.lastname?.[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 md:gap-2 mb-0.5 md:mb-1 flex-wrap">
                        <h3 className="font-bold text-sm md:text-[18px] text-gray-900 group-hover:text-[#A855F7] transition-colors truncate">
                          {student.firstname} {student.lastname}
                        </h3>
                        <span className="px-2 py-0.5 bg-purple-50 text-[#A855F7] rounded-md text-[9px] font-black uppercase tracking-tighter border border-purple-100 shrink-0">
                          LVL {typeof student.details?.level?.number === 'object' ? student.details.level.number.number : (student.details?.level?.number || 0)}
                        </span>
                        {student.academic?.standard && (
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[9px] font-black uppercase tracking-tighter border border-blue-100 shrink-0">
                            STD {typeof student.academic.standard === 'object' ? (student.academic.standard.number?.number || student.academic.standard.number) : student.academic.standard}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-2 md:gap-x-4">
                        <div className="hidden sm:flex items-center gap-1.5 text-gray-400">
                          <Mail className="size-3" />
                          <span className="text-[11px] md:text-[12px] font-medium truncate max-w-[120px] md:max-w-[150px]">{student.email}</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                            <Flame className="size-3 fill-gray-400" />
                            <span className="text-[11px] font-bold">
                              {typeof student.details?.streak?.current === 'object' ? student.details.streak.current.number : (student.details?.streak?.current || 0)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                            <Trophy className="size-3 fill-gray-400" />
                            <span className="text-[11px] font-bold">
                              {typeof student.details?.points === 'object' ? student.details.points.number : (student.details?.points || 0)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:gap-4 shrink-0 ms-2 md:ms-4">
                    <div className="flex bg-gray-50/80 border border-gray-200 p-0.5 md:p-1 rounded-xl md:rounded-2xl">
                      <button
                        disabled={!selectedClassId}
                        onClick={() => handleStatusChange(student._id, "present")}
                        className={`size-9 md:size-11 rounded-lg md:rounded-xl flex items-center justify-center transition-all font-bold cursor-pointer text-sm md:text-base ${
                          attendanceData[student._id] === "present"
                            ? "bg-green-500 text-white shadow-lg shadow-green-100 scale-105"
                            : "text-gray-400 hover:text-gray-600 hover:bg-white"
                        } disabled:opacity-40 disabled:cursor-not-allowed`}
                        title={!selectedClassId ? "Please select batch and class to mark attendance" : "Mark Present"}
                      >
                        P
                      </button>
                      <button
                        disabled={!selectedClassId}
                        onClick={() => handleStatusChange(student._id, "absent")}
                        className={`size-9 md:size-11 rounded-lg md:rounded-xl flex items-center justify-center transition-all font-bold cursor-pointer text-sm md:text-base ${
                          attendanceData[student._id] === "absent"
                            ? "bg-red-500 text-white shadow-lg shadow-red-100 scale-105"
                            : "text-gray-400 hover:text-gray-600 hover:bg-white"
                        } disabled:opacity-40 disabled:cursor-not-allowed`}
                        title={!selectedClassId ? "Please select batch and class to mark attendance" : "Mark Absent"}
                      >
                        A
                      </button>
                    </div>

                    <Link href={`/student/${student._id}`}>
                      <Button variant="ghost" size="icon" className="rounded-full size-9 md:size-11 bg-white border border-gray-200 hover:border-purple-200 hover:bg-purple-50 hover:text-[#A855F7] transition-all cursor-pointer" title="View Report">
                        <Eye className="size-4 md:size-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {displayedStudents?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 bg-gray-50/50 rounded-[30px] border border-dashed border-gray-200">
                <Users className="size-16 text-gray-200 mb-4" />
                <p className="text-gray-500 font-bold text-lg text-center px-4">
                  {selectedBatchId ? "No students found in this batch" : "No students found in your batches"}
                </p>
                <p className="text-gray-400 text-sm mt-1 font-medium text-center px-4">
                  Students will appear here once they are assigned to your batches
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
