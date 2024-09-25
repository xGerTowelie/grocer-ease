"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus } from 'lucide-react'
import Image from 'next/image'

// Mock data for dishes
const dishes = [
    { id: 1, name: "Spaghetti Carbonara", tags: ["Italian", "Pasta"], prepTime: 15, cookTime: 20 },
    { id: 2, name: "Chicken Stir Fry", tags: ["Asian", "Quick"], prepTime: 10, cookTime: 15 },
    { id: 3, name: "Vegetable Curry", tags: ["Indian", "Vegan"], prepTime: 20, cookTime: 30 },
    { id: 4, name: "Beef Tacos", tags: ["Mexican", "Meat"], prepTime: 15, cookTime: 25 },
    { id: 5, name: "Greek Salad", tags: ["Mediterranean", "Vegetarian"], prepTime: 10, cookTime: 0 },
    { id: 6, name: "Mushroom Risotto", tags: ["Italian", "Vegetarian"], prepTime: 10, cookTime: 25 },
]

export default function ViewDishes() {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredDishes = dishes.filter(dish =>
        dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    return (
        <div className="container p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">My Dishes</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add New Dish
                </Button>
            </div>
            <div className="relative mb-6">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Search dishes..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDishes.map(dish => (
                    <Card key={dish.id} className="overflow-hidden group">
                        <div className="relative h-48 w-full">
                            <Image
                                src={`/placeholder.svg?height=192&width=384`}
                                alt={dish.name}
                                layout="fill"
                                objectFit="cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h2 className="text-xl font-semibold text-white">{dish.name}</h2>
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <div className="flex flex-wrap gap-2 mb-2">
                                {dish.tags.map(tag => (
                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Prep: {dish.prepTime} min | Cook: {dish.cookTime} min
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
