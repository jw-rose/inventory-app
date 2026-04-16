// page.tsx
import ShoppingItems from '@/components/InventoryItem'
import AddItemForm from '@/components/AddItemForm'

export default function Home() {
    return (
        <div className='max-w-2xl mx-auto px-4 py-6'>
            <h1 className='text-3xl font-bold text-center mb-6'>Shopping List</h1>
          
            <div>
                <ShoppingItems />
            </div>

              <div className='mb-4 text-center'>
                <AddItemForm />
            </div>
        </div>
    )
}