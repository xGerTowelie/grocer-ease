import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UtensilsCrossed } from "lucide-react"

export default function Home() {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Weekly Meal Plan</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {daysOfWeek.map((day) => (
                    <Card key={day}>
                        <CardHeader>
                            <CardTitle>{day}</CardTitle>
                        </CardHeader>
                        <CardContent className="h-32 flex items-center justify-center">
                            <UtensilsCrossed className="h-8 w-8 text-gray-400" />
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Add Meal</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
