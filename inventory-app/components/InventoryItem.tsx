import { db } from '@/db/index'
import { items } from '@/db/schema' 

export default async function ShoppingItems () {
    const  allItems = await db.select().from(items)
    if (allItems.length === 0) {
        return <p>No items yet</p>
    }
    return (
        <ul className='flex flex-col flex-wrap gap-4 justify-center'>
            {allItems.map((items) => (
                <div key={items.id} className='items-center bg-fuchsia-100'>
                <li className='list-none p-4 text-2xl items-center'>
                 <span className='mr-2'>Item: {items.name} |</span>
                <span className='mr-2'>Amount: {items.quantity} |</span>
                 <span className='mr-2'>Unit: {items.unit} |</span>
                 <span className='mr-2 text-green-600'>Need to buy:{items.toBuy}</span>
                 <span className='mr-2'>{items.quantityToBuy}</span>


                 </li> 
                 </div>
            )
            
        )}
        </ul>
    )
    
}
