// InventoryItem.tsx
import { db } from '@/db/index'
import { items } from '@/db/schema'

export default async function ShoppingItems() {
    const allItems = await db.select().from(items)

    if (allItems.length === 0) {
        return <p className='text-center mt-4'>No items yet</p>
    }

    return (
        <ul className='flex flex-col gap-4 p-4'>
            {allItems.map((item) => (
                <div key={item.id} className='bg-fuchsia-100 rounded-2xl p-4'>
                    <li className='list-none text-lg sm:text-2xl flex flex-wrap gap-2 items-center'>
                        <span className=' text-gray-600 font-semibold'>{item.name}</span>
                        <span className='text-gray-600'>Qty: {item.quantity}</span>
                        <span className='text-gray-600'>Unit: {item.unit}</span>
                        <span className='text-green-600'>To buy: {item.toBuy ? 'Yes' : 'No'}</span>
                        <span className='text-gray-600'>Need: {item.quantityToBuy}</span>
                    </li>
                </div>
            ))}
        </ul>
    )
}