import { useRef,useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';

const Body = ()=>{
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUser  = async()=>{
    if(userData){
      setLoading(false);
      return;
    }
    try{
      const res = await axios.get("http://localhost:4545/profile/view",{withCredentials:true});
      dispatch(addUser(res.data));
    }
    catch(err){
      const status = err?.response?.status;
      if (status === 401) {
        navigate('/login', { replace: true });
        return;
      }
    }
    setLoading(false);
  };

  useEffect(()=>{
    fetchUser();
  },[]);

  if (loading) {
   
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!userData) {
 
    return null;
  }

  return(
    <>
      <NavBar setSearchTerm={setSearchTerm}/>
      <Outlet context={{ searchTerm }}/>
    </>
  )
}

export default Body;
