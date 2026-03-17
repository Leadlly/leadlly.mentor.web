"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send, X } from "lucide-react";
import { createAnnouncement } from "@/actions/announcement_actions";
import { toast } from "sonner";

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  batchId?: string;
  classId?: string;
  onSuccess?: () => void;
}

const AnnouncementModal = ({ isOpen, onClose, batchId, classId, onSuccess }: AnnouncementModalProps) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachment, setAttachment] = useState<{ title: string; fileUrl: string; fileType: string } | null>(null);

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("Please enter announcement content");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createAnnouncement({
        content,
        batchId,
        classId,
        attachment: attachment || undefined,
      });

      if (res.success) {
        toast.success("Announcement posted successfully");
        setContent("");
        setAttachment(null);
        onClose();
        if (onSuccess) onSuccess();
      } else {
        toast.error(res.message || "Failed to post announcement");
      }
    } catch (error) {
       toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] border-none shadow-2xl rounded-[30px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 px-2">Create Announcement</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 p-2">
          <Textarea
            placeholder="Write your announcement here..."
            className="min-h-[150px] rounded-2xl border-gray-100 focus:border-purple-200 focus:ring-purple-200 transition-all text-base resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {attachment && (
            <div className="flex items-center justify-between bg-purple-50 p-3 rounded-xl border border-purple-100">
              <div className="flex items-center gap-2">
                <Paperclip className="size-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900 truncate max-w-[300px]">{attachment.title}</span>
              </div>
              <button 
                onClick={() => setAttachment(null)}
                className="p-1 hover:bg-purple-200 rounded-full transition-colors"
              >
                <X className="size-4 text-purple-600" />
              </button>
            </div>
          )}
        </div>

        <DialogFooter className="flex items-center justify-between sm:justify-between px-2 pb-2">
          <div className="flex items-center gap-2">
             <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-gray-100 text-gray-500"
                onClick={() => {
                   // Placeholder for attachment logic
                   setAttachment({ title: "Mock_Resource.pdf", fileUrl: "#", fileType: "pdf" });
                   toast.info("Attachment logic placeholder triggered");
                }}
             >
                <Paperclip className="size-5" />
             </Button>
          </div>
          <div className="flex gap-3">
             <Button variant="ghost" onClick={onClose} className="rounded-full font-bold">Cancel</Button>
             <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="rounded-full bg-[#A855F7] hover:bg-[#9333EA] font-bold px-6 shadow-md shadow-purple-100"
            >
              {isSubmitting ? "Posting..." : (
                <>
                  Post <Send className="ml-2 size-4" />
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementModal;
