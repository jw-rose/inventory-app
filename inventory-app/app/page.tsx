import Image from "next/image";
import  ShoppingItems  from '@/components/InventoryItem'
import   AddItemForm  from '@/components/AddItemForm'

export default function Home() {
  return (
    <div className="text-center" >
      <h1>Shopping List</h1>
      <div>
        <AddItemForm />
      </div>
      <div>
        <ShoppingItems />
      </div>
    </div>

  
  );
}
