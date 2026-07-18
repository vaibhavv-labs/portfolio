"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";
import { FaWhatsapp, FaFacebook } from "react-icons/fa";
import { HiMail, HiLocationMarker } from "react-icons/hi";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/vaibhavv-labs",
    Icon: RxGithubLogo,
    color: "#ffffff",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/va1bhav__09?igsh=MWpjNHBkNWl0bHhoZw==",
    Icon: RxInstagramLogo,
    color: "#E1306C",
  },
  {
    name: "Twitter / X",
    href: "https://x.com/VaibhavBho98362",
    Icon: RxTwitterLogo,
    color: "#1DA1F2",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/vaibhav-bhoyate-6328802a9/",
    Icon: RxLinkedinLogo,
    color: "#0A66C2",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/19BMbss4d2/",
    Icon: FaFacebook,
    color: "#1877F2",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/918830269849",
    Icon: FaWhatsapp,
    color: "#25D366",
  },
];

const contactDetails = [
  {
    Icon: HiMail,
    label: "Email",
    value: "vaibhavbhoyate976@gmail.com",
    href: "mailto:vaibhavbhoyate976@gmail.com",
    color: "#7042f8",
  },
  {
    Icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+91 8830269849",
    href: "https://wa.me/918830269849",
    color: "#25D366",
  },
  {
    Icon: HiLocationMarker,
    label: "Location",
    value: "Chandwad, Maharashtra, India",
    href: "#",
    color: "#00d8ff",
  },
];

export const Footer = () => {
  return (
    <footer id="contact" className="relative w-full overflow-hidden pt-24 pb-8 px-6">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-700/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto flex flex-col items-center">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-14"
        >
          <span className="text-sm font-semibold text-[#b49bff] uppercase tracking-widest mb-3">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 text-center">
            Contact Me
          </h1>
          <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
          <p className="mt-4 text-gray-400 text-sm max-w-md text-center">
            Have a project in mind or want to collaborate? Feel free to reach out — I&apos;m always open to exciting opportunities!
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-14"
        >
          {contactDetails.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              target={item.href !== "#" ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center p-5 rounded-2xl border border-[#7042f830] bg-gradient-to-b from-[#0d0925]/80 to-[#030014] hover:border-[#7042f870] hover:shadow-[0_0_30px_rgba(112,66,248,0.15)] transition-all duration-400 relative overflow-hidden"
            >
              {/* Top glow */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to right, transparent, ${item.color}, transparent)` }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${item.color}20`, border: `1px solid ${item.color}50` }}
              >
                <item.Icon className="w-6 h-6" style={{ color: item.color }} />
              </div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-sm text-gray-200 font-medium group-hover:text-white transition-colors">{item.value}</p>
            </Link>
          ))}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6 mb-14"
        >
          <p className="text-gray-500 text-sm uppercase tracking-widest">Find me on</p>
          <div className="flex flex-wrap justify-center gap-4">
            {socials.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#7042f830] bg-[#0d0925]/60 hover:border-[#7042f870] text-gray-300 hover:text-white transition-all duration-300 text-sm group"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
                >
                  <s.Icon
                    className="w-4 h-4 transition-colors duration-300"
                    style={{ color: s.color }}
                  />
                  <span>{s.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7042f850] to-transparent mb-8" />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between w-full gap-3 text-gray-500 text-sm"
        >
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-semibold">
              Vaibhav Bhoyate
            </span>
            . All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Built with Next.js & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
