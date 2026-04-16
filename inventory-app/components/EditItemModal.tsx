'use client'

import { useState } from "react"
import { editItem } from "@/lib/actions"
import { Item }  from '@/types/item'

export default function EditItem({item}: {item: Item} ) {
    const [editName, setEditName] = useState(item.name)
    const [editQuantity, setEditQuantity] = useState(item.quantity)
    const [editUnit, setEditUnit] = useState(item.unit)
    const [editToBuy, setEditToBuy] = useState(item.toBuy)
    const [editQuantityToBuy, setEditQuantityToBuy] = useState(item.quantityToBuy)
    const [isOpen, setIsOpen] = useState(false)

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            await editItem(
                item.id, 
                editName, 
                editQuantity, 
                editUnit,
                editToBuy, 
                editQuantityToBuy
            )
            setIsOpen(false)
        } catch (error) {
            console.error(error)
            alert('Failed to edit item')
        }
    }

    if(!isOpen) {
        return (
            <button className="text-3xl" onClick={() => setIsOpen(true)}>
                ✏️
            </button>
        )
    }

return (
    <form className="bg-gray-50 border border-gray-200 rounded-xl p-4" onSubmit={handleSubmit}>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            
            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">Item</label>
                <input 
                    className="border border-gray-300 rounded-lg p-2 text-black"
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">Amount</label>
                <input 
                    className="border border-gray-300 rounded-lg p-2 text-black"
                    type="number"
                    value={editQuantity}
                    onChange={(e) => setEditQuantity(Number(e.target.value))}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">Unit</label>
                <input 
                    className="border border-gray-300 rounded-lg p-2 text-black"
                    type="text"
                    value={editUnit}
                    onChange={(e) => setEditUnit(e.target.value)}
                />
            </div>

                <div className="flex flex-col gap-1 justify-center">
                <label className="text-sm text-gray-500">To buy?</label>
                <input
                    type="checkbox"
                    className='w-6 h-6'
                    checked={editToBuy}
                    onChange={(e) => setEditToBuy(e.target.checked)}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-500">Amount to buy</label>
                <input 
                    className="border border-gray-300 rounded-lg p-2 text-black disabled:bg-gray-100 disabled:text-gray-400"
                    type="number"
                    value={editQuantityToBuy}
                    disabled={!editToBuy}
                    onChange={(e) => setEditQuantityToBuy(Number(e.target.value))}
                />
            </div>

        

        </div>

        <div className="flex gap-2">
            <button 
                className="flex-1 bg-green-600 text-white rounded-lg py-2"
                type="submit"
            >
                Update
            </button>
            <button 
                className="flex-1 bg-red-500 text-white rounded-lg py-2"
                type='button'
                onClick={() => setIsOpen(false)}
            >
                Cancel
            </button>
        </div>

    </form>
)
}
