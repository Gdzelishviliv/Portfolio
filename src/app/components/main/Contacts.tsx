import { Contact } from "../organisms/Contact";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="text-center mb-12 text-white">
        <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
        <p className="text-white text-lg">Have a project in mind? Let's discuss how we can work together.</p>
      </div>
      <Contact/>
    </div>
  )
}
