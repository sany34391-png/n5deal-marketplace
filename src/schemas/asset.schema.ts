
import { z } from "zod";

export const assetSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must contain at least 3 characters")
    .max(100, "Title must contain no more than 100 characters"),

  description: z
    .string()
    .trim()
    .min(20, "Description must contain at least 20 characters")
    .max(
      1000,
      "Description must contain no more than 1000 characters"
    ),

  industry: z
    .string()
    .trim()
    .min(2, "Industry is required")
    .max(50, "Industry is too long"),

  location: z
    .string()
    .trim()
    .min(2, "Location is required")
    .max(100, "Location is too long"),

  price: z
    .number()
    .positive("Price must be greater than 0"),

  revenue: z
    .number()
    .positive("Revenue must be greater than 0"),

  ebitda: z
    .number()
    .positive("EBITDA must be greater than 0"),
});

export type AssetFormData = z.infer<typeof assetSchema>;
