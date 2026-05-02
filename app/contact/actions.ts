"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name must be 80 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(120, "Email must be 120 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message must be 2000 characters or fewer."),
});

export type ContactFieldErrors = {
  name?: string[];
  email?: string[];
  message?: string[];
};

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: ContactFieldErrors;
  submittedAt?: number;
};

export async function submitContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  if (!telegramBotToken || !telegramChatId) {
    return {
      status: "error",
      message: "Contact service is not configured. Please try again later.",
    };
  }

  const { name, email, message } = validatedFields.data;
  const text = [
    "New Contact Message",
    `Name: ${name}`,
    `Email: ${email}`,
    "Message:",
    message,
  ].join("\n");

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text,
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Telegram sendMessage failed:", response.status, errorText);

      return {
        status: "error",
        message: "Failed to send message. Please try again in a moment.",
      };
    }

    return {
      status: "success",
      message: "Message sent successfully. I will get back to you soon.",
      submittedAt: Date.now(),
    };
  } catch (error) {
    console.error("Unexpected error while sending Telegram message:", error);

    return {
      status: "error",
      message: "Failed to send message. Please try again in a moment.",
    };
  }
}
