"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTeacherDashboard } from "@/actions/user_actions";
import { getLectures } from "@/actions/lecture_actions";
import {
  Layers,
  ClipboardList,
  CheckCircle2,
  XCircle,
  BookOpen,
  Clock,
  Users,
  Palette,
  Calendar,
  FileText,
  Loader2,
} from "lucide-react";
import {
  addDays,
  format,
  isSameDay,
  startOfWeek,
} from "date-fns";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import dynamic from "next/dynamic";

dayjs.extend(relativeTime);

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const overviewCards = (data: any) => [
  {
    label: "Active Batches",
    value: data.activeBatches,
    sub: `${data.totalBatches} total`,
    icon: Layers,
    bg: "bg-purple-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    valueColor: "text-purple-700",
  },
  {
    label: "Total Classes",
    value: data.totalClasses,
    sub: `${data.completionRate}% completed`,
    icon: ClipboardList,
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    valueColor: "text-blue-700",
  },
  {
    label: "Completed",
    value: data.completedClasses,
    sub: `${data.scheduledClasses} this week`,
    icon: CheckCircle2,
    bg: "bg-green-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    valueColor: "text-green-700",
  },
  {
    label: "Cancelled",
    value: data.cancelledClasses,
    sub: "",
    icon: XCircle,
    bg: "bg-red-50",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    valueColor: "text-red-600",
  },
  {
    label: "Lectures Given",
    value: data.totalLectures,
    sub: `0 this week`,
    icon: BookOpen,
    bg: "bg-orange-50",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    valueColor: "text-orange-700",
  },
  {
    label: "Teaching Hours",
    value: data.totalTeachingHours,
    sub: `0h this week`,
    icon: Clock,
    bg: "bg-teal-50",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    valueColor: "text-teal-700",
  },
  {
    label: "Total Students",
    value: data.totalStudents,
    sub: "",
    icon: Users,
    bg: "bg-indigo-50",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    valueColor: "text-indigo-700",
  },
  {
    label: "Subjects",
    value: data.uniqueSubjects?.length || 0,
    sub: data.uniqueSubjects?.join(", ") || "",
    icon: Palette,
    bg: "bg-pink-50",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    valueColor: "text-pink-700",
  },
];

const COLORS = ["#a855f7", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];
const BATCH_COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#a855f7", "#ef4444", "#06b6d4"];
const SUBJECT_COLORS = ["#a855f7", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];

const TeacherDashboard = () => {
  const { data: dashboard, isLoading } = useQuery({
    queryKey: ["teacher-dashboard"],
    queryFn: getTeacherDashboard,
  });

  const { data: weeklyLectures } = useQuery({
    queryKey: ["weekly-lectures", "weekly"],
    queryFn: () => getLectures("weekly"),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin size-8 text-purple-500" />
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="text-center py-16 text-gray-400 font-medium">
        Failed to load dashboard data
      </div>
    );
  }

  const ov = dashboard.overview;
  const cards = overviewCards(ov);

  const classStatusData = dashboard.classStatusDistribution;
  const classStatusSeries = [
    classStatusData.completed || 0,
    classStatusData.scheduled || 0,
    classStatusData.cancelled || 0,
  ];
  const classStatusTotal = classStatusSeries.reduce((a: number, b: number) => a + b, 0);

  const monthlyTrend = dashboard.monthlyTrend || [];

  const subjectDist = dashboard.subjectDistribution || [];

  const attendanceData = dashboard.overallAttendance || { percentage: 0, present: 0, absent: 0, total: 0 };

  const calendarData = () => {
    const today = new Date();
    const start = startOfWeek(today, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => {
      const current = addDays(start, i);
      const classes =
        weeklyLectures?.lectures?.filter((l: any) =>
          isSameDay(new Date(l.lectureDate), current)
        ) || [];
      return {
        day: format(current, "EEE")[0],
        date: format(current, "d"),
        classes,
        isToday: isSameDay(current, today),
      };
    });
  };

  const weekData = calendarData();

  const todaysClasses = dashboard.recentClasses?.filter((c: any) =>
    dayjs(c.createdAt).isSame(dayjs(), "day")
  ) || [];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-3">Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {cards.map((card, i) => (
            <div key={i} className={`${card.bg} rounded-2xl p-4 flex items-start gap-3 border border-transparent`}>
              <div className={`${card.iconBg} rounded-xl p-2`}>
                <card.icon className={`size-5 ${card.iconColor}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-500 truncate">{card.label}</p>
                <p className={`text-2xl font-bold ${card.valueColor}`}>{card.value}</p>
                {card.sub && <p className="text-[11px] text-gray-400 font-medium truncate">{card.sub}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Schedule + Class Status */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Today&apos;s Schedule</h3>
            <span className="text-xs font-medium text-gray-400">{dayjs().format("dddd, MMM DD")}</span>
          </div>
          {todaysClasses.length > 0 ? (
            <div className="space-y-2">
              {todaysClasses.slice(0, 4).map((cls: any, i: number) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                  <div className={`w-1.5 h-10 rounded-full ${COLORS[i % COLORS.length] === "#a855f7" ? "bg-purple-400" : "bg-blue-400"}`} style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-800 truncate capitalize">{cls.subject || "Class"}</p>
                    <p className="text-xs text-gray-400">{cls.startTime || ""} - {cls.endTime || ""}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-50 rounded-xl animate-pulse" />
              ))}
              <p className="text-center text-xs text-gray-300 font-medium mt-2">No classes scheduled today</p>
            </div>
          )}
        </div>

        <div className="md:col-span-2 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center">
          <h3 className="font-bold text-gray-800 self-start mb-4">Class Status</h3>
          {classStatusTotal > 0 ? (
            <Chart
              type="donut"
              width={200}
              height={200}
              series={classStatusSeries}
              options={{
                labels: ["Completed", "Scheduled", "Cancelled"],
                colors: ["#10b981", "#a855f7", "#ef4444"],
                legend: { show: true, position: "bottom", fontSize: "11px" },
                plotOptions: {
                  pie: {
                    donut: {
                      size: "65%",
                      labels: {
                        show: true,
                        total: {
                          show: true,
                          label: "Total",
                          formatter: () => String(classStatusTotal),
                        },
                      },
                    },
                  },
                },
                dataLabels: { enabled: false },
                stroke: { width: 2, colors: ["#fff"] },
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center flex-1">
              <div className="size-32 rounded-full border-8 border-gray-100 flex items-center justify-center">
                <span className="text-gray-300 text-sm font-medium">No data</span>
              </div>
              <div className="flex gap-3 mt-3 text-[10px] text-gray-400">
                <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-green-400" />Completed</span>
                <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-purple-400" />Scheduled</span>
                <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-red-400" />Cancelled</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">Calendar</h3>
          <a href="/lecture-calendar" className="text-xs text-purple-600 font-semibold hover:underline">View All &rsaquo;</a>
        </div>
        <div className="flex overflow-x-auto">
          {weekData.map((item, i) => (
            <div key={i} className={`shrink-0 flex-1 min-w-[100px] min-h-[110px] border-r border-gray-50 p-2 flex flex-col gap-2 last:border-r-0 ${item.isToday ? "bg-purple-50/40 rounded-xl" : ""}`}>
              <div className="flex flex-col items-center border-b border-gray-50 pb-2 mb-1">
                <span className="font-semibold text-gray-400 text-xs">{item.day}</span>
                <span className={`font-bold text-sm ${item.isToday ? "text-purple-600" : "text-gray-600"}`}>{item.date}</span>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                {item.classes.map((cls: any, ci: number) => (
                  <div key={ci} className="bg-purple-100 text-purple-800 rounded px-2 py-1 text-[10px] font-semibold capitalize truncate text-center">
                    {cls.batch?.name || ""} - {cls.class?.subject?.slice(0, 4) || ""}
                  </div>
                ))}
                {item.classes.length === 0 && (
                  <div className="h-5 bg-gray-50 rounded animate-pulse" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trend */}
      {monthlyTrend.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Monthly Trend</h3>
          <Chart
            type="area"
            height={250}
            series={[
              { name: "Completed", data: monthlyTrend.map((m: any) => m.completed) },
              { name: "Cancelled", data: monthlyTrend.map((m: any) => m.cancelled) },
              { name: "Lectures", data: monthlyTrend.map((m: any) => m.lectures) },
            ]}
            options={{
              chart: { toolbar: { show: false }, zoom: { enabled: false } },
              colors: ["#a855f7", "#ef4444", "#06b6d4"],
              dataLabels: { enabled: false },
              stroke: { curve: "smooth", width: 2.5 },
              fill: {
                type: "gradient",
                gradient: { shadeIntensity: 1, opacityFrom: 0.25, opacityTo: 0.02, stops: [0, 100] },
              },
              xaxis: {
                categories: monthlyTrend.map((m: any) => m.month),
                labels: { style: { fontSize: "11px", colors: "#9ca3af" } },
                axisBorder: { show: false },
                axisTicks: { show: false },
              },
              yaxis: {
                labels: { style: { fontSize: "11px", colors: "#9ca3af" } },
              },
              grid: { borderColor: "#f3f4f6", strokeDashArray: 4 },
              legend: {
                position: "top",
                horizontalAlign: "right",
                fontSize: "12px",
                fontWeight: 500,
                markers: { size: 6, shape: "circle" as const },
                labels: { colors: "#6b7280" },
              },
              tooltip: { theme: "light" },
            }}
          />
        </div>
      )}

      {/* Batch Performance */}
      {dashboard.batchPerformance?.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Batch Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboard.batchPerformance.map((batch: any, i: number) => {
              const color = BATCH_COLORS[i % BATCH_COLORS.length];
              const trimmedName = batch.batchName?.length > 40 ? batch.batchName.slice(0, 40) + "..." : batch.batchName;
              const completionPct = batch.totalClasses > 0 ? Math.round((batch.completedClasses / batch.totalClasses) * 100) : 0;
              const bgColor = i % BATCH_COLORS.length === 0 ? "bg-orange-50/70" : i % BATCH_COLORS.length === 1 ? "bg-blue-50/70" : i % BATCH_COLORS.length === 2 ? "bg-green-50/70" : i % BATCH_COLORS.length === 3 ? "bg-purple-50/70" : "bg-gray-50/70";
              return (
                <div
                  key={batch.batchId}
                  className={`rounded-2xl p-5 space-y-3 ${bgColor}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h4
                        className="font-bold capitalize text-base truncate"
                        style={{ color }}
                        title={batch.batchName}
                      >
                        {trimmedName}
                      </h4>
                      <p className="text-xs text-gray-400 font-medium">Standard {batch.standard}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${batch.status === "Active" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                      {batch.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Classes</span>
                      <span className="font-bold text-gray-800">{batch.totalClasses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Completed</span>
                      <span className="font-bold text-green-600">{batch.completedClasses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Lectures</span>
                      <span className="font-bold text-gray-800">{batch.totalLectures}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Students</span>
                      <span className="font-bold text-gray-800">{batch.totalStudents}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                      <span>Completion</span>
                      <span className="font-bold">{completionPct}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/80 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${Math.max(completionPct, 2)}%`, backgroundColor: color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Subject Distribution + Attendance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Subject Distribution</h3>
          {subjectDist.length > 0 ? (
            <div className="flex gap-6">
              <div className="shrink-0">
                <Chart
                  type="bar"
                  width={160}
                  height={subjectDist.length * 40 + 40}
                  series={[
                    { name: "Classes", data: subjectDist.map((s: any) => s.classes) },
                    { name: "Lectures", data: subjectDist.map((s: any) => s.lectures) },
                  ]}
                  options={{
                    chart: { toolbar: { show: false }, stacked: false },
                    plotOptions: { bar: { horizontal: true, barHeight: "55%", borderRadius: 2 } },
                    colors: ["#a855f7", "#3b82f6"],
                    xaxis: {
                      categories: subjectDist.map((s: any) => {
                        const name = s.subject || "";
                        return name.charAt(0).toUpperCase() + name.slice(1);
                      }),
                      labels: { style: { fontSize: "8px", colors: "#9ca3af" } },
                      axisBorder: { show: false },
                      axisTicks: { show: false },
                    },
                    yaxis: {
                      labels: { style: { fontSize: "9px", colors: "#6b7280", fontWeight: 500 } },
                    },
                    dataLabels: { enabled: false },
                    legend: { show: false },
                    grid: { show: false },
                    tooltip: { theme: "light" },
                  }}
                />
              </div>
              <div className="flex-1 space-y-3 pt-1">
                {subjectDist.map((s: any, i: number) => {
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <span className="size-3 rounded-full shrink-0" style={{ backgroundColor: SUBJECT_COLORS[i % SUBJECT_COLORS.length] }} />
                      <span className="text-sm font-bold text-gray-800 capitalize flex-1 truncate">{s.subject}</span>
                      <span className="text-[11px] text-gray-400 font-medium shrink-0 whitespace-nowrap">
                        {s.classes} cls / {s.lectures} lec  {s.totalHours ?? 0}h
                      </span>
                    </div>
                  );
                })}
                <div className="flex gap-4 pt-2 text-[10px] text-gray-400 border-t border-gray-50">
                  <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-purple-500" />Classes</span>
                  <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-blue-500" />Lectures</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center text-gray-300 text-sm">No subject data</div>
          )}
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Attendance Overview</h3>
          <div className="flex items-center gap-8">
            <div className="relative shrink-0">
              <Chart
                type="radialBar"
                width={150}
                height={150}
                series={[attendanceData.percentage]}
                options={{
                  plotOptions: {
                    radialBar: {
                      startAngle: -135,
                      endAngle: 135,
                      hollow: { size: "58%" },
                      track: { background: "#f3f4f6", strokeWidth: "100%" },
                      dataLabels: {
                        name: { show: false },
                        value: {
                          fontSize: "22px",
                          fontWeight: "800",
                          color: "#1f2937",
                          offsetY: 8,
                          formatter: (val: number) => `${val}%`,
                        },
                      },
                    },
                  },
                  colors: ["#f59e0b"],
                  stroke: { lineCap: "round" },
                }}
              />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="size-3 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-gray-600">Present</span>
                </div>
                <span className="font-bold text-gray-800 text-base">{attendanceData.present}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="size-3 rounded-full bg-red-500" />
                  <span className="text-sm font-medium text-gray-600">Absent</span>
                </div>
                <span className="font-bold text-gray-800 text-base">{attendanceData.absent}</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <div className="flex items-center gap-2.5">
                  <Users className="size-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">Total Records</span>
                </div>
                <span className="font-bold text-gray-800 text-base">{attendanceData.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity + Upcoming Classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Recent Activity</h3>
          {dashboard.recentLectures?.length > 0 ? (
            <div className="space-y-1">
              {dashboard.recentLectures.map((lec: any) => (
                <div key={lec._id} className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-b-0">
                  <div className="bg-purple-50 rounded-lg p-2 shrink-0 mt-0.5">
                    <BookOpen className="size-4 text-purple-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-bold text-[15px] text-gray-900 truncate capitalize leading-tight">
                          {lec.title || lec.chapters?.[0]?.name || lec.topics?.[0]?.name || "Lecture"}
                        </p>
                        <p className="text-xs text-gray-400 capitalize mt-0.5">
                          {lec.subject || ""}
                        </p>
                      </div>
                      <span className="text-[10px] font-semibold px-2.5 py-1 bg-purple-50 text-purple-600 rounded-md shrink-0 capitalize truncate max-w-[200px] mt-0.5">
                        {lec.batchName?.length > 40 ? lec.batchName.slice(0, 40) + "..." : lec.batchName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-gray-400">
                      <Clock className="size-3" />
                      <span>{lec.duration} min</span>
                      <span className="mx-1">&middot;</span>
                      <span>{dayjs(lec.lectureDate).fromNow()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-50 rounded-xl animate-pulse" />
              ))}
              <p className="text-center text-xs text-gray-300 font-medium">No recent lectures</p>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Upcoming Classes</h3>
          {dashboard.upcomingClasses?.length > 0 ? (
            <div className="space-y-3">
              {dashboard.upcomingClasses.map((cls: any) => (
                <div key={cls._id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                  <div className="bg-blue-50 rounded-xl p-2 shrink-0">
                    <Calendar className="size-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-800 truncate capitalize">{cls.subject}</p>
                    <p className="text-xs text-gray-400">{cls.batchName} &bull; {dayjs(cls.date).format("DD MMM")}</p>
                  </div>
                  <span className="text-xs font-medium text-gray-500 shrink-0">
                    {cls.startTime || ""} {cls.startTime && cls.endTime ? "-" : ""} {cls.endTime || ""}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 bg-gray-50 rounded-xl animate-pulse" />
              ))}
              <p className="text-center text-xs text-gray-300 font-medium">No upcoming classes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
