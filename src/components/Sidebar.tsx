'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UtensilsCrossed, Menu, Calendar, ShoppingCart, LogIn, LogOut } from "lucide-react"

export default function Sidebar() {
    const { data: session } = useSession()
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    const handleLogout = async () => {
        await signOut({ redirect: false })
        router.push('/signin')
    }

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <h1 className="text-2xl font-bold mb-6">GrocerEase</h1>
            <nav className="space-y-2 flex-grow">
                <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/dishes">
                        <UtensilsCrossed className="mr-2 h-4 w-4" /> My Dishes
                    </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/">
                        <Calendar className="mr-2 h-4 w-4" /> Current Week
                    </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/meal-plans">
                        <Menu className="mr-2 h-4 w-4" /> Meal Plans
                    </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/shopping-list">
                        <ShoppingCart className="mr-2 h-4 w-4" /> Shopping List
                    </Link>
                </Button>
            </nav>
            {session ? (
                <Button variant="ghost" className="w-full justify-start mt-auto" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
            ) : (
                <Button variant="ghost" className="w-full justify-start mt-auto" asChild>
                    <Link href="/signin">
                        <LogIn className="mr-2 h-4 w-4" /> Login
                    </Link>
                </Button>
            )}
        </div>
    )

    return (
        <>
            <aside className="w-64 bg-white p-4 hidden md:block">
                <SidebarContent />
            </aside>
            <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="mb-4">
                            <Menu className="mr-2 h-4 w-4" /> Menu
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}
