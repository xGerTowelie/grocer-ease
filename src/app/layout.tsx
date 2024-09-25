import './globals.css'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import { SessionProvider } from "next-auth/react"
import { Card } from "@/components/ui/card"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'GrocerEase',
    description: 'Plan your meals and manage your grocery list with ease',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider>
                    <div className="flex h-screen bg-gray-100">
                        <Sidebar />
                        <main className="flex-1 p-4">
                            <Card className="h-full overflow-auto">
                                <div className="p-6">
                                    {children}
                                </div>
                            </Card>
                        </main>
                    </div>
                </SessionProvider>
            </body>
        </html>
    )
}
