import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";

const Items = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [shopId, setShopId] = useState("");
  const [toast,setToast]= useState(false);

  const AddItems = async () => {
    try{
        const res= await axios.post(
      `${BASE_URL}/shops/${shopId}/items`,
      { name, price, description, image, shopId },
      { withCredentials: true }
    );
    setToast(true)
    setTimeout(()=>{
      setToast(false)
    },3000)
  }
  catch(err){
    console.log(err.message)
  }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-2xl shadow-md w-96 flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <input className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-400" type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-400" type="text" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)} />
        <input className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-400" type="text" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
        <input className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-400" type="text" placeholder="Image" value={image} onChange={(e)=>setImage(e.target.value)} />
        <input className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-400" type="text" placeholder="Shop Id" value={shopId} onChange={(e)=>setShopId(e.target.value)} />
        <button className="bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition cursor-pointer" onClick={AddItems}>Add Item</button>
     
        
      </form>
      {toast && (
        <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Items Added successfully.</span>
        </div>
      </div>
      )}
    </div>
  );
};

export default Items;
