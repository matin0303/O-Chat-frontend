"use client";
import ArticleCard from "@/components/articles/ArticleCard";
import { articles } from "@/components/articles/data";
import { useState } from "react";

const FILTERS = ["All", "AI & Technology", "Engineering", "Security", "Tutorial", "Design"];

export default function ArticlesPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"? articles : articles.filter((a) => a.category === activeFilter);

  return (
    <main className="relative min-h-screen  text-white overflow-hidden">

    
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-20 pb-28">

        <header className="mb-14">

          <h1 className=" text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.08] tracking-tight text-white/95 mb-4 font-apex">
            Articles &amp;
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>

          <p className="text-base text-white/35 max-w-md leading-relaxed">
            Deep dives, tutorials, and engineering stories from the world of real-time chat.
          </p>
        </header>

        <div className="flex flex-wrap gap-2.5 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={` px-5 py-2 rounded-full border text-[13px] font-medium  backdrop-blur-md cursor-pointer  transition-all duration-200
                ${
                  activeFilter === f ? "bg-blue-500/15 border-blue-400/40 text-white": "bg-white/[0.04] border-white/10 text-white/45 hover:bg-white/[0.07] hover:border-white/20 hover:text-white/75"
                }
              `}
            >
              {f}
            </button>
          ))}
        </div>

        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/20 mb-8">
          {filtered.length} Article{filtered.length !== 1 ? "s" : ""}
          {activeFilter !== "All" ? ` · ${activeFilter}` : ""}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex items-center justify-center py-28 text-white/25 text-sm tracking-wide">
            No articles found in this category.
          </div>
        )}
      </div>

   
    </main>
  );
}
