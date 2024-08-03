import { rescheduleMeeting, scheduleMeeting } from "@/actions/meeting_actions";
import Modal from "@/components/shared/Modal";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarDaysIcon, Loader2, X } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const RescheduleMeetingFormSchema = z.object({
  date: z.date({
    required_error: "A date is required to request meeting.",
  }),
  time: z.string({ required_error: "A time is required to request meeting!" }),
});

const RescheduleDialogBox = ({
  setOpenRescheduleDialog,
  meetingId,
  meetingType = "reschedule",
  studentIds,
  onClose,
}: {
  setOpenRescheduleDialog: (openRescheduleDialog: boolean) => void;
  meetingId?: string | null;
  studentIds?: string[];
  meetingType?: string;
  onClose?: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof RescheduleMeetingFormSchema>>({
    resolver: zodResolver(RescheduleMeetingFormSchema),
  });

  // for rescheduling the particular meeting
  const onRescheduleMeetingSubmit = async (
    data: z.infer<typeof RescheduleMeetingFormSchema>
  ) => {
    setIsSubmitting(true);

    try {
      const res = await rescheduleMeeting(meetingId!, data);
      if (!res.success) {
        return toast.error(res.message);
      }

      toast.success(res.message);
      setOpenRescheduleDialog(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // for scheduling Group meeting
  const onGroupMeetingSubmit = async (
    data: z.infer<typeof RescheduleMeetingFormSchema>
  ) => {
    setIsSubmitting(true);

    try {
      const res = await scheduleMeeting({
        date: new Date(data.date),
        time: data.time,
        studentIds,
      });
      if (res.success && res.success === false) {
        return toast.error(res.message);
      }

      toast.success("Group meeting scheduled successfully");
      if (onClose) {
        onClose();
      }
      setOpenRescheduleDialog(false);
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
    <Modal setOpenDialogBox={setOpenRescheduleDialog} className="max-w-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-semibold leading-tight">
          {meetingType === "reschedule"
            ? "Reschedule Meeting"
            : "Schedule Group Meeting"}
        </h2>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => setOpenRescheduleDialog(false)}
        >
          <X className="w-3 h-3 md:w-4 md:h-4" />
        </Button>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col items-center justify-center space-y-5 w-full"
          onSubmit={form.handleSubmit(
            meetingType === "reschedule"
              ? onRescheduleMeetingSubmit
              : onGroupMeetingSubmit
          )}
        >
          <div className="w-full grid sm:grid-cols-2 gap-4 sm:gap-10">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of meeting</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarDaysIcon className="ml-auto h-4 w-4 opacity-50" />
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

          <Button
            type="submit"
            disabled={isSubmitting}
            className="max-w-60 w-full"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : meetingType === "reschedule" ? (
              "Reschedule"
            ) : (
              "Schedule Meeting"
            )}
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default RescheduleDialogBox;
