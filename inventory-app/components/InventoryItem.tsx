import { db } from '@/db/index'
import { items } from '@/db/schema' 

export default async function ShoppingItems () {
    const  allItems = await db.select().from(items)
    return (
        <ul className='flex flex-col flex-wrap gap-4 justify-center'>
            {allItems.map((items) => (
                <div className='items-center bg-fuchsia-100'>
                <li className='list-none p-4 text-2xl items-center' key={items.id}>
                 <span className='mr-2'>{items.name}</span>
                <span className='mr-2'>{items.quantity}</span>
                 <span className='mr-2'>{items.unit}</span>
                 </li> 
                 </div>
            )
            
        )}
        </ul>
    )
    
}
