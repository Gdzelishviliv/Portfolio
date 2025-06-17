"use client";

import { useState } from "react";
import { Button } from "@/app/components/styles/ui/button";
import { Input } from "@/app/components/styles/ui/input";
import { Label } from "@/app/components/styles/ui/label";
import { Textarea } from "@/app/components/styles/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/styles/ui/card";
import { Alert, AlertDescription } from "@/app/components/styles/ui/alert";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { sendContactEmail } from "@/app/actions/contact";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        setStatus({
          type: "success",
          message: "Thank you for your message! I'll get back to you soon.",
        });
        const form = document.getElementById("contact-form") as HTMLFormElement;
        form?.reset();
      } else {
        setStatus({
          type: "error",
          message: result.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="backdrop-blur-xl bg-white/2 border-white/20 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2 text-white">
          <Mail className="h-5 w-5 text-white/50" />
          Send me a message
        </CardTitle>
        <CardDescription className="text-white">
          Fill out the form below and I&apos;ll respond as soon as possible.
        </CardDescription>
      </CardHeader>

      <CardContent className="relative z-10">
        <form id="contact-form" action={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-200">
                Name *
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Your full name"
                required
                disabled={isSubmitting}
                className="bg-white/2 border-white/10 text-white placeholder-white/2 focus:border-blue-400 focus:ring-blue-400 backdrop-blur-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                required
                disabled={isSubmitting}
                className="bg-white/2 border-white/10 text-white placeholder-white/2 focus:border-blue-400 focus:ring-blue-400 backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-gray-200">
              Subject *
            </Label>
            <Input
              id="subject"
              name="subject"
              placeholder="What's this about?"
              required
              disabled={isSubmitting}
              className="bg-white/2 border-white/10 text-white placeholder-white/2 focus:border-blue-400 focus:ring-blue-400 backdrop-blur-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-gray-200">
              Message *
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell me about your project or inquiry..."
              className="min-h-[120px] bg-white/2 border-white/20 text-white placeholder-white/2 focus:border-blue-400 focus:ring-blue-400 backdrop-blur-sm resize-vertical"
              required
              disabled={isSubmitting}
            />
          </div>

          {status.type && (
            <Alert
              className={
                status.type === "success"
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }
            >
              {status.type === "success" ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription
                className={
                  status.type === "success" ? "text-green-800" : "text-red-800"
                }
              >
                {status.message}
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full bg-white/2 hover:bg-white/5 border border-gray-500/30 shadow-lg hover:shadow-gray-500/25 backdrop-blur-sm transition-all duration-200 cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
