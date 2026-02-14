import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useState,useEffect } from "react"
import Card from "./Card"
import { Link } from "react-router-dom"

const Sellershopview=()=>{
    const [shops,setshops]=useState([])

    const fetchShops = async ()=>{
        const res = await axios.get(BASE_URL+"/sellershops/view",{withCredentials:true})
        console.log(res)
        setshops(res?.data)

    }
    useEffect(()=>{
        fetchShops()
    },[])
    return(

        
<div className="m-4 p-4 flex flex-wrap overflow-x-scroll">{
          shops.map((shop) =>(
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
    )
}
export default Sellershopview