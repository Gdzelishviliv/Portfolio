"use server"

import { z } from "zod"
import { Resend } from "resend"

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function sendContactEmail(formData: FormData) {
    try {
        const validatedFields = contactSchema.safeParse({
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
        })

        if (!validatedFields.success) {
            return {
                success: false,
                error: "Please check your form data and try again.",
            }
        }

        const { name, email, subject, message } = validatedFields.data

        const resend = new Resend(process.env.RESEND_API_KEY)

        await resend.emails.send({
            from: `${process.env.DOMAIN_NAME}`,
            to: `${process.env.EMAIL_FROM}`,
            subject: `Portfolio Contact: ${subject}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        })

        console.log("Contact form submission:", { name, email, subject, message })

        await new Promise((resolve) => setTimeout(resolve, 1000))

        return { success: true }
    } catch (error) {
        console.error("Error sending contact email:", error)
        return {
            success: false,
            error: "Failed to send message. Please try again later.",
        }
    }
}
