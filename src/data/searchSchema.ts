import { z } from "zod";

export const searchSchema = z
  .string()
  .trim()
  .max(50, "Search term too long")
  .regex(/^[a-zA-Z0-9\s-]*$/, "Only letters, numbers, spaces and dashes are allowed")
  .optional();
