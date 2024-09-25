'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from "lucide-react"

export default function Dishes() {
    const [dishes, setDishes] = useState<string[]>([])
    const [newDish, setNewDish] = useState("")

    const addDish = () => {
        if (newDish.trim() !== "") {
            setDishes([...dishes, newDish.trim()])
            setNewDish("")
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">My Dishes</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Add New Dish</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="dish-name">Dish Name</Label>
                            <Input
                                id="dish-name"
                                placeholder="Enter dish name"
                                value={newDish}
                                onChange={(e) => setNewDish(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addDish()}
                            />
                        </div>
                        <Button className="w-full" onClick={addDish}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Dish
                        </Button>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="w-full space-y-2">
                        <h3 className="font-semibold">Your Dishes:</h3>
                        {dishes.length > 0 ? (
                            <ul className="list-disc list-inside">
                                {dishes.map((dish, index) => (
                                    <li key={index}>{dish}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No dishes added yet.</p>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
