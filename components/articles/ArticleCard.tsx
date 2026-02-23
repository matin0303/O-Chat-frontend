import { articles } from "@/components/articles/data";

const categoryStyles: Record<string, string> = {
  "AI & Technology": "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
  Engineering: "bg-violet-500/10 border-violet-500/30 text-violet-300",
  Security: "bg-red-500/10 border-red-500/30 text-red-300",
  Tutorial: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
  Design: "bg-pink-500/10 border-pink-500/30 text-pink-300",
};

const tagStyles: Record<string, string> = {
  Trending: "bg-amber-400/10 text-amber-300 border-amber-400/25",
  Technical: "bg-blue-400/10 text-blue-300 border-blue-400/25",
  "Must Read": "bg-red-400/10 text-red-300 border-red-400/25",
  New: "bg-emerald-400/10 text-emerald-300 border-emerald-400/25",
  Popular: "bg-pink-400/10 text-pink-300 border-pink-400/25",
  Insights: "bg-purple-400/10 text-purple-300 border-purple-400/25",
  "Deep Dive": "bg-indigo-400/10 text-indigo-300 border-indigo-400/25",
  Advanced: "bg-orange-400/10 text-orange-300 border-orange-400/25",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function IconEye() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function IconHeart() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
export default function ArticleCard({ article, index, }: {
  article: (typeof articles)[0]; index: number;
}) {
  const catStyle = categoryStyles[article.category] ?? "bg-white/10 border-white/20 text-white/60";
  const tagStyle = tagStyles[article.tag] ?? "bg-white/10 text-white/50 border-white/20";

  return (
    <article
      className="
        group relative flex flex-col
        rounded-2xl overflow-hidden cursor-pointer
        bg-white/[0.04] backdrop-blur-xl
        border border-white/[0.08]
        transition-all duration-300 ease-out
        hover:-translate-y-1.5
        hover:border-white/[0.15]
        hover:shadow-[0_28px_64px_rgba(0,0,0,0.55)]
      "
      style={{
        animation: `fadeSlideUp 0.55s ease both`,
        animationDelay: `${index * 75}ms`,
      }}
    >
      {/* Hover glow radial */}
      <div className="
        pointer-events-none absolute inset-0 rounded-2xl z-0
        bg-[radial-gradient(ellipse_at_50%_0%,rgba(96,165,250,0.09),transparent_65%)]
        opacity-0 group-hover:opacity-100 transition-opacity duration-500
      " />

      {/* ── Cover image ── */}
      <div className="relative h-48 shrink-0 overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        {/* Gradient over image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />

        {/* Tag badge */}
        <span className={`
          absolute top-3 left-3
          px-2.5 py-[3px] rounded-full border
          text-[10px] font-bold tracking-[0.1em] uppercase
          backdrop-blur-sm
          ${tagStyle}
        `}>
          {article.tag}
        </span>

        {/* Read time */}
        <span className="
          absolute bottom-3 right-3
          flex items-center gap-1.5
          px-2.5 py-1 rounded-full
          bg-black/40 backdrop-blur-sm
          border border-white/10
          text-[11px] text-white/65
        ">
          <IconClock />
          {article.readTime}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="relative z-10 flex flex-col gap-3 p-5 flex-1">

        {/* Category pill */}
        <span className={`
          self-start px-3 py-[3px] rounded-full border
          text-[10px] font-bold tracking-[0.1em] uppercase
          ${catStyle}
        `}>
          {article.category}
        </span>

        {/* Title */}
        <h2 className="
          text-[16px] font-bold leading-snug
          text-white/90 group-hover:text-blue-300
          transition-colors duration-300
          [font-family:Georgia,serif]
        ">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="text-[13px] leading-relaxed text-white/38 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Push footer down */}
        <div className="flex-1" />

        {/* Divider */}
        <div className="h-px bg-white/[0.07]" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Author */}
          <div className="flex items-center gap-2.5">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-8 h-8 rounded-full object-cover border border-white/15"
            />
            <div className="flex flex-col">
              <span className="text-[12.5px] font-semibold text-white/75 leading-none">
                {article.author.name}
              </span>
              <span className="text-[11px] text-white/35 mt-[3px] leading-none">
                {formatDate(article.date)}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[11.5px] text-white/35">
              <IconEye />
              {article.views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1.5 text-[11.5px] text-white/35">
              <IconHeart />
              {article.likes}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom accent line (appears on hover) */}
      <div className="
        absolute bottom-0 left-[10%] right-[10%] h-[2px] rounded-full
        bg-gradient-to-r from-transparent via-blue-400 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
      " />
    </article>
  );
}