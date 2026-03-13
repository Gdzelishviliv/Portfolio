import { Contact } from "../organisms/Contact";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <section
      id="contact"
      className="container mx-auto px-4 pt-20 pb-16 max-w-2xl md:pt-24 lg:pt-28"
    >
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-white font-bold tracking-wider text-2xl sm:text-3xl md:text-4xl">
          Get in Touch
        </h2>
        <p className="text-white/50 mt-3 max-w-md mx-auto text-sm md:text-base">
          Have a project in mind? Let&apos;s discuss how we can work together.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Contact />
      </motion.div>
    </section>
  );
}
