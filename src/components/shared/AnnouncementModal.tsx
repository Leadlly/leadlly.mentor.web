"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send, X, Loader2, Check } from "lucide-react";
import { createAnnouncement } from "@/actions/announcement_actions";
import { useFileUpload } from "@/hooks/use-file-upload";
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
        batchId,
        classId,
        attachment: attachment
          ? { title: attachment.title, fileUrl: attachment.fileUrl, fileType: attachment.fileType }
          : undefined,
      });

      if (res.success) {
        toast.success("Announcement posted successfully");
        setContent("");
        removeFile();
        onClose();
        if (onSuccess) onSuccess();
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
            <div className="bg-purple-50 rounded-xl border border-purple-100 overflow-hidden">
              {isImagePreview && attachment.previewUrl && (
                <div className="w-full max-h-40 overflow-hidden bg-white">
                  <img
                    src={attachment.previewUrl}
                    alt={attachment.title}
                    className="w-full h-full max-h-40 object-contain"
                  />
                </div>
              )}
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2 min-w-0">
                  <Paperclip className="size-4 text-purple-600 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-purple-900 truncate block max-w-[300px]">
                      {attachment.title}
                    </span>
                    {isUploading && (
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-purple-200 rounded-full overflow-hidden w-32">
                          <div
                            className="h-full bg-purple-500 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <span className="text-xs text-purple-500">{uploadProgress}%</span>
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
                  className="p-1 hover:bg-purple-200 rounded-full transition-colors shrink-0"
                >
                  <X className="size-4 text-purple-600" />
                </button>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <DialogFooter className="flex items-center justify-between sm:justify-between px-2 pb-2">
          <div className="flex items-center gap-2">
             <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-gray-100 text-gray-500"
                onClick={triggerFileSelect}
                disabled={isUploading}
             >
                {isUploading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <Paperclip className="size-5" />
                )}
             </Button>
          </div>
          <div className="flex gap-3">
             <Button variant="ghost" onClick={onClose} className="rounded-full font-bold">Cancel</Button>
             <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting || isUploading}
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
