"use client";

import React, { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getInstituteBatches, createClassAction } from "@/actions/batch_actions";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";

export const AddClassModal = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAppSelector((state) => state.user);
  
  const instituteId = user?.institute?._id;
  const teacherId = user?._id;

  const { data: batches, isLoading: isBatchesLoading } = useQuery({
    queryKey: ["institute-batches", instituteId],
    queryFn: () => getInstituteBatches(instituteId!),
    enabled: !!instituteId,
  });

  const [formData, setFormData] = useState({
    batchId: "",
    subjectName: "",
    topic: "",
    date: "",
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await createClassAction(data);
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-classes"] });
      toast.success("Class created successfully!");
      setOpen(false);
      setFormData({
        batchId: "",
        subjectName: "",
        topic: "",
        date: "",
      });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create class. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.batchId || !formData.subjectName) {
      toast.error("Please fill all required fields");
      return;
    }

    mutation.mutate({
      ...formData,
      teacherId,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white h-[44px] text-sm font-bold shadow-sm px-4">
          <Plus className="size-4 mr-2" />
          Add Class
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight">Create Class</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="batch" className="font-semibold text-gray-700">Select Batch *</Label>
              <Select value={formData.batchId} onValueChange={(val) => setFormData(prev => ({ ...prev, batchId: val }))} disabled={isBatchesLoading}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={isBatchesLoading ? "Loading batches..." : "Choose a batch"} />
                </SelectTrigger>
                <SelectContent>
                  {batches && batches.map((batch: any) => (
                    <SelectItem key={batch._id} value={batch._id}>
                      {batch.name} - Std {batch.standard}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="font-semibold text-gray-700">Subject Name *</Label>
              <Input 
                id="subject"
                placeholder="e.g. Physics" 
                value={formData.subjectName}
                onChange={(e) => setFormData(prev => ({ ...prev, subjectName: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic" className="font-semibold text-gray-700">Topic (Optional)</Label>
              <Input 
                id="topic"
                placeholder="e.g. Thermodynamics" 
                value={formData.topic}
                onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="font-semibold text-gray-700">Date (Optional)</Label>
              <Input 
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button 
              type="submit" 
              className="bg-purple-600 hover:bg-purple-700 shadow-md w-full sm:w-auto px-8"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Class"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
