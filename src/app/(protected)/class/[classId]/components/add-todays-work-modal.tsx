"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Check,
  ChevronDown,
  Clock,
  Loader2,
  BookOpen,
  Plus,
  Pencil,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getChapters,
  getTopicsWithSubtopics,
} from "@/actions/questionbank_actions";
import {
  createTodaysWork,
  getTodaysLecture,
  updateTodaysWork,
} from "@/actions/lecture_actions";
import { toast } from "sonner";
import dayjs from "dayjs";

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

interface ExistingLecture {
  _id: string;
  chapters: Array<{ _id: string; name: string }>;
  topics: Array<{ _id: string; name: string }>;
  subtopics: Array<{ _id: string; name: string }>;
  duration: number;
}

interface AddTodaysWorkProps {
  classId: string;
  batchId: string;
  subject: string;
  standard: string | number;
  className?: string;
  compact?: boolean;
}

const AddTodaysWorkModal = ({
  classId,
  batchId,
  subject,
  standard,
  className,
  compact = false,
}: AddTodaysWorkProps) => {
  const [open, setOpen] = useState(false);
  const [chapterPopoverOpen, setChapterPopoverOpen] = useState(false);
  const [duration, setDuration] = useState(60);

  const [chapters, setChapters] = useState<ChapterItem[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<ChapterItem | null>(null);
  const [chaptersLoading, setChaptersLoading] = useState(false);

  const [topics, setTopics] = useState<TopicItem[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<
    Map<string, { topic: TopicItem; selectedSubtopics: Set<string> }>
  >(new Map());
  const [topicsLoading, setTopicsLoading] = useState(false);

  const [existingLecture, setExistingLecture] = useState<ExistingLecture | null>(null);
  const [initialLoading, setInitialLoading] = useState(false);
  const prefillDoneRef = useRef(false);

  const isUpdateMode = !!existingLecture;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!open || !subject || !standard) return;
    const fetchChapters = async () => {
      setChaptersLoading(true);
      try {
        const data = await getChapters(subject, standard);
        setChapters(data.chapters || []);
      } catch {
        toast.error("Failed to load chapters");
      } finally {
        setChaptersLoading(false);
      }
    };
    fetchChapters();
  }, [open, subject, standard]);

  useEffect(() => {
    if (!open) return;
    prefillDoneRef.current = false;
    const fetchExisting = async () => {
      setInitialLoading(true);
      try {
        const lecture = await getTodaysLecture(classId);
        setExistingLecture(lecture);
        if (lecture) setDuration(lecture.duration || 60);
      } catch {
        setExistingLecture(null);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchExisting();
  }, [open, classId]);

  useEffect(() => {
    if (prefillDoneRef.current || !existingLecture || chapters.length === 0) return;
    const existingChapter = existingLecture.chapters?.[0];
    if (existingChapter) {
      const match = chapters.find((c) => c._id === existingChapter._id);
      setSelectedChapter(match || { _id: existingChapter._id, name: existingChapter.name });
    }
  }, [existingLecture, chapters]);

  useEffect(() => {
    if (!selectedChapter) { setTopics([]); return; }
    const fetchTopics = async () => {
      setTopicsLoading(true);
      try {
        const data = await getTopicsWithSubtopics(subject, standard, selectedChapter._id);
        setTopics(data.topics || []);
      } catch {
        toast.error("Failed to load topics");
      } finally {
        setTopicsLoading(false);
      }
    };
    fetchTopics();
  }, [selectedChapter, subject, standard]);

  useEffect(() => {
    if (prefillDoneRef.current || !existingLecture || topics.length === 0) return;
    const existingTopicIds = new Set(existingLecture.topics?.map((t) => t._id) || []);
    const existingSubtopicIds = new Set(existingLecture.subtopics?.map((s) => s._id) || []);
    const prefilled = new Map<string, { topic: TopicItem; selectedSubtopics: Set<string> }>();
    for (const topic of topics) {
      if (existingTopicIds.has(topic._id)) {
        const subs = new Set<string>();
        for (const sub of topic.subtopics) {
          if (existingSubtopicIds.has(sub._id)) subs.add(sub._id);
        }
        if (subs.size === 0 && topic.subtopics.length > 0) {
          topic.subtopics.forEach((s) => subs.add(s._id));
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
        next.set(topic._id, { topic, selectedSubtopics: new Set(topic.subtopics.map((s) => s._id)) });
      }
      return next;
    });
  }, []);

  const toggleSubtopic = useCallback((topic: TopicItem, subtopicId: string) => {
    setSelectedTopics((prev) => {
      const next = new Map(prev);
      const entry = next.get(topic._id);
      if (!entry) {
        next.set(topic._id, { topic, selectedSubtopics: new Set([subtopicId]) });
      } else {
        const subs = new Set(entry.selectedSubtopics);
        if (subs.has(subtopicId)) {
          subs.delete(subtopicId);
          if (subs.size === 0) next.delete(topic._id);
          else next.set(topic._id, { ...entry, selectedSubtopics: subs });
        } else {
          subs.add(subtopicId);
          next.set(topic._id, { ...entry, selectedSubtopics: subs });
        }
      }
      return next;
    });
  }, []);

  const buildPayload = () => {
    if (!selectedChapter) throw new Error("Please select a chapter");
    if (selectedTopics.size === 0) throw new Error("Please select at least one topic");
    const topicsPayload = Array.from(selectedTopics.values()).map(({ topic, selectedSubtopics }) => ({
      _id: topic._id,
      name: topic.name,
      subItems: topic.subtopics.filter((s) => selectedSubtopics.has(s._id)).map((s) => ({ _id: s._id, name: s.name })),
    }));
    const allSubtopics = topicsPayload.flatMap((t) => t.subItems.map((s) => ({ _id: s._id, name: s.name })));
    return {
      chapter: [{ _id: selectedChapter._id, name: selectedChapter.name }],
      topics: topicsPayload,
      subtopics: allSubtopics,
      duration,
    };
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = buildPayload();
      if (isUpdateMode) return updateTodaysWork(existingLecture._id, payload);
      return createTodaysWork({ classId, batchId, ...payload });
    },
    onSuccess: () => {
      toast.success(isUpdateMode ? "Work updated! Student planners are being refreshed." : "Today's work saved! Student planners are being updated.");
      queryClient.invalidateQueries({ queryKey: ["class-details", classId] });
      queryClient.invalidateQueries({ queryKey: ["teacher-report"] });
      queryClient.invalidateQueries({ queryKey: ["teacher-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["class-lectures", classId] });
      resetForm();
      setOpen(false);
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to save today's work");
    },
  });

  const resetForm = () => {
    setSelectedChapter(null);
    setSelectedTopics(new Map());
    setDuration(60);
    setTopics([]);
    setExistingLecture(null);
    prefillDoneRef.current = false;
  };

  const selectedCount = selectedTopics.size;
  const totalSubtopicsSelected = Array.from(selectedTopics.values()).reduce((sum, entry) => sum + entry.selectedSubtopics.size, 0);

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            compact
              ? "rounded-lg bg-gray-50 hover:bg-purple-50 text-gray-700 hover:text-purple-700 h-9 text-xs font-semibold transition-all px-3 border-0 cursor-pointer"
              : "gap-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800 font-semibold cursor-pointer"
          )}
        >
          <Plus className={compact ? "size-3.5 mr-1" : "size-4"} />
          Add{compact ? " " : " Today's "}Work
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
        {initialLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin size-6 text-purple-500 mr-3" />
            <span className="text-gray-500 font-medium">Loading...</span>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold tracking-tight flex items-center gap-2">
                {isUpdateMode ? <Pencil className="size-5 text-purple-600" /> : <BookOpen className="size-5 text-purple-600" />}
                {isUpdateMode ? "Update Today's Work" : "Today's Class Work"}
              </DialogTitle>
            </DialogHeader>

            <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Class</p>
                  <p className="text-lg font-bold text-gray-900 capitalize">{className || subject}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="text-sm font-bold text-gray-800">{dayjs().format("DD MMM YYYY")}</p>
                </div>
              </div>
              {isUpdateMode && (
                <div className="mt-2 text-xs text-purple-600 font-medium bg-purple-100/60 rounded-md px-2 py-1 inline-block">
                  Editing existing work for today
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="font-semibold text-gray-700 flex items-center gap-2">
                <Clock className="size-4 text-purple-500" />
                Duration (minutes)
              </Label>
              <Input type="number" min={1} max={600} value={duration} onChange={(e) => setDuration(Number(e.target.value) || 60)} className="w-32" />
            </div>

            <div className="space-y-2">
              <Label className="font-semibold text-gray-700">Select Chapter *</Label>
              <Popover open={chapterPopoverOpen} onOpenChange={setChapterPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" className={cn("w-full justify-between text-left", !selectedChapter && "text-muted-foreground")}>
                    <span className="flex-1 truncate">
                      {selectedChapter ? selectedChapter.name : chaptersLoading ? "Loading chapters..." : "Select chapter"}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[--radix-popover-trigger-width]" align="start">
                  <Command>
                    <CommandInput placeholder="Search chapter..." />
                    <CommandList className="max-h-[200px]">
                      <CommandEmpty>No chapter found.</CommandEmpty>
                      <CommandGroup>
                        {chaptersLoading ? (
                          <CommandItem disabled><Loader2 className="animate-spin size-4 mr-2" />Loading...</CommandItem>
                        ) : (
                          chapters.map((chapter) => (
                            <CommandItem
                              key={chapter._id}
                              value={chapter.name}
                              onSelect={() => { setSelectedChapter(chapter); setSelectedTopics(new Map()); prefillDoneRef.current = true; setChapterPopoverOpen(false); }}
                              className="cursor-pointer"
                            >
                              <Check className={cn("mr-2 h-4 w-4", selectedChapter?._id === chapter._id ? "opacity-100" : "opacity-0")} />
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

            <div className="space-y-2">
              <Label className="font-semibold text-gray-700">
                Select Topics *{" "}
                {selectedCount > 0 && (
                  <span className="text-purple-600 font-normal text-xs ml-1">
                    ({selectedCount} topic{selectedCount > 1 ? "s" : ""}{totalSubtopicsSelected > 0 ? `, ${totalSubtopicsSelected} subtopic${totalSubtopicsSelected > 1 ? "s" : ""}` : ""})
                  </span>
                )}
              </Label>

              {!selectedChapter ? (
                <div className="text-sm text-gray-400 border rounded-md p-4 text-center">Select a chapter first</div>
              ) : topicsLoading ? (
                <div className="flex items-center justify-center p-4 border rounded-md">
                  <Loader2 className="animate-spin size-4 mr-2 text-purple-500" />
                  <span className="text-sm text-gray-500">Loading topics...</span>
                </div>
              ) : topics.length === 0 ? (
                <div className="text-sm text-gray-400 border rounded-md p-4 text-center">No topics found for this chapter</div>
              ) : (
                <div className="border rounded-lg max-h-[250px] overflow-y-auto divide-y">
                  {topics.map((topic) => {
                    const isSelected = selectedTopics.has(topic._id);
                    const entry = selectedTopics.get(topic._id);
                    return (
                      <div key={topic._id} className="px-3 py-2">
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded p-1 -m-1" onClick={() => toggleTopic(topic)}>
                          <Checkbox checked={isSelected} />
                          <span className="text-sm font-medium text-gray-800">{topic.name}</span>
                        </div>
                        {isSelected && topic.subtopics.length > 0 && (
                          <div className="ml-6 mt-1.5 space-y-1">
                            {topic.subtopics.map((sub) => (
                              <div key={sub._id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded p-1 -m-1" onClick={() => toggleSubtopic(topic, sub._id)}>
                                <Checkbox checked={entry?.selectedSubtopics.has(sub._id) ?? false} className="size-3.5" />
                                <span className="text-xs text-gray-600">{sub.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button variant="outline" onClick={() => { setOpen(false); resetForm(); }}>Cancel</Button>
              <Button
                className="bg-purple-600 hover:bg-purple-700 px-6 cursor-pointer"
                disabled={mutation.isPending || !selectedChapter || selectedTopics.size === 0}
                onClick={() => mutation.mutate()}
              >
                {mutation.isPending ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{isUpdateMode ? "Updating..." : "Saving..."}</>
                ) : isUpdateMode ? "Update Work" : "Save Work"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddTodaysWorkModal;
