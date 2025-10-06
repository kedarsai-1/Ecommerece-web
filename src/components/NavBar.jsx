import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { removeUser } from "../utils/userSlice"
import { useState } from "react"
const NavBar =({ setSearchTerm,count })=>{
    const dispatch = useDispatch()
    const user = useSelector((store)=>store.user)
    const navigate = useNavigate()
    const photoUrl = user?.photoUrl;
    const FirstName = user?.FirstName;
    const isShopOwner = user?.isShopOwner;
    
    
  
  
    const handlelogout = async()=>{
        try{
            await axios.post("http://localhost:4545/logout",{},{withCredentials:true})
            dispatch(removeUser());
            return navigate("/login")
            
        }
    
    catch(err){
        console.log(err)

    }
}
    return(
        <>
        <div className="navbar bg-base-300 shadow-sm min-h-12 py-0 px-4">
  <div className="flex-1">
    {isShopOwner &&(
    <Link to ="/sellershopview" className="btn btn-ghost text-xl">🛍️Bamazon </Link>
    )
  }
   {!isShopOwner &&(
    <Link to ="/" className="btn btn-ghost text-xl">🛍️Bamazon </Link>
    )
  }

   
  </div>
  {user &&(
  <div className="flex items-center gap-2">
    {!isShopOwner &&(
    <p className="cursor-pointer">
      
      <Link to ="/bag">
      🛒-{count}
      </Link>
      </p>
    )
  }
      
    <input type="text" placeholder="Search"  onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered input-sm w-24 md:w-auto" />
    <p className="font-bold">welcome {FirstName}</p>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm avatar">
        <div className="w-8 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-2 w-48 p-2 shadow">
          
        <li>
          {isShopOwner && (
            <Link to ="/Sellershop" className="justify-between">
              Add Shops
              
            </Link>
          )}
          <Link to ="/profile" className="justify-between">
            Profile
           
          </Link>
          {isShopOwner && (
            <Link to = "/items" >Add Items

            </Link>
          )}
          

        </li>
        <li></li>
        <li onClick={handlelogout}><a>Logout</a></li>
      </ul>
    </div>
  
  </div>
  )}
   
</div>
   
        </>
    )
}

export default NavBar