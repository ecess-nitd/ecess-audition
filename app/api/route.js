import { supabase } from "@/lib/supabase";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email format"),
  phone: z.string().length(10, "Phone number must be 10 digits").regex(/^\d+$/, "Phone must contain only numbers"),
  domain: z.array(z.enum(["Web Development", "Embedded Systems", "Event Management", "Video Editing", "Graphic Designing"])).min(1, "At least one domain must be selected").max(2, "Maximum 2 domains allowed"),
  gender: z.enum(["Male", "Female", "Others"]),
  cgpa: z.coerce.number().min(5.00, "CGPA must be at least 5.00").max(10.00, "CGPA must be at most 10.00"),
  roll_number: z.string().max(8, "Roll number must be at most 8 characters"),
  performance: z.string().max(500, "Performance description is too long").optional(),
});

// In-memory store to track request counts
const rateLimitStore = {};

const RATE_LIMIT = 5; // Max requests per IP in 1 minute
const TIME_FRAME = 60 * 1000; // 1 minute in milliseconds

export async function POST(req) {
  try {
    const clientIP = req.headers.get("x-forwarded-for") || req.connection.remoteAddress;
    const currentTime = Date.now();

    // Check if IP exists in rateLimitStore
    if (!rateLimitStore[clientIP]) {
      rateLimitStore[clientIP] = {
        count: 1,
        firstRequestTime: currentTime,
      };
    } else {
      const { count, firstRequestTime } = rateLimitStore[clientIP];

      // If the request is within the same time frame (1 minute)
      if (currentTime - firstRequestTime < TIME_FRAME) {
        if (count >= RATE_LIMIT) {
          return new Response(
            JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
            { status: 429 }
          );
        }
        // Otherwise, increment the count
        rateLimitStore[clientIP].count = count + 1;
      } else {
        // Reset the counter after the time frame has passed
        rateLimitStore[clientIP] = { count: 1, firstRequestTime: currentTime };
      }
    }

    const body = await req.json();

    // Validate request body with Zod
    const validationResult = formSchema.safeParse(body);
    if (!validationResult.success) {
      return new Response(JSON.stringify({ error: validationResult.error.format() }), { status: 400 });
    }

    const { data, error } = await supabase.from("submissions").insert([body]);

    if (error) throw error;

    return new Response(JSON.stringify({ message: "Form submitted successfully!", data }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
