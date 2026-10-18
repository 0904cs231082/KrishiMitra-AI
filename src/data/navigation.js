import { LayoutDashboard, Bot, Sprout,
    Wrench, CloudSun, TrendingUp, Bookmark
 } from "lucide-react"

export const mainNavigation =[
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
    },

     {
        name: "AI Assistant",
        path: "/ai-assistant",
        icon: Bot,
    },

     {
        name: "My Crops",
        path: "/my-crops",
        icon: Sprout,
    },

     {
        name: "AI Tools",
        path: "/ai-tools",
        icon: Wrench,
    },

     {
        name: "Weather",
        path: "/weather",
        icon: CloudSun,
    },

     {
        name: "Mandi Rates",
        path: "/mandi-rates",
        icon: TrendingUp,
    },

     {
        name: "Saved",
        path: "/saved",
        icon: Bookmark,
    },

];