import { Rancho } from "next/font/google";
import { Contact } from "../organisms/Contact";

const rancho = Rancho({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rancho",
});

export default function ContactPage() {
  return (
    <div id="contact" className={`container mx-auto px-4 py-16 max-w-2xl ${rancho.variable}`}>
      <div className="text-center mb-12 text-white">
        <h1 className="text-4xl font-bold mb-4 font-main">Get In Touch</h1>
        <p className="text-white text-lg font-main">Have a project in mind? Let's discuss how we can work together.</p>
      </div>
      <Contact/>
    </div>
  )
}
