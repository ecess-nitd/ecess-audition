import { supabase } from "@/lib/supabase";

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

    const { data, error } = await supabase.from("submissions").insert([body]);

    if (error) throw error;

    return new Response(JSON.stringify({ message: "Form submitted successfully!", data }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
