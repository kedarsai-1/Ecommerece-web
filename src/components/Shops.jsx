
import axios from "axios";
import Card from "./card"
import { BASE_URL } from "../utils/constants";
import { useEffect,useState} from "react";
import { useOutletContext} from "react-router-dom";
import { Link } from "react-router-dom";



const Shops= () =>{
  const { searchTerm } = useOutletContext();

    const [shops, setShops] = useState([]);

 
    const fetchShops =async ()=>{
    const res = await axios.get(BASE_URL+"/shops/view",{withCredentials:true})
    console.log(res)
    setShops(res?.data)
    }
    const filteredShops = shops.filter((shop) =>
      shop.name.toLowerCase().includes(searchTerm.toLowerCase())
 
    );
    
 
    useEffect(()=>{
        fetchShops()
    },[])
   
    
    
return(
    <>
   <div className="m-4 font-bold ">{filteredShops[0]?.category}</div>

<div className="m-4 p-4 flex flex-wrap overflow-x-scroll">
  {filteredShops.map((shop) => (
   <Link to={`/itemsview/${shop._id}`} key={shop._id}>
    <Card
      key={shop.name}
      name={shop.name}
      bannerUrl={shop.bannerUrl}
      address={shop.Address[0]}
        />
        </Link>
  
      ))}
</div>
</>
)
}
export default Shops;