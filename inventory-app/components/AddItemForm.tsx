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
            className='bg-green-600 text-white font-medium px-6 py-3 rounded-full w-full sm:w-auto'
            onClick={() => setIsOpen(true)}
        >
            + Add item
        </button>
    )
}

return (
    <form className='bg-gray-50 border border-gray-200 rounded-xl p-4' onSubmit={handleSubmit}>
        
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4'>

            <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-500'>Item name</label>
                <input
                    className='border border-gray-300 rounded-lg p-2 text-black'
                    type="text"
                    placeholder='e.g. Eggs'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-500'>Quantity</label>
                <input
                    className='border border-gray-300 rounded-lg p-2 text-black'
                    type="number"
                    placeholder='e.g. 6'
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-500'>Unit</label>
                <input
                    className='border border-gray-300 rounded-lg p-2 text-black'
                    type="text"
                    placeholder='e.g. box'
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-500'>Amount to buy</label>
                <input
                    className='border border-gray-300 rounded-lg p-2 text-black disabled:bg-gray-100 disabled:text-gray-400'
                    type="number"
                    placeholder='e.g. 2'
                    value={quantityToBuy}
                    disabled={!toBuy}
                    onChange={(e) => setQuantityToBuy(Number(e.target.value))}
                />
            </div>

            <div className='flex flex-col gap-1 justify-center'>
                <label className='text-sm text-gray-500'>To buy?</label>
                <input
                    className='w-6 h-6'
                    type="checkbox"
                    checked={toBuy}
                    onChange={(e) => {
                        setToBuy(e.target.checked)
                        if (!e.target.checked) setQuantityToBuy(0)
                    }}
                />
            </div>

        </div>

        <div className='flex gap-2'>
            <button
                className='flex-1 bg-green-600 text-white rounded-lg py-2'
                type='submit'
            >
                Add
            </button>
            <button
                className='flex-1 bg-red-500 text-white rounded-lg py-2'
                type='button'
                onClick={() => setIsOpen(false)}
            >
                Cancel
            </button>
        </div>

    </form>
)
    
}