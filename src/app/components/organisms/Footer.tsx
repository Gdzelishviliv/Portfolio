"use client";

import { Github, Linkedin, Facebook, Mail } from "lucide-react";
import Link from "next/link";

export default function PortfolioFooter() {
  return (
    <footer className=" text-white relative overflow-hidden border-t border-white/20 bg-gradient-to-br from-white/5 to-transparent">
      <div className="relative m-auto max-w-[1920px] py-16 inset-0 ">
        <div className="border-t border-white/20 px-4 md:px-8 lg:px-24 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-white/80 text-sm">Follow me:</span>
              <div className="flex gap-3">
                {[
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
                ].map(({ icon: Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    className="p-2 rounded-lg bg-black-800/50 hover:bg-gray-500/20 text-white hover:text-white transition-all duration-200 hover:scale-110"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="text-white/80 text-sm text-center sm:text-right">
              <p>
                &copy; {new Date().getFullYear()} Ivane Gdzelishvili. All rights
                reserved.
              </p>
              <p className="mt-1">Built with Next.js</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
