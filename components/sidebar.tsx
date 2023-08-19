"use client";

import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LayoutDashboard, ImagePlus, Wand2, VideoIcon, Music, Settings } from "lucide-react";
import { getApiLimitCount } from './../lib/api-limit';

import { FreeCounter } from "./free-counter";
import { checkSubscription } from "@/lib/subscription";

const montserrat = Montserrat({weight: "600", subsets: ["latin"]})

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500"
    },
    {
        label: "Branding",
        icon: Wand2,
        href: "/branding",
        color: "text-violet-500"
    },
    {
        label: "Logo Generation",
        icon: ImagePlus,
        href: "/logo",
        color: "text-pink-500"
    },
    {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-emerald-500"
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-500"
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    }
];

interface SidebarProps {
    apiLimitCount: number;
    isPro: boolean;
}

const Sidebar = ({apiLimitCount = 0, isPro = false}: SidebarProps) => {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-6 h-12 mr-4">
                        <Image fill alt="Logo" src="/brandgenie_logo.png"/>
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrat.className)}>Brandgenie</h1>
                </Link>

                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link href={route.href} key={route.href} className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")}>
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)}/>
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />
        </div>
    )
}

export default Sidebar;