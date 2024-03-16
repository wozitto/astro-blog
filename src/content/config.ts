import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z
      .object({
        author: z.string().default(SITE.author),
        pubDatetime: z.date(),
        modDatetime: z.date().optional().nullable(),
        title: z.string(),
        isExternalPost: z.boolean().optional(),
        externalURL: z.string().url().optional().nullable(),
        pinned: z.boolean().optional(),
        draft: z.boolean().optional(),
        tags: z.array(z.string()).default(["others"]),
        ogImage: image()
          .refine(img => img.width >= 1200 && img.height >= 630, {
            message: "OpenGraph image must be at least 1200 X 630 pixels!",
          })
          .or(z.string())
          .optional(),
        description: z.string(),
        canonicalURL: z.string().optional(),
      })
      .refine(
        data => {
          // If isExternalPost is true, then externalURL must not be null or undefined
          if (
            data.isExternalPost === true &&
            (data.externalURL === null || data.externalURL === undefined)
          ) {
            return false; // Validation fails
          }
          return true; // Validation passes
        },
        {
          message: "External post must have a valid URL", // Custom error message
          path: ["externalURL"], // Specify the path of the field that failed validation
        }
      ),
});

export const collections = { blog };
