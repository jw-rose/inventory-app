'use client'
import { useState } from 'react'
import { addItem } from '@/lib/actions'


export default function AddItemForm() {
    // 1. state for each field
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState<number | ''>('')
    const [unit, setUnit] = useState('')
    const [toBuy, setToBuy] = useState(false)
    const [quantityToBuy, setQuantityToBuy] = useState<number | ''>('')

    
    // 2. state to show/hide the form (for cancel button)
    const [isOpen, setIsOpen] = useState(false)

    // 3. handleSubmit
    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()

        // 4. validation — check name is not empty
        if (!name.trim()) {
            alert  ('Please enter your item');
            return
        }
                
        // 5. call addItem with your state values
        // toBuy and quantityToBuy are derived from quantity
              try {
                 await addItem(
                 name,
                 Number(quantity),
                 unit,
                 toBuy,
                 Number(quantityToBuy)
           )
               // 6. reset the form fields after submit
           setName('')
           setQuantity('')
           setUnit('')
           setQuantityToBuy('')
            // 7. close the form after submit

           setIsOpen(false)
        } catch (error) {
            console.error(error)
            alert('Failed to add item')
        }
    }

    // 8. if form is not open, show just the add button
    if (!isOpen) {
        return <button className='text-2xl mt-3 mb-3 bg-gray-900 text-amber-100 border-2 p-3 rounded-2xl ' onClick={() => setIsOpen(true)}>+ Add item</button>
    }

    // 9. return the form
return (
    <form className='p-4 bg-gray-200' onSubmit={handleSubmit}>
        <div className='flex gap-2 items-center'>
            <input className='p-2 border-2 border-b-cyan-900'
                type="text"
                placeholder='Item name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input className='p-2 w-24 border-2 border-b-cyan-900'
                type="number"
                placeholder='Quantity'
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <input className='p-2 border-2 border-b-cyan-900'
                type="text"
                placeholder='Unit'
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
            />
              <label className='flex items-center gap-1 '>
                To buy
                <input className='w-6 h-6 '
                    type="checkbox"
                    checked={toBuy}
                    onChange={(e) => setToBuy(e.target.checked)}
                />
            <input className='p-2 w-24 border-2 border-b-cyan-900'
                type="number"
                placeholder='Amount'
                value={quantityToBuy}
                onChange={(e) => setQuantityToBuy(Number(e.target.value))}
            />
          
            </label>
            <button className='border-2 rounded-2xl p-3 bg-green-600' type='submit'>Add</button>
            <button className='p-2 border rounded-2xl bg-red-600'
                type='button'
                onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
    </form>
)
}