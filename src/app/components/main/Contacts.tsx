import { Rancho } from "next/font/google";
import { Contact } from "../organisms/Contact";
import { motion } from "framer-motion";

const rancho = Rancho({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rancho",
});

export default function ContactPage() {
  return (
    <div
      id="contact"
      className={`container mx-auto px-4 py-16 max-w-2xl ${rancho.variable}`}
    >
      <div className="text-center mb-12 text-white">
        <motion.h1
          className="text-white font-main font-bold tracking-wider text-2xl sm:text-3xl md:text-4xl lg:text-4xl relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            clipPath: "inset(0 0 0 0)",
            scale: 1,
          }}
          exit={{
            opacity: 0,
            clipPath: "inset(0 100% 0 0)",
            scale: 0.8,
          }}
          viewport={{ once: false, amount: 0.2 }}
          style={{
            animation: "wave 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
            animationDelay: "0.8s",
          }}
        >
          Get in touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            clipPath: "inset(0 0 0 0)",
            scale: 1,
          }}
          exit={{
            opacity: 0,
            clipPath: "inset(0 100% 0 0)",
            scale: 0.8,
          }}
          viewport={{ once: false, amount: 0.2 }}
          style={{
            animation: "wave 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
            animationDelay: "0.8s",
          }}
          className="text-white text-lg font-main"
        >
          Have a project in mind? Let&apos;s discuss how we can work together.
        </motion.p>
      </div>
      <Contact />
    </div>
  );
}
