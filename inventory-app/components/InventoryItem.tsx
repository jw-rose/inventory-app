// InventoryItem.tsx
import { db } from '@/db/index'
import { items } from '@/db/schema'
import  DeleteItem  from '@/components/ConfirmDelete'
import EditItem from './EditItemModal'

export default async function ShoppingItems() {
    const allItems = await db.select().from(items)

    if (allItems.length === 0) {
        return <p className='text-center mt-4'>No items yet</p>
    }

    return (
        <ul className='flex flex-col gap-4 p-4'>
            {allItems.map((item) => (
                <div key={item.id} className='bg-teal-50 border-b-2 border-black flex justify-between rounded-xl items-center gap-5 py-5 px-5'>
               
                        
                        <div 
                        className='flex flex-col'>
                            <span className='font-semibold text-lg'>
                                {item.name}

                            </span>
                             <span className='text-gray-600 w-20'>{item.quantity} {item.unit}</span>
                       
                        </div>

                       <div className='flex flex-col items-center'>
                        {item.toBuy && (<span className='text-green-700'>Need To buy {item.quantityToBuy}</span>)}
                        <span className='text-gray-600'></span>
                        </div>
                        
                   
                     <div className='flex flex-col gap-3'>
                         <EditItem item={item} />
                     <DeleteItem id={item.id} />
                    
                     </div>
                   
                </div>
                
            ))}
        </ul>

        
    )
}