"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, ImagePlus, Music, VideoIcon, Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Branding",
    icon: Wand2,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/branding"
  },
  {
    label: "Logo Generation",
    icon: ImagePlus,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    href: "/logo",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music"
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: "/video",
  }
]

export default function DashboardPage () {
  const router = useRouter();

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Brandgenie - Your AI Branding Assistant
        </h2>
        <p className="text-muted-foreground font-medium font-sm md:text-lg text-center">
          Unleash the potential of your brand with AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card onClick={() => router.push(tool.href)} key={tool.href} className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5"/>
          </Card>
        ))}
      </div>
    </div>
  )
}
