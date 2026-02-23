"use client";

import { useState } from "react";


const skills = [
  {
    category: "Frontend",
    icon: "⬡",
    color: "from-blue-500/20 to-cyan-500/20 border-blue-500/25 text-blue-300",
    dot: "bg-blue-400",
    items: ["React.js", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux Toolkit"],
  },
  {
    category: "UI & Styling",
    icon: "◈",
    color: "from-pink-500/20 to-rose-500/20 border-pink-500/25 text-pink-300",
    dot: "bg-pink-400",
    items: ["Tailwind CSS", "shadcn/ui", "Radix UI", "CSS Modules", "Responsive Design", "Dark Mode Systems"],
  },
  {
    category: "Backend & APIs",
    icon: "⬢",
    color: "from-violet-500/20 to-purple-500/20 border-violet-500/25 text-violet-300",
    dot: "bg-violet-400",
    items: ["Node.js", "REST APIs", "GraphQL", "Supabase", "Firebase", "WebSockets"],
  },
  {
    category: "DevOps & Tools",
    icon: "◎",
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/25 text-emerald-300",
    dot: "bg-emerald-400",
    items: ["Docker", "Git & GitHub", "CI/CD", "Vercel", "Linux", "Nginx"],
  },
];

const stats = [
  { value: "3+", label: "Years of Experience" },
  { value: "20+", label: "Projects Delivered" },
  { value: "5+", label: "Open Source Repos" },
  { value: "∞", label: "Lines of Code" },
];

const timeline = [
  {
    year: "2025",
    title: "Building O-CHAT",
    desc: "Architected and developed a full-stack real-time chat platform using Next.js 15, WebSockets, and Tailwind CSS with a focus on performance and security.",
    tag: "Current",
    color: "text-blue-400 border-blue-400/30 bg-blue-400/5",
  },
  {
    year: "2024",
    title: "Mid-Level Frontend Developer",
    desc: "Took ownership of complex UI systems, led frontend architecture decisions, and mentored junior developers across multiple product teams.",
    tag: "Work",
    color: "text-violet-400 border-violet-400/30 bg-violet-400/5",
  },
  {
    year: "2023",
    title: "Mastered the React Ecosystem",
    desc: "Deep-dived into Next.js App Router, server components, TypeScript, and modern state management patterns. Fell in love with Tailwind CSS.",
    tag: "Growth",
    color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
  },
  {
    year: "2022",
    title: "First Professional Role",
    desc: "Joined my first tech company as a frontend developer. Shipped production React apps, learned agile workflows, and got obsessed with clean UI.",
    tag: "Start",
    color: "text-amber-400 border-amber-400/30 bg-amber-400/5",
  },
];


function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
  return (
    <div
      className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-sm text-center"
      style={{ animation: `fadeSlideUp 0.6s ease both`, animationDelay: `${300 + index * 80}ms` }}
    >
      <span className="text-4xl font-black tracking-tight bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent [font-family:Georgia,serif] mb-1">
        {value}
      </span>
      <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/35">
        {label}
      </span>
    </div>
  );
}

function SkillCard({ skill, index }: { skill: (typeof skills)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative rounded-2xl border bg-gradient-to-br p-5 transition-all duration-300 cursor-default ${skill.color} ${hovered ? "-translate-y-1 shadow-[0_16px_40px_rgba(0,0,0,0.4)]" : ""}`}
      style={{ animation: `fadeSlideUp 0.6s ease both`, animationDelay: `${500 + index * 100}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl opacity-80">{skill.icon}</span>
        <h3 className="text-[13px] font-bold tracking-[0.1em] uppercase opacity-90">
          {skill.category}
        </h3>
      </div>
      {/* Items */}
      <ul className="flex flex-col gap-2">
        {skill.items.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-[13px] text-white/65">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${skill.dot}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TimelineItem({ item, index }: { item: (typeof timeline)[0]; index: number }) {
  return (
    <div
      className="relative flex gap-6"
      style={{ animation: `fadeSlideUp 0.6s ease both`, animationDelay: `${400 + index * 100}ms` }}
    >
      {/* Line */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-white/20 border border-white/20 mt-1 shrink-0" />
        {index < timeline.length - 1 && (
          <div className="w-px flex-1 bg-white/[0.07] mt-2" />
        )}
      </div>
      {/* Content */}
      <div className="pb-8">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="text-[11px] font-bold tracking-widest uppercase text-white/30">
            {item.year}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold tracking-wider uppercase ${item.color}`}>
            {item.tag}
          </span>
        </div>
        <h4 className="text-[15px] font-semibold text-white/85 mb-1.5 [font-family:Georgia,serif]">
          {item.title}
        </h4>
        <p className="text-[13px] text-white/40 leading-relaxed max-w-lg">{item.desc}</p>
      </div>
    </div>
  );
}


export default function AboutPage() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">

      <div className="pointer-events-none fixed -top-60 -left-60 w-[700px] h-[700px] rounded-full bg-blue-600/[0.08] blur-[140px]" />
      <div className="pointer-events-none fixed top-1/2 -right-48 w-[560px] h-[560px] rounded-full bg-violet-600/[0.07] blur-[130px]" />
      <div className="pointer-events-none fixed -bottom-32 left-1/4 w-[480px] h-[480px] rounded-full bg-emerald-600/[0.06] blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-20 pb-28">

        <section className="mb-24">
          <div
            className="flex flex-col md:flex-row md:items-end gap-10 md:gap-16"
            style={{ animation: "fadeSlideUp 0.6s ease both" }}
          >
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-[6px] h-[6px] rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa] animate-pulse" />
                <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/35">
                  About the Developer
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white/95 mb-4 font-apex">
                Matin
                <br />
                <span className="bg-linear-to-r from-purple-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                  Pirmohammadi
                </span>
              </h1>

              <p className="text-[15px] text-white/40 font-medium tracking-wide mb-5">
                Frontend Developer · React · Next.js · Tailwind ...
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:pirmohammadimatin@gmail.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-300 text-[13px] font-semibold hover:bg-blue-500/25 hover:border-blue-400/50 transition-all duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Get in Touch
                </a>
                <a
                  href="https://github.com/matin0303/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white/55 text-[13px] font-semibold hover:bg-white/[0.09] hover:text-white/80 transition-all duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://t.me/cwmtn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white/55 text-[13px] font-semibold hover:bg-white/[0.09] hover:text-white/80 transition-all duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
                  </svg>
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20" style={{ animation: "fadeSlideUp 0.6s ease both", animationDelay: "150ms" }}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-7 md:p-9 backdrop-blur-sm">
            <SectionLabel>Who I Am</SectionLabel>
            <div className="space-y-4 text-[14.5px] text-white/55 leading-[1.85]">
              <p>
                Hi, I'm <span className="text-white/85 font-semibold">Matin Pirmohammadi</span> — a mid-level frontend developer with 3+ years of experience crafting fast, accessible, and visually sharp web applications. I specialize in the React and Next.js ecosystem, and I genuinely care about every pixel and every millisecond of performance.
              </p>
              <p>
                My journey started with a curiosity about how the web works, and that curiosity never stopped. I've since worked across product teams, built full-stack applications, and developed a strong eye for clean UI systems — particularly with Tailwind CSS, which I consider one of the best tools in the modern frontend stack.
              </p>
              <p>
                Beyond the browser, I'm comfortable in DevOps territory too — containerizing apps with <span className="text-white/75 font-medium">Docker</span>, setting up CI/CD pipelines, deploying on <span className="text-white/75 font-medium">Vercel</span>, and managing Linux servers. I believe great frontend developers understand the full deployment story.
              </p>
              <p>
                Right now I'm building <span className="text-blue-400 font-semibold">O-CHAT</span> — a real-time chat platform focused on performance, security, and an exceptional user experience. It's the project I'm most proud of.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <SectionLabel>By the Numbers</SectionLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
          </div>
        </section>

        <section className="mb-20">
          <SectionLabel>Tech Stack & Skills</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill, i) => <SkillCard key={skill.category} skill={skill} index={i} />)}
          </div>
        </section>

        <section className="mb-20">
          <SectionLabel>My Journey</SectionLabel>
          <div className="mt-6">
            {timeline.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} />
            ))}
          </div>
        </section>

        <section className="mb-20" style={{ animation: "fadeSlideUp 0.6s ease both", animationDelay: "200ms" }}>
          <SectionLabel>My Philosophy</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            {[
              {
                icon: "⚡",
                title: "Performance First",
                desc: "A fast interface isn't a luxury — it's respect for the user's time. I obsess over bundle sizes, render cycles, and Core Web Vitals.",
                border: "border-amber-500/20 bg-amber-500/[0.04]",
                label: "text-amber-400",
              },
              {
                icon: "🎯",
                title: "Clean Code",
                desc: "Code is read far more than it's written. I write with future teammates in mind — clear, typed, documented, and testable.",
                border: "border-blue-500/20 bg-blue-500/[0.04]",
                label: "text-blue-400",
              },
              {
                icon: "🔐",
                title: "Security Aware",
                desc: "Building O-CHAT taught me to think like an attacker. Auth, rate limiting, encryption — security is baked in, not bolted on.",
                border: "border-emerald-500/20 bg-emerald-500/[0.04]",
                label: "text-emerald-400",
              },
            ].map((p, i) => (
              <div
                key={p.title}
                className={`rounded-2xl border p-5 ${p.border} transition-all duration-300 hover:-translate-y-1`}
                style={{ animation: `fadeSlideUp 0.6s ease both`, animationDelay: `${600 + i * 100}ms` }}
              >
                <span className="text-2xl mb-3 block">{p.icon}</span>
                <h4 className={`text-[13px] font-bold tracking-wide mb-2 ${p.label}`}>{p.title}</h4>
                <p className="text-[12.5px] text-white/40 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="rounded-2xl bg-gradient-to-br from-blue-500/10 via-violet-500/8 to-emerald-500/10 border border-white/[0.08] p-8 md:p-12 text-center backdrop-blur-sm"
          style={{ animation: "fadeSlideUp 0.6s ease both", animationDelay: "300ms" }}
        >
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/30 mb-3">
            Open to Opportunities
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-white/90 mb-3 [font-family:Georgia,serif]">
            Let's Build Something Great
          </h2>
          <p className="text-[14px] text-white/40 max-w-md mx-auto mb-7 leading-relaxed">
            Whether it's a product idea, a collaboration, or just a conversation about frontend — I'm always happy to connect.
          </p>
          <a
            href="https://t.me/cwmtn"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl bg-blue-500/20 border border-blue-400/35 text-blue-300 font-semibold text-[14px] hover:bg-blue-500/30 hover:border-blue-400/55 transition-all duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Say Hello
          </a>
        </section>
      </div>
    </main>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/30">
        {children}
      </span>
      <div className="flex-1 h-px bg-white/[0.06]" />
    </div>
  );
}
