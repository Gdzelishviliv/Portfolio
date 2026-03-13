"use client";

import { Github, Linkedin, Facebook, Mail } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/Gdzelishviliv",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/ivane-gdzelishvili-966003283",
    label: "LinkedIn",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/vano.grdzelishvili.139923",
    label: "Facebook",
  },
  {
    icon: Mail,
    href: "mailto:gdzelishviliv@gmail.com",
    label: "Email",
  },
];

export default function PortfolioFooter() {
  return (
    <footer className="text-white relative overflow-hidden border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="relative m-auto max-w-[1920px] py-8 px-4 md:px-8 lg:px-24">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="text-white/50 text-sm">Connect:</span>
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
          <div className="text-white/50 text-sm text-center sm:text-right">
            <p>&copy; {new Date().getFullYear()} Ivane Gdzelishvili</p>
            <p className="mt-1 text-white/30">Built with Next.js</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
