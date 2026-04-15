import Image from "next/image";
import  ShoppingItems  from '@/components/InventoryItem'

export default function Home() {
  return (
    <div className="text-center" >
      <h1>Shopping List</h1>

      <div>
        <ShoppingItems />
      </div>
    </div>

  
  );
}
