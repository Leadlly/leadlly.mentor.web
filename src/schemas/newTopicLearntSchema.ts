import { z } from "zod";

export const NewTopicLearntSchema = z.object({
  chapterName: z.object({
    _id: z.string({ error: "Please select a chapter!" }),
    name: z.string({ error: "Please select a chapter!" }),
  }),
  topicNames: z
    .array(
      z.object({
        _id: z.string(),
        name: z.string(),
        subItems: z
          .array(
            z.object({
              _id: z.string(),
              name: z.string(),
            })
          )
          .optional(),
      })
    )
    .min(1, { message: "Please select at least one topic" }),
});
