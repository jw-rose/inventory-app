'use client'

import { useState } from "react"
import { deleteItem } from "@/lib/actions"

export default function DeleteItem ({ id }: {id: number}) {
    const [isConfirming, setIsConfirming] = useState(false)

    async function handleDelete() {
        try {

            await deleteItem(id)
        } catch (error) {
            console.error(error) 
                alert('Failed to delete item')
            }
        }

        if(!isConfirming) {
            return (
                <button className="text-3xl" onClick={() => setIsConfirming(true)}>
                    ❌
                </button>
            )
        }

       return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
        <p className="text-sm text-gray-600 font-medium">Are you sure you want to delete this item?</p>
        <div className="flex gap-2">
            <button 
                className="flex-1 bg-red-500 text-white rounded-lg py-2 text-sm"
                onClick={handleDelete}
            >
                Delete
            </button>
            <button 
                className="flex-1 bg-gray-200 text-gray-700 rounded-lg py-2 text-sm"
                onClick={() => setIsConfirming(false)}
            >
                Cancel
            </button>
        </div>
    </div>
)
    }
