// AddItemForm.tsx
'use client'
import { useState } from 'react'
import { addItem } from '@/lib/actions'

export default function AddItemForm() {
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState<number | ''>('')
    const [unit, setUnit] = useState('')
    const [toBuy, setToBuy] = useState(false)
    const [quantityToBuy, setQuantityToBuy] = useState<number | ''>('')
    const [isOpen, setIsOpen] = useState(false)

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!name.trim()) {
            alert('Please enter your item')
            return
        }
        try {
            await addItem(name, Number(quantity), unit, toBuy, Number(quantityToBuy))
            setName('')
            setQuantity('')
            setUnit('')
            setQuantityToBuy('')
            setToBuy(false)
            setIsOpen(false)
        } catch (error) {
            console.error(error)
            alert('Failed to add item')
        }
    }

    if (!isOpen) {
        return (
            <button
                className='text-2xl mt-3 mb-3 bg-gray-900 text-amber-100 border-2 p-3 rounded-2xl w-full sm:w-auto'
                onClick={() => setIsOpen(true)}
            >
                + Add item
            </button>
        )
    }

    return (
        <form className='p-4 bg-gray-200' onSubmit={handleSubmit}>
            <div className='flex flex-col sm:flex-row flex-wrap gap-2'>
                <input
                    className='p-2 border-2 border-b-cyan-900 text-black rounded w-full sm:w-auto'
                    type="text"
                    placeholder='Item name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className='p-2 border-2 border-b-cyan-900 text-black rounded w-full sm:w-24'
                    type="number"
                    placeholder='Quantity'
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <input
                    className='p-2 border-2 border-b-cyan-900 text-black rounded w-full sm:w-auto'
                    type="text"
                    placeholder='Unit'
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                />
                <input
                    className='p-2 border-2 border-b-cyan-900 text-black rounded w-full sm:w-24'
                    type="number"
                    placeholder='Amount to buy'
                    value={quantityToBuy}
                    onChange={(e) => setQuantityToBuy(Number(e.target.value))}
                />
                <label className='flex items-center gap-2 text-black'>
                    To buy
                    <input
                        className='w-6 h-6'
                        type="checkbox"
                        checked={toBuy}
                        onChange={(e) => setToBuy(e.target.checked)}
                    />
                </label>
                <div className='flex gap-2 w-full sm:w-auto'>
                    <button
                        className='flex-1 sm:flex-none border-2 rounded-2xl p-3 bg-green-600 text-white'
                        type='submit'
                    >
                        Add
                    </button>
                    <button
                        className='flex-1 sm:flex-none p-2 border rounded-2xl bg-red-600 text-white'
                        type='button'
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    )
}