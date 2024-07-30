import React, { useState } from "react";
import MeetingCard from "./MeetingCard";
import ScheduleMeeting from "./ScheduleMeeting";
import { toast } from "sonner";
import { acceptMeeting } from "@/actions/meeting_actions";
import { MeetingDataProps } from "@/helpers/types";
import RescheduleDialogBox from "./RescheduleDialogBox";

const MeetingContent = ({
  meetings,
  studentId,
}: {
  meetings: MeetingDataProps[];
  studentId: string;
}) => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "schedule">(
    "upcoming"
  );
  const [isAcceptingMeeting, setIsAcceptingMeeting] = useState<string | null>(
    null
  );
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [openRescheduleDialog, setOpenRescheduleDialog] = useState(false);

  const handleAccept = async (meetingId: string) => {
    setIsAcceptingMeeting(meetingId);
    try {
      const res = await acceptMeeting(meetingId);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
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
        <button
          className={`px-4 py-2 font-semibold transition-colors duration-300 ${
            activeTab === "upcoming"
              ? "text-[#56249E]"
              : "text-black hover:border-b-[1px] hover:border-[#56249E]"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Meetings
        </button>
        <button
          className={`px-4 py-2 font-semibold transition-colors duration-300 ${
            activeTab === "schedule"
              ? "text-[#56249E]"
              : "text-black hover:border-b-[1px] hover:border-[#56249E]"
          }`}
          onClick={() => setActiveTab("schedule")}
        >
          Schedule Meeting
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "upcoming" && (
          <>
            <div>
              {meetings && meetings.length ? (
                meetings.map((meeting) => (
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
                    No meetings scheduled!
                  </p>
                </div>
              )}
            </div>
            {openRescheduleDialog && (
              <RescheduleDialogBox
                setOpenRescheduleDialog={setOpenRescheduleDialog}
                meetingId={meetingId}
              />
            )}
          </>
        )}
        {activeTab === "schedule" && <ScheduleMeeting studentId={studentId} />}
      </div>
    </div>
  );
};

export default MeetingContent;
