"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Check, ChevronDown, Loader2, Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import {
  getChapters,
  getTopicsWithSubtopics,
} from "@/actions/questionbank_actions";
// import { updatePlanner } from "@/actions/planner_actions";
// import { saveStudyData } from "@/actions/studyData_actions";
import LeftArrowIcon from "@/components/icons/LeftArrowIcon";
import { NestedMultiSelect } from "@/components/shared/nested-multi-select";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ISubject, Item } from "@/helpers/types";
import { cn } from "@/lib/utils";
import { NewTopicLearntSchema } from "@/schemas/newTopicLearntSchema";

const ContinuousRevisionForm = ({
  userStandard,
  userSubjects,
  userCompetitiveExam,
  activeSubject,
  setActiveSubject,
}: {
  userStandard: number;
  userSubjects: ISubject[];
  userCompetitiveExam: string;
  activeSubject: string;
  setActiveSubject: (activeSubject: string) => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chapterPopoverOpen, setChapterPopoverOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<Item[]>([]);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof NewTopicLearntSchema>>({
    resolver: zodResolver(NewTopicLearntSchema),
    defaultValues: {
      chapterName: {
        _id: "",
        name: "",
      },
      topicNames: [],
    },
  });

  const selectedChapter = form.watch("chapterName");

  const { data: activeTabChapters, isLoading } = useQuery({
    queryKey: ["chapters", activeSubject, userStandard, userCompetitiveExam],
    queryFn: async () => {
      try {
        return await getChapters(
          activeSubject,
          userStandard,
          userCompetitiveExam
        );
      } catch (error: any) {
        toast.error("Error fetching chapters", {
          description: error.message,
        });
        throw error;
      }
    },
    enabled: !!activeSubject && !!userStandard,
  });

  const { data: topics, isLoading: isLoadingTopics } = useQuery({
    queryKey: [
      "topics",
      activeSubject,
      userStandard,
      selectedChapter?._id,
      userCompetitiveExam,
    ],
    queryFn: async () => {
      try {
        return await getTopicsWithSubtopics(
          activeSubject,
          userStandard,
          selectedChapter!._id,
          userCompetitiveExam
        );
      } catch (error: any) {
        toast.error("Error fetching topics", {
          description: error.message,
        });
        throw error;
      }
    },
    enabled: !!activeSubject && !!userStandard && !!selectedChapter?._id,
  });

  useEffect(() => {
    form.reset({
      chapterName: { _id: "", name: "" },
      topicNames: [],
    });
  }, [activeSubject, form]);

  const onSubmit = async (data: z.infer<typeof NewTopicLearntSchema>) => {
    setIsSubmitting(true);

    const formattedData = {
      tag: "continuous_revision",
      topics: data.topicNames.map((topic) => ({
        _id: topic._id,
        name: topic.name,
        subtopics: topic.subItems,
      })),
      chapter: {
        _id: data?.chapterName?._id,
        name: data?.chapterName?.name,
      },
      subject: activeSubject!,
      standard: userStandard!,
    };

    try {
      // const responseData = await saveStudyData(formattedData);

      // await updatePlanner();
      queryClient.invalidateQueries({ queryKey: ["plannerData"] });
      toast.success("Planner updated successfully");

      form.reset({
        chapterName: { _id: "", name: "" },
        topicNames: [],
      });
      setSelectedValues([]);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full space-y-3">
      <div className="flex items-center justify-between w-full">
        {userSubjects.map((subject) => (
          <Button
            key={subject.name}
            variant={"outline"}
            size={"sm"}
            onClick={() => setActiveSubject(subject.name)}
            className={cn(
              "capitalize",
              activeSubject === subject.name &&
                "border-primary bg-primary/10 text-primary font-semibold hover:text-primary hover:bg-primary/15"
            )}
          >
            {subject.name}
          </Button>
        ))}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="chapterName"
            render={({ field }) => (
              <FormItem>
                <Popover
                  open={chapterPopoverOpen}
                  onOpenChange={setChapterPopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between text-left",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <span className="flex-1 truncate">
                          {field.value
                            ? activeTabChapters?.chapters?.find(
                                (chapter: any) =>
                                  chapter._id === field.value?._id
                              )?.name
                            : "Select chapter"}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search chapter..." />
                      <CommandList className="custom__scrollbar">
                        <CommandEmpty>No chapter found.</CommandEmpty>
                        <CommandGroup>
                          {isLoading ? (
                            <CommandItem>
                              <Loader2Icon className="animate-spin size-4" />
                            </CommandItem>
                          ) : (
                            activeTabChapters?.chapters?.map((chapter: any) => (
                              <CommandItem
                                value={chapter.name}
                                key={chapter._id}
                                onSelect={() => {
                                  if (field.value?._id !== chapter._id) {
                                    form.setValue("chapterName", {
                                      _id: chapter._id,
                                      name: chapter.name,
                                    });
                                    form.setValue("topicNames", []);
                                    setSelectedValues([]);
                                  }
                                  setChapterPopoverOpen(false);
                                }}
                                className="cursor-pointer"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    chapter._id === field.value?._id
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="topicNames"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <NestedMultiSelect
                    options={
                      topics?.topics?.map((topic: any) => ({
                        _id: topic._id,
                        name: topic.name,
                        subItems: topic.subtopics,
                      })) || []
                    }
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    selectedValues={selectedValues}
                    setSelectedValues={setSelectedValues}
                    placeholder={isLoadingTopics ? "Loading topics..." : "Select topics"}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="flex items-center sm:justify-between w-full">
            <DialogClose asChild>
              <Button
                type="button"
                variant={"outline"}
                className="gap-x-2"
                onClick={() => {
                  form.setValue("chapterName", { _id: "", name: "" });
                  form.setValue("topicNames", []);
                  setActiveSubject("");
                }}
              >
                <LeftArrowIcon className="size-1" />
                Back
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center text-sm">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting
                </span>
              ) : (
                "Submit"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default ContinuousRevisionForm;
