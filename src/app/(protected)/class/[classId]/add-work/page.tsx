"use client";

import React, { use, useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getClassDetails } from "@/actions/batch_actions";
import {
  getChapters,
  getTopicsWithSubtopics,
} from "@/actions/questionbank_actions";
import {
  createTodaysWork,
  getTodaysLecture,
  updateTodaysWork,
} from "@/actions/lecture_actions";
import { Calendar, ChevronDown, Check, Loader2, Plus, ArrowRight, Paperclip, X, FileQuestion, CheckCircle2, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import dayjs from "dayjs";
import Link from "next/link";
import { createAnnouncement } from "@/actions/announcement_actions";
import { createQuizForClass } from "@/actions/quiz_actions";
import { getAttendance } from "@/actions/attendance_actions";
import { useFileUpload } from "@/hooks/use-file-upload";
import { createNote, createDPP } from "@/actions/classwork_actions";

interface ChapterItem {
  _id: string;
  name: string;
}

interface SubtopicItem {
  _id: string;
  name: string;
}

interface TopicItem {
  _id: string;
  name: string;
  subtopics: SubtopicItem[];
}

const HOUR_OPTIONS = [1, 2, 3];

const Page = ({ params }: { params: Promise<{ classId: string }> }) => {
  const { classId } = use(params);
  const queryClient = useQueryClient();

  const { data: classData, isLoading } = useQuery({
    queryKey: ["class-details", classId],
    queryFn: () => getClassDetails(classId),
  });

  const batchId =
    typeof classData?.batch === "object" ? classData?.batch._id : classData?.batch;
  const batchStandard =
    typeof classData?.batch === "object" ? classData?.batch.standard : "12";
  const subject = classData?.subject || "";

  const { data: todayAttendance } = useQuery({
    queryKey: ["today-attendance-check", batchId, classId],
    queryFn: () => getAttendance({ batchId: batchId!, classId }),
    enabled: !!batchId && !!classId,
  });

  const attendanceMarkedToday = !!(
    todayAttendance?.attendance &&
    Array.isArray(todayAttendance.attendance) &&
    todayAttendance.attendance.length > 0
  );

  const [selectedHours, setSelectedHours] = useState<number | null>(null);
  const [customHours, setCustomHours] = useState<number | null>(null);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [nothingDoneToday, setNothingDoneToday] = useState(false);

  const [chapterPopoverOpen, setChapterPopoverOpen] = useState(false);
  const [topicPopoverOpen, setTopicPopoverOpen] = useState(false);
  const [chapters, setChapters] = useState<ChapterItem[]>([]);
  const [chaptersLoading, setChaptersLoading] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<ChapterItem | null>(null);

  const [topics, setTopics] = useState<TopicItem[]>([]);
  const [topicsLoading, setTopicsLoading] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<
    Map<string, { topic: TopicItem; selectedSubtopics: Set<string> }>
  >(new Map());

  const [homework, setHomework] = useState("");

  const [existingLecture, setExistingLecture] = useState<any>(null);
  const isUpdateMode = !!existingLecture;
  const prefillDoneRef = React.useRef(false);

  useEffect(() => {
    if (!subject || !batchStandard) return;
    const fetchChapters = async () => {
      setChaptersLoading(true);
      try {
        const data = await getChapters(subject, batchStandard);
        setChapters(data.chapters || []);
      } catch {
        toast.error("Failed to load chapters");
      } finally {
        setChaptersLoading(false);
      }
    };
    fetchChapters();
  }, [subject, batchStandard]);

  useEffect(() => {
    if (!classId) return;
    const fetchExisting = async () => {
      try {
        const lecture = await getTodaysLecture(classId);
        if (lecture) {
          setExistingLecture(lecture);
          const durationHrs = Math.round((lecture.duration || 60) / 60);
          if (HOUR_OPTIONS.includes(durationHrs)) {
            setSelectedHours(durationHrs);
          } else {
            setCustomHours(durationHrs || 1);
            setShowCustomInput(true);
          }
        }
      } catch {
        setExistingLecture(null);
      }
    };
    fetchExisting();
  }, [classId]);

  useEffect(() => {
    if (prefillDoneRef.current || !existingLecture || chapters.length === 0) return;
    const existingChapter = existingLecture.chapters?.[0];
    if (existingChapter) {
      const match = chapters.find((c) => c._id === existingChapter._id);
      setSelectedChapter(match || { _id: existingChapter._id, name: existingChapter.name });
    }
  }, [existingLecture, chapters]);

  useEffect(() => {
    if (!selectedChapter) {
      setTopics([]);
      return;
    }
    const fetchTopics = async () => {
      setTopicsLoading(true);
      try {
        const data = await getTopicsWithSubtopics(subject, batchStandard, selectedChapter._id);
        setTopics(data.topics || []);
      } catch {
        toast.error("Failed to load topics");
      } finally {
        setTopicsLoading(false);
      }
    };
    fetchTopics();
  }, [selectedChapter, subject, batchStandard]);

  useEffect(() => {
    if (prefillDoneRef.current || !existingLecture || topics.length === 0) return;
    const existingTopicIds = new Set(existingLecture.topics?.map((t: any) => t._id) || []);
    const existingSubtopicIds = new Set(existingLecture.subtopics?.map((s: any) => s._id) || []);
    const prefilled = new Map<string, { topic: TopicItem; selectedSubtopics: Set<string> }>();
    for (const topic of topics) {
      if (existingTopicIds.has(topic._id)) {
        const subs = new Set<string>();
        for (const sub of topic.subtopics) {
          if (existingSubtopicIds.has(sub._id)) subs.add(sub._id);
        }
        prefilled.set(topic._id, { topic, selectedSubtopics: subs });
      }
    }
    if (prefilled.size > 0) setSelectedTopics(prefilled);
    prefillDoneRef.current = true;
  }, [existingLecture, topics]);

  const toggleTopic = useCallback((topic: TopicItem) => {
    setSelectedTopics((prev) => {
      const next = new Map(prev);
      if (next.has(topic._id)) {
        next.delete(topic._id);
      } else {
        next.set(topic._id, {
          topic,
          selectedSubtopics: new Set(topic.subtopics.map((s) => s._id)),
        });
      }
      return next;
    });
  }, []);

  const getDurationMinutes = () => {
    if (showCustomInput && customHours) return customHours * 60;
    if (selectedHours) return selectedHours * 60;
    return 60;
  };

  const mutation = useMutation({
    mutationFn: async () => {
      if (!selectedChapter) throw new Error("Please select a chapter");
      if (selectedTopics.size === 0 && !nothingDoneToday) throw new Error("Please select at least one topic");

      const topicsPayload = Array.from(selectedTopics.values()).map(({ topic, selectedSubtopics }) => ({
        _id: topic._id,
        name: topic.name,
        subItems: topic.subtopics
          .filter((s) => selectedSubtopics.has(s._id))
          .map((s) => ({ _id: s._id, name: s.name })),
      }));
      const allSubtopics = topicsPayload.flatMap((t) =>
        t.subItems.map((s) => ({ _id: s._id, name: s.name }))
      );

      const payload = {
        chapter: [{ _id: selectedChapter._id, name: selectedChapter.name }],
        topics: topicsPayload,
        subtopics: allSubtopics,
        duration: getDurationMinutes(),
      };

      if (isUpdateMode) return updateTodaysWork(existingLecture._id, payload);
      return createTodaysWork({ classId, batchId, ...payload });
    },
    onSuccess: () => {
      toast.success(
        isUpdateMode
          ? "Work updated! Student planners are being refreshed."
          : "Today's work saved! Student planners are being updated."
      );
      queryClient.invalidateQueries({ queryKey: ["class-details", classId] });
      queryClient.invalidateQueries({ queryKey: ["teacher-report"] });
      queryClient.invalidateQueries({ queryKey: ["teacher-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["class-lectures", classId] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to save today's work");
    },
  });

  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500 animate-pulse">Loading...</div>
    );
  }

  if (!classData) {
    return (
      <div className="p-8 text-center text-gray-500">Class details not found.</div>
    );
  }

  const selectedTopicNames = Array.from(selectedTopics.values()).map(
    ({ topic }) => topic.name
  );

  return (
    <div className="w-full max-w-lg mx-auto space-y-4 md:space-y-5">
      {/* Attendance Quick Link */}
      {attendanceMarkedToday ? (
        <Link
          href={`/teacher/students?batchId=${batchId || ""}&classId=${classId}`}
          className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3 hover:bg-green-100/60 transition-colors group"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">
              Attendance marked for today
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-7 rounded-full border-green-300 text-green-700 hover:bg-green-100 text-xs font-semibold px-3 cursor-pointer"
          >
            View
          </Button>
        </Link>
      ) : (
        <Link
          href={`/teacher/students?batchId=${batchId || ""}&classId=${classId}`}
          className="flex items-center justify-between bg-linear-to-r from-purple-50 to-purple-100/80 border border-purple-200 rounded-xl px-4 py-3.5 hover:from-purple-100 hover:to-purple-150/80 hover:border-purple-300 transition-all group shadow-sm shadow-purple-100"
        >
          <span className="text-sm font-bold text-purple-700 group-hover:text-purple-800">
            Add Today&apos;s Attendance
          </span>
          <ArrowRight className="size-4 text-purple-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
        </Link>
      )}

      {/* Add Work Card */}
      <div className="bg-purple-50/60 rounded-2xl p-4 md:p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base md:text-lg font-bold text-gray-900">
            Add Work for Students
          </h2>
          <div className="flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 text-xs font-semibold text-purple-700 border border-purple-200">
            <Calendar className="size-3.5" />
            {dayjs().format("DD-MMM-YYYY")}
          </div>
        </div>

        {/* Class Hours */}
        <div className="space-y-2.5">
          <label className="text-sm font-bold text-gray-800">Class Hours</label>
          <div className="flex items-center gap-2 flex-wrap">
            {HOUR_OPTIONS.map((hr) => (
              <button
                key={hr}
                onClick={() => {
                  setSelectedHours(hr);
                  setShowCustomInput(false);
                  setCustomHours(null);
                  setNothingDoneToday(false);
                }}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold border transition-all",
                  selectedHours === hr && !showCustomInput
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-gray-700 border-gray-200 hover:border-purple-300"
                )}
              >
                {hr} hour{hr > 1 ? "s" : ""}
              </button>
            ))}
            {showCustomInput ? (
              <input
                type="number"
                min={1}
                max={12}
                value={customHours || ""}
                onChange={(e) => {
                  setCustomHours(Number(e.target.value) || null);
                  setSelectedHours(null);
                }}
                placeholder="hrs"
                className="w-16 px-3 py-2 rounded-lg text-sm font-semibold border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-center"
                autoFocus
              />
            ) : (
              <button
                onClick={() => {
                  setShowCustomInput(true);
                  setSelectedHours(null);
                  setNothingDoneToday(false);
                }}
                className="size-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center hover:border-purple-300 transition-all"
              >
                <Plus className="size-4 text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Select Chapter */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-800">Select chapter</label>
          <Popover open={chapterPopoverOpen} onOpenChange={setChapterPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                disabled={nothingDoneToday}
                className={cn(
                  "w-full justify-between text-left h-11 rounded-lg bg-white",
                  !selectedChapter && "text-muted-foreground"
                )}
              >
                <span className="flex-1 truncate">
                  {selectedChapter
                    ? selectedChapter.name
                    : chaptersLoading
                    ? "Loading chapters..."
                    : "Choose the Chapter"}
                </span>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[--radix-popover-trigger-width]" align="start">
              <Command>
                <CommandInput placeholder="Search chapter..." />
                <CommandList className="max-h-[200px]">
                  <CommandEmpty>No chapter found.</CommandEmpty>
                  <CommandGroup>
                    {chaptersLoading ? (
                      <CommandItem disabled>
                        <Loader2 className="animate-spin size-4 mr-2" />
                        Loading...
                      </CommandItem>
                    ) : (
                      chapters.map((chapter) => (
                        <CommandItem
                          key={chapter._id}
                          value={chapter.name}
                          onSelect={() => {
                            setSelectedChapter(chapter);
                            setSelectedTopics(new Map());
                            prefillDoneRef.current = true;
                            setChapterPopoverOpen(false);
                          }}
                          className="cursor-pointer"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedChapter?._id === chapter._id
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {chapter.name}
                        </CommandItem>
                      ))
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Select Topics */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-800">Select Topics</label>
          <Popover open={topicPopoverOpen} onOpenChange={setTopicPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                disabled={!selectedChapter || nothingDoneToday}
                className={cn(
                  "w-full justify-between text-left h-11 rounded-lg bg-white",
                  selectedTopics.size === 0 && "text-muted-foreground"
                )}
              >
                <span className="flex-1 truncate">
                  {selectedTopics.size > 0
                    ? selectedTopicNames.join(", ")
                    : topicsLoading
                    ? "Loading topics..."
                    : "Choose the Topics"}
                </span>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[--radix-popover-trigger-width]" align="start">
              {topicsLoading ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="animate-spin size-4 mr-2 text-purple-500" />
                  <span className="text-sm text-gray-500">Loading topics...</span>
                </div>
              ) : topics.length === 0 ? (
                <div className="text-sm text-gray-400 p-4 text-center">
                  No topics found
                </div>
              ) : (
                <div className="max-h-[250px] overflow-y-auto divide-y">
                  {topics.map((topic) => {
                    const isSelected = selectedTopics.has(topic._id);
                    return (
                      <div key={topic._id} className="px-3 py-2">
                        <div
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded p-1 -m-1"
                          onClick={() => toggleTopic(topic)}
                        >
                          <Checkbox checked={isSelected} />
                          <span className="text-sm font-medium text-gray-800">
                            {topic.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>

        {/* Nothing Done Today */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setNothingDoneToday(!nothingDoneToday);
              if (!nothingDoneToday) {
                setSelectedChapter(null);
                setSelectedTopics(new Map());
                setSelectedHours(null);
                setShowCustomInput(false);
                setCustomHours(null);
              }
            }}
            className={cn(
              "size-5 rounded-full border-2 flex items-center justify-center transition-all",
              nothingDoneToday
                ? "border-purple-600 bg-purple-600"
                : "border-gray-300 bg-white"
            )}
          >
            {nothingDoneToday && (
              <div className="size-2 rounded-full bg-white" />
            )}
          </button>
          <span className="text-sm font-medium text-gray-700">Nothing Done Today</span>
        </div>

        {/* Add Button */}
        <div className="flex justify-center">
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-2.5 rounded-full cursor-pointer"
            disabled={
              mutation.isPending ||
              (!nothingDoneToday && (!selectedChapter || selectedTopics.size === 0))
            }
            onClick={() => mutation.mutate()}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isUpdateMode ? "Updating..." : "Adding..."}
              </>
            ) : isUpdateMode ? (
              "Update"
            ) : (
              "Add"
            )}
          </Button>
        </div>
      </div>

      {/* Additional Homework */}
      <div className="bg-purple-50/60 rounded-2xl p-4 md:p-6 space-y-4">
        <h3 className="text-base font-bold text-gray-900">Additional Homework</h3>
        <textarea
          value={homework}
          onChange={(e) => setHomework(e.target.value)}
          placeholder="Enter Your Homework details...."
          className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 min-h-[100px] resize-none"
        />

        <div className="flex items-center gap-3">
          <NotesUploadButton
            classId={classId}
            batchId={batchId || ""}
            subject={subject}
          />
          <DPPUploadButton
            classId={classId}
            batchId={batchId || ""}
            subject={subject}
          />
        </div>
      </div>

      {/* Create Quiz */}
      <QuizSection
        classId={classId}
        batchId={batchId || ""}
        instituteId={classData?.instituteId || ""}
        subject={subject}
        batchStandard={batchStandard}
        chapters={chapters}
        chaptersLoading={chaptersLoading}
      />

      {/* Announcement */}
      <AnnouncementSection classId={classId} />
    </div>
  );
};

const QuizSection = ({
  classId,
  batchId,
  instituteId,
  subject,
  batchStandard,
  chapters,
  chaptersLoading,
}: {
  classId: string;
  batchId: string;
  instituteId: string;
  subject: string;
  batchStandard: string | number;
  chapters: ChapterItem[];
  chaptersLoading: boolean;
}) => {
  const [quizChapter, setQuizChapter] = useState<ChapterItem | null>(null);
  const [quizChapterPopoverOpen, setQuizChapterPopoverOpen] = useState(false);

  const [quizTopics, setQuizTopics] = useState<TopicItem[]>([]);
  const [quizTopicsLoading, setQuizTopicsLoading] = useState(false);
  const [quizSelectedTopicIds, setQuizSelectedTopicIds] = useState<Set<string>>(new Set());
  const [quizTopicPopoverOpen, setQuizTopicPopoverOpen] = useState(false);

  const [questionsNumber, setQuestionsNumber] = useState(10);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!quizChapter) {
      setQuizTopics([]);
      setQuizSelectedTopicIds(new Set());
      return;
    }
    const fetchTopics = async () => {
      setQuizTopicsLoading(true);
      try {
        const data = await getTopicsWithSubtopics(subject, batchStandard, quizChapter._id);
        setQuizTopics(data.topics || []);
      } catch {
        toast.error("Failed to load topics");
      } finally {
        setQuizTopicsLoading(false);
      }
    };
    fetchTopics();
  }, [quizChapter, subject, batchStandard]);

  const toggleQuizTopic = useCallback((topicId: string) => {
    setQuizSelectedTopicIds((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  }, []);

  const handleCreateQuiz = async () => {
    if (!quizChapter) {
      toast.error("Please select a chapter");
      return;
    }
    if (quizSelectedTopicIds.size === 0) {
      toast.error("Please select at least one topic");
      return;
    }
    if (questionsNumber < 1 || questionsNumber > 75) {
      toast.error("Questions must be between 1 and 75");
      return;
    }

    setIsCreating(true);
    try {
      const res = await createQuizForClass({
        classId,
        batchId,
        instituteId,
        subject,
        chapterId: quizChapter._id,
        chapterName: quizChapter.name,
        topicIds: Array.from(quizSelectedTopicIds),
        questionsNumber,
      });

      if (res.success) {
        toast.success(res.message || "Quiz created successfully!");
        setQuizChapter(null);
        setQuizSelectedTopicIds(new Set());
        setQuestionsNumber(10);
      } else {
        toast.error(res.message || "Failed to create quiz");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsCreating(false);
    }
  };

  const selectedTopicNames = quizTopics
    .filter((t) => quizSelectedTopicIds.has(t._id))
    .map((t) => t.name);

  return (
    <div className="bg-purple-50/60 rounded-2xl p-4 md:p-6 space-y-4">
      <div className="flex items-center gap-2">
        <FileQuestion className="size-5 text-purple-600" />
        <h3 className="text-base font-bold text-gray-900">Create Quiz</h3>
      </div>

      {/* Select Chapter */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-800">Select Chapter</label>
        <Popover open={quizChapterPopoverOpen} onOpenChange={setQuizChapterPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-full justify-between text-left h-11 rounded-lg bg-white",
                !quizChapter && "text-muted-foreground"
              )}
            >
              <span className="flex-1 truncate">
                {quizChapter
                  ? quizChapter.name
                  : chaptersLoading
                  ? "Loading chapters..."
                  : "Choose the Chapter"}
              </span>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[--radix-popover-trigger-width]" align="start">
            <Command>
              <CommandInput placeholder="Search chapter..." />
              <CommandList className="max-h-[200px]">
                <CommandEmpty>No chapter found.</CommandEmpty>
                <CommandGroup>
                  {chaptersLoading ? (
                    <CommandItem disabled>
                      <Loader2 className="animate-spin size-4 mr-2" />
                      Loading...
                    </CommandItem>
                  ) : (
                    chapters.map((chapter) => (
                      <CommandItem
                        key={chapter._id}
                        value={chapter.name}
                        onSelect={() => {
                          setQuizChapter(chapter);
                          setQuizSelectedTopicIds(new Set());
                          setQuizChapterPopoverOpen(false);
                        }}
                        className="cursor-pointer"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            quizChapter?._id === chapter._id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {chapter.name}
                      </CommandItem>
                    ))
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Select Topics */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-800">Select Topics</label>
        <Popover open={quizTopicPopoverOpen} onOpenChange={setQuizTopicPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              disabled={!quizChapter}
              className={cn(
                "w-full justify-between text-left h-11 rounded-lg bg-white",
                quizSelectedTopicIds.size === 0 && "text-muted-foreground"
              )}
            >
              <span className="flex-1 truncate">
                {quizSelectedTopicIds.size > 0
                  ? selectedTopicNames.join(", ")
                  : quizTopicsLoading
                  ? "Loading topics..."
                  : "Choose the Topics"}
              </span>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[--radix-popover-trigger-width]" align="start">
            {quizTopicsLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="animate-spin size-4 mr-2 text-purple-500" />
                <span className="text-sm text-gray-500">Loading topics...</span>
              </div>
            ) : quizTopics.length === 0 ? (
              <div className="text-sm text-gray-400 p-4 text-center">
                No topics found
              </div>
            ) : (
              <div className="max-h-[250px] overflow-y-auto divide-y">
                {quizTopics.map((topic) => {
                  const isSelected = quizSelectedTopicIds.has(topic._id);
                  return (
                    <div key={topic._id} className="px-3 py-2">
                      <div
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded p-1 -m-1"
                        onClick={() => toggleQuizTopic(topic._id)}
                      >
                        <Checkbox checked={isSelected} />
                        <span className="text-sm font-medium text-gray-800">
                          {topic.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>

      {/* Number of Questions */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-800">
          Number of Questions <span className="font-normal text-gray-500">(max 75)</span>
        </label>
        <input
          type="number"
          min={1}
          max={75}
          value={questionsNumber}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val > 75) setQuestionsNumber(75);
            else if (val < 1) setQuestionsNumber(1);
            else setQuestionsNumber(val);
          }}
          className="w-full px-3 py-2.5 rounded-lg text-sm font-medium border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
      </div>

      {/* Create Button */}
      <div className="flex justify-center pt-1">
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-2.5 rounded-full cursor-pointer"
          disabled={isCreating || !quizChapter || quizSelectedTopicIds.size === 0}
          onClick={handleCreateQuiz}
        >
          {isCreating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Quiz"
          )}
        </Button>
      </div>
    </div>
  );
};

const NotesUploadButton = ({ classId, batchId, subject }: { classId: string; batchId: string; subject: string }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    uploadedFile,
    isUploading,
    uploadProgress,
    fileInputRef,
    triggerFileSelect,
    handleFileChange,
    removeFile,
  } = useFileUpload({
    folder: "notes",
    maxSizeMB: 30,
    onError: (msg) => toast.error(msg),
  });

  const isImageFile = uploadedFile?.fileType &&
    ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(uploadedFile.fileType.toLowerCase());

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!uploadedFile?.fileUrl) {
      toast.error("Please upload a file");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createNote({
        title: title.trim(),
        batchId,
        classId,
        subject,
        fileUrl: uploadedFile.fileUrl,
        fileType: uploadedFile.fileType,
      });

      if (res.success) {
        toast.success("Note added successfully");
        setTitle("");
        removeFile();
        setOpen(false);
      } else {
        toast.error(res.message || "Failed to add note");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="flex-1 rounded-full border-purple-300 text-purple-600 hover:bg-purple-50 hover:text-purple-700 h-10 text-sm font-semibold cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Add Notes
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-5 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Add Notes</h3>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="size-4 text-gray-500" />
              </button>
            </div>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title..."
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            />

            <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp" />

            {!uploadedFile ? (
              <button
                onClick={triggerFileSelect}
                className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-purple-200 rounded-xl py-6 hover:border-purple-400 hover:bg-purple-50/50 transition-colors"
              >
                <Upload className="size-8 text-purple-400" />
                <span className="text-sm text-gray-500">Click to upload file (max 30MB)</span>
              </button>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                {isImageFile && uploadedFile.previewUrl && (
                  <div className="w-full max-h-36 overflow-hidden bg-gray-100">
                    <img src={uploadedFile.previewUrl} alt={uploadedFile.title} className="w-full h-full max-h-36 object-contain" />
                  </div>
                )}
                <div className="flex items-center justify-between px-3 py-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="size-4 text-purple-600 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-sm font-medium text-gray-700 truncate block">{uploadedFile.title}</span>
                      {isUploading && (
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden w-32">
                            <div className="h-full bg-purple-500 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                          </div>
                          <span className="text-xs text-gray-400">{uploadProgress}%</span>
                        </div>
                      )}
                      {!isUploading && uploadedFile.fileUrl && (
                        <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                          <Check className="size-3" /> Uploaded
                        </span>
                      )}
                    </div>
                  </div>
                  <button onClick={removeFile} className="p-1 hover:bg-gray-100 rounded-full shrink-0 ml-2">
                    <X className="size-3.5 text-gray-400" />
                  </button>
                </div>
              </div>
            )}

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full h-10 cursor-pointer"
              disabled={isSubmitting || isUploading || !title.trim() || !uploadedFile?.fileUrl}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
              ) : (
                "Save Note"
              )}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

const DPPUploadButton = ({ classId, batchId, subject }: { classId: string; batchId: string; subject: string }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    uploadedFile,
    isUploading,
    uploadProgress,
    fileInputRef,
    triggerFileSelect,
    handleFileChange,
    removeFile,
  } = useFileUpload({
    folder: "dpp",
    maxSizeMB: 30,
    onError: (msg) => toast.error(msg),
  });

  const isImageFile = uploadedFile?.fileType &&
    ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(uploadedFile.fileType.toLowerCase());

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!uploadedFile?.fileUrl) {
      toast.error("Please upload a file");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createDPP({
        title: title.trim(),
        description: description.trim() || title.trim(),
        batchId,
        classId,
        subject,
        attachments: [
          {
            fileName: uploadedFile.title,
            fileUrl: uploadedFile.fileUrl,
            fileType: uploadedFile.fileType,
          },
        ],
      });

      if (res.success) {
        toast.success("DPP created successfully");
        setTitle("");
        setDescription("");
        removeFile();
        setOpen(false);
      } else {
        toast.error(res.message || "Failed to create DPP");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="flex-1 rounded-full border-purple-300 text-purple-600 hover:bg-purple-50 hover:text-purple-700 h-10 text-sm font-semibold cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Add DPP
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-5 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Add DPP</h3>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="size-4 text-gray-500" />
              </button>
            </div>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="DPP title..."
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)..."
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 min-h-[70px] resize-none"
            />

            <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp" />

            {!uploadedFile ? (
              <button
                onClick={triggerFileSelect}
                className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-purple-200 rounded-xl py-6 hover:border-purple-400 hover:bg-purple-50/50 transition-colors"
              >
                <Upload className="size-8 text-purple-400" />
                <span className="text-sm text-gray-500">Click to upload file (max 30MB)</span>
              </button>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                {isImageFile && uploadedFile.previewUrl && (
                  <div className="w-full max-h-36 overflow-hidden bg-gray-100">
                    <img src={uploadedFile.previewUrl} alt={uploadedFile.title} className="w-full h-full max-h-36 object-contain" />
                  </div>
                )}
                <div className="flex items-center justify-between px-3 py-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="size-4 text-purple-600 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-sm font-medium text-gray-700 truncate block">{uploadedFile.title}</span>
                      {isUploading && (
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden w-32">
                            <div className="h-full bg-purple-500 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                          </div>
                          <span className="text-xs text-gray-400">{uploadProgress}%</span>
                        </div>
                      )}
                      {!isUploading && uploadedFile.fileUrl && (
                        <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                          <Check className="size-3" /> Uploaded
                        </span>
                      )}
                    </div>
                  </div>
                  <button onClick={removeFile} className="p-1 hover:bg-gray-100 rounded-full shrink-0 ml-2">
                    <X className="size-3.5 text-gray-400" />
                  </button>
                </div>
              </div>
            )}

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full h-10 cursor-pointer"
              disabled={isSubmitting || isUploading || !title.trim() || !uploadedFile?.fileUrl}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
              ) : (
                "Save DPP"
              )}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

const AnnouncementSection = ({ classId }: { classId: string }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    uploadedFile: attachment,
    isUploading,
    uploadProgress,
    fileInputRef,
    triggerFileSelect,
    handleFileChange,
    removeFile,
  } = useFileUpload({
    folder: "announcements",
    maxSizeMB: 30,
    onError: (msg) => toast.error(msg),
  });

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("Please enter announcement content");
      return;
    }

    if (isUploading) {
      toast.error("Please wait for the file to finish uploading");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createAnnouncement({
        content,
        classId,
        attachment: attachment
          ? {
              title: attachment.title,
              fileUrl: attachment.fileUrl,
              fileType: attachment.fileType,
            }
          : undefined,
      });

      if (res.success) {
        toast.success("Announcement posted successfully");
        setContent("");
        removeFile();
      } else {
        toast.error(res.message || "Failed to post announcement");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isImagePreview = attachment?.fileType &&
    ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(attachment.fileType.toLowerCase());

  return (
    <div className="bg-purple-50/60 rounded-2xl p-4 md:p-6 space-y-4">
      <h3 className="text-base font-bold text-gray-900">Announcement</h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write an announcement for the class...."
        className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 min-h-[100px] resize-none"
      />

      {attachment && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {isImagePreview && attachment.previewUrl && (
            <div className="relative w-full max-h-48 overflow-hidden bg-gray-50">
              <img
                src={attachment.previewUrl}
                alt={attachment.title}
                className="w-full h-full max-h-48 object-contain"
              />
            </div>
          )}
          <div className="flex items-center justify-between px-3 py-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <Paperclip className="size-4 text-purple-600 shrink-0" />
              <div className="min-w-0">
                <span className="text-sm font-medium text-gray-700 truncate block">
                  {attachment.title}
                </span>
                {isUploading && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden w-32">
                      <div
                        className="h-full bg-purple-500 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{uploadProgress}%</span>
                  </div>
                )}
                {!isUploading && attachment.fileUrl && (
                  <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <Check className="size-3" /> Uploaded
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors shrink-0 ml-2"
            >
              <X className="size-3.5 text-gray-400" />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg border-gray-200 text-gray-600 hover:text-purple-600 hover:border-purple-300 h-9 text-xs font-semibold cursor-pointer"
            onClick={triggerFileSelect}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="size-3.5 mr-1.5 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Paperclip className="size-3.5 mr-1.5" />
                Add Attachment
              </>
            )}
          </Button>
        </div>
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-2 rounded-full cursor-pointer"
          disabled={isSubmitting || isUploading || !content.trim()}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Posting...
            </>
          ) : (
            "Post"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Page;
