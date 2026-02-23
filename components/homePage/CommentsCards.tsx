"use client";

import DisplayCards from "@/components/ui/display-cards";
import { CircleUserRound, Sparkles } from "lucide-react";

const defaultCards = [

  {
    icon: <CircleUserRound className="size-4 text-blue-400" />,
    title: "Alex",
    description: "Super fast messaging and no annoying delays at all.",
    date: "Just now",
    iconClassName: "text-blue-400",
    titleClassName: "text-blue-400",
    className:
      "[grid-area:stack] hover:-translate-y-15 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <CircleUserRound className="size-4 text-blue-400" />,
    title: "Sophia",
    description: "Clean UI and very easy to start chatting right away.",
    date: "5 minutes ago",
    iconClassName: "text-blue-400",
    titleClassName: "text-blue-400",
    className:
      "[grid-area:stack] translate-x-10 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <CircleUserRound className="size-4 text-blue-400" />,
    title: "Daniel",
    description: "Messages feel instant, even on a slower connection.",
    date: "10 minutes ago",
    iconClassName: "text-blue-400",
    titleClassName: "text-blue-400",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-3 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <CircleUserRound className="size-4 text-blue-400" />,
    title: "Emily",
    description: "Support team responds quickly and actually helps.",
    date: "30 minutes ago",
    iconClassName: "text-blue-400",
    titleClassName: "text-blue-400",
    className:
      "[grid-area:stack] translate-x-36 translate-y-28 hover:translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <CircleUserRound className="size-4 text-blue-400" />,
    title: "Michael",
    description: "Feels secure and private, which really matters to me.",
    date: "1 hour ago",
    iconClassName: "text-blue-400",
    titleClassName: "text-blue-400",
    className:
      "[grid-area:stack] translate-x-48 translate-y-36 hover:translate-y-20 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <CircleUserRound className="size-4 text-blue-400" />,
    title: "Chris",
    description: "No clutter, no distractions — just smooth chatting.",
    date: "2 hours ago",
    iconClassName: "text-blue-400",
    titleClassName: "text-blue-400",
    className:
      "[grid-area:stack] translate-x-60 translate-y-44 hover:translate-y-25 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <CircleUserRound className="size-4 text-blue-400" />,
    title: "Olivia",
    description: "Modern design and a really smooth user experience.",
    date: "3 hours ago",
    iconClassName: "text-blue-400",
    titleClassName: "text-blue-400",
    className:
      "[grid-area:stack] translate-x-72 translate-y-52 hover:translate-y-35 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <CircleUserRound className="size-4 text-blue-400" />,
    title: "James",
    description: "Great place to meet new people without feeling overwhelmed.",
    date: "5 hours ago",
    iconClassName: "text-blue-400",
    titleClassName: "text-blue-400",
    className:
      "[grid-area:stack] translate-x-84 translate-y-60 hover:translate-y-40 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <CircleUserRound className="size-4 text-blue-400" />,
    title: "Liam",
    description: "Works perfectly even when my internet isn’t great.",
    date: "Yesterday",
    iconClassName: "text-blue-400",
    titleClassName: "text-blue-400",
    className:
      "[grid-area:stack] translate-x-96 translate-y-68 hover:translate-y-50 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <CircleUserRound className="size-4 text-blue-400" />,
    title: "Isabella",
    description: "Nice balance between speed, privacy, and usability.",
    date: "2 days ago",
    iconClassName: "text-blue-400",
    titleClassName: "text-blue-400",
    className:
      "[grid-area:stack] translate-x-108 translate-y-76 hover:translate-y-60 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },

];

export default function CommentsCards() {
  return (
    <div className="min-h-[400px] w-full py-20 z-100">
      <div className="w-full max-w-3xl max-lg:flex max-lg:justify-center items-center">
        <DisplayCards cards={defaultCards} />
      </div>
    </div>
  );
}
