import { rescheduleMeeting } from "@/actions/meeting_actions";
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
import { CalendarDaysIcon, CalendarIcon, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
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
}: {
  setOpenRescheduleDialog: (openRescheduleDialog: boolean) => void;
  meetingId: string | null;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof RescheduleMeetingFormSchema>>({
    resolver: zodResolver(RescheduleMeetingFormSchema),
  });

  const onSubmit = async (
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

  return (
    <Modal setOpenDialogBox={setOpenRescheduleDialog}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-2xl font-semibold leading-tight">
          Reschedule Meeting
        </h2>
        <button
          onClick={() => setOpenRescheduleDialog(false)}
          className="w-7 h-7 md:w-10 md:h-10 rounded-lg border flex items-center justify-center"
        >
          <X className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col items-center justify-center space-y-5 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
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
                    <SelectContent>
                      <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                      <SelectItem value="9:30 AM">9:30 AM</SelectItem>
                      <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                      <SelectItem value="10:30 AM">10:30 AM</SelectItem>
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
            ) : (
              "Reschedule"
            )}
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default RescheduleDialogBox;
