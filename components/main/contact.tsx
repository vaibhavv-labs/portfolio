"use client";

import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/lib/motion";

export const Contact = () => {
  return (
    <section id="contact" className="flex flex-col items-center justify-center py-20 px-10 z-[20]">
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-10">
        Contact Me
      </h1>

      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-10 mt-5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInFromLeft(0.5)}
          className="flex-1 flex flex-col gap-5 p-8 rounded-2xl border border-[#7042f88b] bg-gradient-to-br from-[#030014]/90 to-[#12072B]/80 shadow-[0_15px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          <h2 className="text-2xl font-bold text-white">Let's Connect</h2>
          <p className="text-gray-400">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <div className="flex flex-col gap-2 mt-4 text-gray-300">
            <span className="flex items-center gap-2">
              <strong className="text-[#00d8ff]">Email:</strong> vaibhavbhoyate976@gmail.com
            </span>
            <span className="flex items-center gap-2">
              <strong className="text-[#00d8ff]">WhatsApp:</strong> +91 8830269849
            </span>
            <span className="flex items-center gap-2">
              <strong className="text-[#00d8ff]">Location:</strong> Chandwad, Maharashtra, India
            </span>
          </div>
        </motion.div>

        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInFromRight(0.5)}
          className="flex-1 flex flex-col gap-4 p-8 rounded-2xl border border-[#7042f88b] bg-gradient-to-br from-[#030014]/90 to-[#12072B]/80 shadow-[0_15px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm">Your Name</label>
            <input type="text" placeholder="John Doe" className="p-3 rounded-lg bg-[#030014] border border-[#7042f88b] text-white focus:outline-none focus:border-[#00d8ff] transition-colors" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm">Your Email</label>
            <input type="email" placeholder="john@example.com" className="p-3 rounded-lg bg-[#030014] border border-[#7042f88b] text-white focus:outline-none focus:border-[#00d8ff] transition-colors" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm">Message</label>
            <textarea rows={4} placeholder="Hello Vaibhav..." className="p-3 rounded-lg bg-[#030014] border border-[#7042f88b] text-white focus:outline-none focus:border-[#00d8ff] transition-colors" />
          </div>
          <button type="button" className="mt-2 py-3 px-6 button-primary text-center text-white cursor-pointer rounded-lg font-semibold w-full hover:shadow-[0_0_20px_#7042f8] transition-all">
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};
