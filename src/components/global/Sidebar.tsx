"use client"
import {
    LayoutDashboard,
    MessageSquare,
    BarChart3,
    HelpCircle,
    Settings,
    Sun,
    Moon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const Links = [
    {
        id: 0,
        title: "Overview",
        href: "/overview",
        icon: BarChart3,
    },
    {
        id: 1,
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },
]

const TeamMembers = [
    { name: "Alexandre Parra", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Thanawach Chadee", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Guest User", avatar: "/placeholder.svg?height=32&width=32" },
]

const SupportLinks = [
    { title: "Notifications", icon: MessageSquare },
    { title: "Help Centre", icon: HelpCircle },
    { title: "Settings", icon: Settings },
]

const Sidebar = () => {
    const pathname = usePathname()

    return (
        <nav className="w-[240px] h-full flex flex-col">
            {/* Logo */}
            <div className="flex items-center gap-3 bg-card px-6 py-2 border rounded-xl">
                <Image src={'/Logo.jpg'} alt='Offset Logo' width={35} height={50} className='rounded-xl' />
                <span className="font-semibold text-lg">Offset</span>
            </div>

            {/* Main Navigation */}
            <div className="flex-1 px-4 py-4">
                <div className="space-y-1">
                    {Links.map((link) => (
                        <Link
                            key={link.id}
                            href={link.href}
                            className={cn(
                                "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                pathname === link.href ? "bg-primary font-semibold text-background/75" : "hover:bg-muted text-muted-foreground/50",
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <link.icon className="w-4 h-4" />
                                {link.title}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Support Section */}
                <div className="mt-8">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">SUPPORT</h3>
                    <div className="space-y-1">
                        {SupportLinks.map((link, index) => (
                            <div key={index} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted cursor-pointer">
                                <link.icon className="w-4 h-4 text-muted-foreground/50" />
                                <span className="text-sm text-muted-foreground/50">{link.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* User Profile */}
            <div className="p-4 border rounded-xl bg-card">
                <div className="flex items-center gap-3">
                    <Image
                        src="/Logo.jpg"
                        alt="Charles Morgan"
                        width={32}
                        height={32}
                        className="rounded-full"
                    />
                    <div className="flex-1">
                        <p className="text-sm font-medium">Anas Nadkar</p>
                        <p className="text-xs text-muted-foreground/65">anasnadkar23@gmail.com</p>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Sidebar
