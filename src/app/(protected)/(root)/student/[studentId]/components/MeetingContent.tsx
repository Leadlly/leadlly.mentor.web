import React, { useState } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { acceptMeeting, getMeetings } from "@/actions/meeting_actions";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { MeetingDataProps } from "@/helpers/types";
import { convertDateString } from "@/helpers/utils";
import { cn } from "@/lib/utils";

import MeetingCard from "./MeetingCard";
import MeetingCardSkeleton from "./MeetingCardSkeleton";
import RescheduleDialogBox from "./RescheduleDialogBox";
import ScheduleMeeting from "./ScheduleMeeting";

const MeetingContent = ({ studentId }: { studentId: string }) => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingSubTab, setUpcomingSubTab] = useState("request");
  const [isAcceptingMeeting, setIsAcceptingMeeting] = useState<string | null>(
    null
  );
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [openRescheduleDialog, setOpenRescheduleDialog] = useState(false);
  const queryClient = useQueryClient();

  const { data: meetingsDataObj, isLoading: loading } = useQuery({
    queryKey: ["meetings", studentId, activeTab, upcomingSubTab],
    queryFn: async () => {
      let meetingQuery = "";
      let createdByQuery = "";

      if (activeTab === "done") {
        meetingQuery = "done";
      } else if (activeTab === "upcoming") {
        if (upcomingSubTab === "your-meetings") {
          createdByQuery = "mentor";
        }
        if (upcomingSubTab === "request") {
          createdByQuery = "student";
        }
      }

      try {
        return await getMeetings(studentId, meetingQuery, createdByQuery);
      } catch (error) {
        toast.error("Failed to fetch meetings data.");
        throw error;
      }
    },
  });

  const meetingsData: MeetingDataProps[] = meetingsDataObj?.meetings || [];

  const handleAccept = async (meetingId: string) => {
    setIsAcceptingMeeting(meetingId);
    try {
      const res = await acceptMeeting(meetingId);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["meetings", studentId] });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsAcceptingMeeting(null);
    }
  };

  const handleReschedule = (meetingId: string) => {
    setMeetingId(meetingId);
    setOpenRescheduleDialog(true);
  };

  return (
    <div className="p-3">
      <div className="tabs mb-4 flex justify-between">
        {[
          { id: "upcoming", label: "Upcoming" },
          { id: "schedule", label: "Schedule New" },
          { id: "done", label: "Done" },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={"ghost"}
            size={"lg"}
            className={cn(
              `px-4 py-2 font-semibold transition-colors duration-300`,
              activeTab === tab.id &&
                "text-primary underline underline-offset-4"
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === "upcoming" && (
          <>
            <div className="mb-4 justify-center flex space-x-4">
              {[
                { id: "request", label: "Request" },
                { id: "your-meetings", label: "Your Meetings" },
              ].map((subTab) => (
                <Button
                  key={subTab.id}
                  variant={"ghost"}
                  className={`px-3 py-2 font-medium transition-colors duration-300 ${
                    upcomingSubTab === subTab.id &&
                    "text-primary underline underline-offset-4"
                  }`}
                  onClick={() => setUpcomingSubTab(subTab.id)}
                >
                  {subTab.label}
                </Button>
              ))}
            </div>

            {loading ? (
              <div className="flex flex-col gap-4">
                <MeetingCardSkeleton />
                <MeetingCardSkeleton />
                <MeetingCardSkeleton />
              </div>
            ) : meetingsData.length ? (
              meetingsData.map((meeting) => (
                <MeetingCard
                  key={meeting._id}
                  data={meeting}
                  isAcceptingMeeting={isAcceptingMeeting}
                  onAccept={() => handleAccept(meeting._id)}
                  onReschedule={() => handleReschedule(meeting._id)}
                />
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-sm text-muted-foreground font-semibold">
                  No Meetings yet!
                </p>
              </div>
            )}

            {openRescheduleDialog && (
              <RescheduleDialogBox
                setOpenRescheduleDialog={setOpenRescheduleDialog}
                meetingId={meetingId}
              />
            )}
          </>
        )}

        {activeTab === "schedule" && <ScheduleMeeting studentId={studentId} />}

        {activeTab === "done" && (
          <div>
            {meetingsData.length ? (
              meetingsData.map((meeting) => (
                <div key={meeting._id} className="mb-4 mx-4">
                  <h3 className="text-lg font-semibold">{meeting.message}</h3>
                  <p className="text-gray-600">
                    Date:{" "}
                    {meeting.rescheduled && meeting.rescheduled.isRescheduled
                      ? convertDateString(new Date(meeting.rescheduled.date))
                      : convertDateString(new Date(meeting.date))}
                  </p>
                </div>
              ))
            ) : (
              <div className="w-full text-center text-lg text-muted-foreground font-medium">
                <p>No meetings done yet!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingContent;
