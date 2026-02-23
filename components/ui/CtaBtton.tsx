"use client"
import Link from 'next/link'
import { MessageCircle, Sparkles } from 'lucide-react'

export default function CTAButton() {
  return (
    <>
      <div className="relative inline-flex items-center justify-center">

        <div className="absolute inset-0 rounded-full bg-purple-600/30 blur-2xl scale-150 pointer-events-none -z-10" />
        <div className="absolute inset-0 rounded-full bg-fuchsia-500/15 blur-3xl scale-[2] pointer-events-none -z-10" />
        <div className="absolute inset-0 rounded-full border border-purple-400/50 pulse-ring pointer-events-none -z-10" />

        <Sparkles size={13} className="sparkle-icon absolute -top-3 -right-2 text-fuchsia-300/80 pointer-events-none z-0" />
        <Sparkles size={9} className="sparkle-icon-delayed absolute -bottom-2 -left-2 text-purple-300/60 pointer-events-none z-0" />

        <Link
          href="/chat"
          className="cta-btn group relative z-10 overflow-hidden flex items-center gap-3 px-8 py-4 rounded-full text-white font-veles text-lg tracking-wide shadow-2xl shadow-purple-900/60 transition-all duration-300 hover:scale-105 hover:shadow-purple-700/70 active:scale-95 select-none cursor-pointer"
        >
          <span className="shimmer-bar absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full skew-x-[-15deg] pointer-events-none" />
          <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full pointer-events-none" />

          <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/15 border border-white/20 group-hover:bg-white/25 transition-colors duration-300">
            <MessageCircle size={17} className="text-white" />
          </span>

          <span className="relative z-10 font-apex font-semibold">
            Start Chatting
          </span>

          <span className="relative z-10 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 text-base">
            →
          </span>
        </Link>
      </div>
    </>
  )
}