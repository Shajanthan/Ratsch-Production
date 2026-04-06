import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import RevealOnScroll from "@/components/RevealOnScroll";
import { useContactForm } from "@/hooks/useContactForm";

interface RatschLetsTalkProps {}

const RatschLetsTalk: React.FC<RatschLetsTalkProps> = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    message,
    setMessage,
    submitting,
    submit,
  } = useContactForm();

  return (
    <div className="pt-12 " id="contact">
      <div className="bg-white z-10 py-8 md:py-16 relative">
        <div className="container lg:max-w-[1400px] mx-auto text-[#02244A] px-4 2xl:px-0">
          <RevealOnScroll>
            <div className="text-4xl md:text-6xl lg:text-6xl xl:text-8xl uppercase font-bold pb-6 md:pb-8 break-words">
              Lets Talk
            </div>
          </RevealOnScroll>
          <RevealOnScroll
            delayMs={100}
            className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12 xl:gap-16 py-8 md:py-12 xl:py-18"
          >
            {/* info */}
            <div className="uppercase">
              <div className="py-2 md:py-3">
                <div className="text-sm md:text-base xl:text-lg">Email</div>
                <div className="text-lg md:text-xl xl:text-3xl font-semibold py-1 md:py-2 break-all">
                  info@ratschproductions.com
                </div>
              </div>
              <div className="py-2 md:py-3">
                <div className="text-sm md:text-base xl:text-lg">Phone</div>
                <div className="text-lg md:text-xl xl:text-3xl font-semibold py-1 md:py-2">
                  +41 78 601 36 50
                </div>
                <div className="text-lg md:text-xl xl:text-3xl font-semibold py-1 md:py-2 flex gap-3 items-center">
                  +94 72 471 8466
                  <FaWhatsapp size={24} className="text-green-500" />
                </div>
              </div>
              <div className="py-2 md:py-3">
                <div className="text-sm md:text-base xl:text-lg">Address</div>
                <div className="text-lg md:text-xl xl:text-3xl font-semibold py-1 md:py-2">
                  Sri Lanka / Switzerland
                </div>
              </div>
            </div>
            {/* Form — POST /api/contact (Nodemailer on server) */}
            <form className="uppercase" onSubmit={submit} noValidate>
              <div className="py-2 md:py-3">
                <div className="text-sm md:text-base xl:text-lg">Name</div>
                <div className="py-2 md:py-3">
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border hover:cursor-default border-zinc-500 hover:border-[#02244A] transition-all duration-500 rounded-md py-3 md:py-4 bg-zinc-200 w-full xl:w-3/4 focus:ring-1 ring-[#02244A] focus:outline-none px-2 text-sm md:text-base"
                    placeholder="your name here"
                    disabled={submitting}
                  />
                </div>
              </div>
              <div className="py-2 md:py-3">
                <div className="text-sm md:text-base xl:text-lg">Email</div>
                <div className="py-2 md:py-3">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border hover:cursor-default border-zinc-500 hover:border-[#02244A] transition-all duration-500 rounded-md py-3 md:py-4 bg-zinc-200 w-full xl:w-3/4 focus:ring-1 ring-[#02244A] focus:outline-none px-2 text-sm md:text-base"
                    placeholder="your email here"
                    disabled={submitting}
                  />
                </div>
              </div>
              <div className="py-2 md:py-3">
                <div className="text-sm md:text-base xl:text-lg">Message</div>
                <div className="py-2 md:py-3">
                  <textarea
                    rows={6}
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="leave your message here"
                    className="border hover:cursor-default border-zinc-500 hover:border-[#02244A] transition-all duration-500 rounded-md py-3 md:py-4 bg-zinc-200 w-full xl:w-3/4 focus:ring-1 ring-[#02244A] focus:outline-none px-2 text-sm md:text-base resize-none"
                    disabled={submitting}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
                className="bg-[#02244A] border p-2 md:p-3 w-full xl:w-3/4 py-4 md:py-5 text-sm md:text-base xl:text-lg hover:border-[#02244A] hover:bg-[#02244A] text-white transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending…" : "Send"}
              </button>
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
};

export default RatschLetsTalk;
