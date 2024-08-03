"use client";

import React, { useState } from "react";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

import { CalendarIcon, Check, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import GMeetInputLinkModal from "./GMeetInputLinkModal";
import { scheduleMeeting } from "@/actions/meeting_actions";

const RequestMeetingFormSchema = z.object({
  date_of_meeting: z.date({
    required_error: "A date is required to request meeting.",
  }),
  time: z.string({ required_error: "A time is required to request meeting!" }),
  meeting_agenda: z.string().optional(),
});

const RequestMeetingComponent = ({ studentId }: { studentId: string }) => {
  const [openGMeetLinkInputModal, setOpenGMeetLinkInputModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mentorGMeetLink = useAppSelector(
    (state) => state.user.user?.gmeet.link
  );

  const form = useForm<z.infer<typeof RequestMeetingFormSchema>>({
    resolver: zodResolver(RequestMeetingFormSchema),
  });

  const handleGMeetLinkInputModal = () => {
    setOpenGMeetLinkInputModal(true);
  };

  const onSubmit = async (data: z.infer<typeof RequestMeetingFormSchema>) => {
    if (!mentorGMeetLink) {
      return toast.error("No meeting link available!");
    }

    const formattedData = {
      date: new Date(data.date_of_meeting),
      time: data.time,
      studentIds: [studentId],
    };

    setIsSubmitting(true);

    try {
      const res = await scheduleMeeting(formattedData);
      if (res.success && res.success === false) {
        return toast.error(res.message);
      }

      toast.success(res.message);
      form.reset();
      setSubmitted(true);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (hour: number, minute: number) => {
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  const intervalCount = (22 - 9) * 4 + 1;

  return (
    <div>
      {!submitted ? (
        <div className="h-[74dvh] flex flex-col gap-y-5 md:gap-y-7 rounded-xl overflow-y-auto custom__scrollbar px-3 md:px-7 pb-4">
          {/* Request Meet */}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-5 w-full max-w-lg mx-auto"
            >
              <div className="grid grid-cols-2 gap-5">
                {/* Date Select */}
                <FormField
                  control={form.control}
                  name="date_of_meeting"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd-MM-yyyy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              const currentDate = new Date();
                              const endDate = new Date();
                              endDate.setDate(currentDate.getDate() + 7); // Set end date to 7 days from today
                              return date < currentDate || date > endDate;
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Time Select */}
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Time</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-72">
                          {Array.from({ length: intervalCount }).map((_, i) => {
                            const hour = Math.floor(i / 4) + 9;
                            const minute = (i % 4) * 15;
                            const timeSlot = formatTime(hour, minute);
                            return (
                              <SelectItem key={i} value={timeSlot}>
                                {timeSlot}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="meeting_agenda"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Meeting agenda..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex items-center justify-between">
                <Button
                  type="button"
                  variant={"secondary"}
                  onClick={handleGMeetLinkInputModal}
                  className="text-primary bg-primary/10"
                >
                  {mentorGMeetLink ? "Update Meeting Link" : "Get Meeting Link"}
                </Button>
                <Button
                  type="submit"
                  disabled={!mentorGMeetLink || isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Schedule"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          {openGMeetLinkInputModal && (
            <GMeetInputLinkModal
              setOpenGMeetLinkInputModal={setOpenGMeetLinkInputModal}
            />
          )}
        </div>
      ) : (
        <div className="relative flex flex-col items-center justify-center h-full pt-12">
          <Button
            variant={"outline"}
            size={"sm"}
            className="absolute right-4 top-4"
            onClick={() => setSubmitted(false)}
          >
            Back
          </Button>
          <div className="h-full flex flex-col gap-y-7 items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 text-white bg-primary rounded-full flex items-center justify-center shadow-[0_0_32px_0_#9654f4]">
              <Check className="w-8 h-8 md:w-12 md:h-12" />
            </div>
            <h1 className="text-primary text-4xl text-center font-bold">
              Meeting Scheduled Successfully
            </h1>
            <div className="text-center">
              <h3 className="text-3xl font-semibold">Thank You!</h3>
              <p className="font-medium text-xl m-1">Your Meet is Scheduled</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestMeetingComponent;
