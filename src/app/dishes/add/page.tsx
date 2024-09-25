"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Image as ImageIcon, X } from 'lucide-react'

interface Instruction {
    id: number;
    content: string;
    order: number;
}

const MEAL_TAGS = ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Low-Carb', 'High-Protein', 'Paleo', 'Meat', 'Fish', 'Spicy', 'Quick', 'Easy']

export default function AddMeal() {
    const [ingredients, setIngredients] = useState([''])
    const [instructions, setInstructions] = useState<Instruction[]>([
        { id: 1, content: '', order: 1 }
    ])
    const [nextInstructionId, setNextInstructionId] = useState(2)
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const addIngredient = () => {
        setIngredients([...ingredients, ''])
    }

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index))
    }

    const updateIngredient = (index: number, value: string) => {
        const newIngredients = [...ingredients]
        newIngredients[index] = value
        setIngredients(newIngredients)
    }

    const addInstruction = () => {
        setInstructions([...instructions, { id: nextInstructionId, content: '', order: instructions.length + 1 }])
        setNextInstructionId(nextInstructionId + 1)
    }

    const removeInstruction = (id: number) => {
        setInstructions(instructions.filter(instruction => instruction.id !== id))
        // Reorder remaining instructions
        setInstructions(prev => prev.map((instruction, index) => ({
            ...instruction,
            order: index + 1
        })))
    }

    const updateInstruction = (id: number, content: string) => {
        setInstructions(instructions.map(instruction =>
            instruction.id === id ? { ...instruction, content } : instruction
        ))
    }

    const reorderInstruction = (id: number, newOrder: number) => {
        const instructionToMove = instructions.find(instruction => instruction.id === id)
        if (!instructionToMove) return

        const newInstructions = instructions.filter(instruction => instruction.id !== id)
        newInstructions.splice(newOrder - 1, 0, { ...instructionToMove, order: newOrder })

        setInstructions(newInstructions.map((instruction, index) => ({
            ...instruction,
            order: index + 1
        })))
    }

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        )
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Create a New Meal</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="aspect-video bg-muted flex items-center justify-center mb-4 rounded-md">
                            <ImageIcon className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <Button className="w-full">Upload Image</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <div>
                            <Label htmlFor="meal-name">Meal Name</Label>
                            <Input id="meal-name" placeholder="Enter meal name" />
                        </div>
                        <div>
                            <Label>Meal Tags</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {MEAL_TAGS.map(tag => (
                                    <Badge
                                        key={tag}
                                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                                        className="cursor-pointer"
                                        onClick={() => toggleTag(tag)}
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <Label htmlFor="prep-time">Prep Time</Label>
                                <div className="flex">
                                    <Input id="prep-time" type="number" placeholder="30" />
                                    <span className="ml-2 flex items-center text-sm text-muted-foreground">min</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="cook-time">Cook Time</Label>
                                <div className="flex">
                                    <Input id="cook-time" type="number" placeholder="45" />
                                    <span className="ml-2 flex items-center text-sm text-muted-foreground">min</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="md:col-span-2">
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-xl font-semibold">Ingredients</h2>
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Input
                                    value={ingredient}
                                    onChange={(e) => updateIngredient(index, e.target.value)}
                                    placeholder={`Ingredient ${index + 1}`}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeIngredient(index)}
                                    aria-label={`Remove ingredient ${index + 1}`}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={addIngredient}>
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add Ingredient
                        </Button>
                    </CardContent>
                </Card>
                <Card className="md:col-span-2">
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-xl font-semibold">Cooking Instructions</h2>
                        {instructions.map((instruction) => (
                            <div key={instruction.id} className="flex items-center space-x-2">
                                <Select
                                    value={instruction.order.toString()}
                                    onValueChange={(value) => reorderInstruction(instruction.id, parseInt(value))}
                                >
                                    <SelectTrigger className="w-[70px]">
                                        <SelectValue placeholder="Step" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {instructions.map((_, index) => (
                                            <SelectItem key={index + 1} value={(index + 1).toString()}>
                                                {index + 1}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Input
                                    value={instruction.content}
                                    onChange={(e) => updateInstruction(instruction.id, e.target.value)}
                                    placeholder={`Step ${instruction.order}`}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeInstruction(instruction.id)}
                                    aria-label={`Remove step ${instruction.order}`}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={addInstruction}>
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add Instruction
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <div className="flex justify-end mt-6">
                <Button size="lg">Save Meal</Button>
            </div>
        </div>
    )
}
