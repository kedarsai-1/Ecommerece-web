import {useRef,useState} from 'react';
import { Validate } from '../utils/Validate';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import Header from './Header';
import { BASE_URL } from '../utils/constants';

const Login = ()=>{
  const dispatch = useDispatch();
  const [signin,setsignin] = useState (true);
  const userData = useSelector((store)=>store.user)
  const[errorMessage,seterrorMessage]= useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const phonenumber = useRef(null);
  const FirstName = useRef(null);
  const LastName = useRef(null);
  const [isShopOwner,setIsShopOwner]=useState(false)

  const navigate = useNavigate();

  
  
  const togglesignin=()=>{
    setsignin(!signin);
   

    
  }
 
  const handlelogin =async()=>{
    const emailId = email.current.value;
    const Password = password.current.value;
   
    try{
    const res= await axios.post(BASE_URL + "/login",{emailId,Password},{withCredentials:true})
    console.log(res)
    dispatch(addUser(res.data))
   res.data.isShopOwner === true ? navigate("/sellershopview") : navigate("/")
    
    
    
    }
    catch(err){
      seterrorMessage(err?.response?.data||"something went wrong")
    }
   

   
  }
  
  const handlesignup = async () => {
    const emailId = email.current.value;
    const Password = password.current.value;
    const firstNameVal = FirstName.current.value; 
    const lastNameVal = LastName.current.value;   
    const phoneNumberVal = phonenumber.current.value;
  
    try {
      await axios.post(
        BASE_URL + "/signup",
        {
          FirstName: firstNameVal,
          LastName: lastNameVal,
          emailId,
          Password,
          PhoneNumber: phoneNumberVal,
          isShopOwner:isShopOwner,
        },
        { withCredentials: true }
      );
      navigate("/profile");
    } catch (err) {
      seterrorMessage(err?.response?.data || "something went wrong");
    }
  };
  
    return(
      <>
    
  <Header/>


    
        <div className="flex justify-center">
         
          <form className="w-full md:w-3/12 absolute p-12 bg-gray-300 mx-auto right-0 left-0 text-white rounded-lg opacity-80 " onSubmit={(e)=>e.preventDefault()}>

         {!signin ? (
        
            <input ref={phonenumber} type="text"
            placeholder='Mobile'
            className="p-4 m-4 text-black"/> 
            ):
            (<div className='hidden'></div>)
          }
        {!signin ? (
            <input ref={FirstName} type="text"
            placeholder='FirstName'
            className="p-4 m-4 text-black"/>
          ):
          (<div className='hidden'></div>)
        }
        {!signin ? (
            <input ref={LastName} type="text"
            placeholder='LastName'
            className="p-4 m-4 text-black"/>
          ):
          (<div className='hidden'></div>)
        }
        { !signin ?(
          <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
        <label>
        <input
          type="checkbox"
          checked={isShopOwner}   // controlled by state
          onChange={(e) => setIsShopOwner(e.target.checked)} // update state
        />
        Are you a shop owner?
      </label>
        </fieldset>
        

        ):(<div className='hidden'></div>)}
         
           
            < input ref={email} type= "text" 
            placeholder="Email" 
            className="p-4 m-4 text-black"/> 

            <input ref={password}type="password"
            placeholder ="password"
            className="p-4 m-4 text-black"/> 
             <p className="text-red-500 font-bold p-4">{errorMessage}</p>


          <button className ='p-4 m-4 bg-red-600  w-full rounded-lg cursor-pointer'
           onClick={signin?handlelogin:handlesignup} >
              {!signin?"Sign Up":"SIGN IN"}</button>
              <p className="text-red-500 font-bold p-4 cursor-pointer"onClick={togglesignin}>{signin ? "new to this ?":"Already Registered! Sign IN now"}</p>
          </form>
          </div>
          </>
        
    )
}
export default Login;