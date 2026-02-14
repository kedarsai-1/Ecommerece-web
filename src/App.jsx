
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import appStore from "./utils/appStore";
import Login from "./components/Login";
import Body from "./components/Body";
import Shops from "./components/Shops";
import Editprofile from "./components/Editprofile";
import Profile from "./components/Profile";
import Items from "./components/Items";
import Sellershop from "./components/Sellershop";
import Itemsview from "./components/Itemsview";
import Bag from  "./components/Bag";
import Sellershopview from "./components/Sellershopsview";
import Success from "./components/Success";
import Failure from "./components/Failure";

function AppWrapper() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    //  only apply daisy theme when NOT login
    <div data-theme={isLogin ? "" : "light"} className="min-h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Body />}>
          <Route index element={<Shops />} />
          <Route path ="/profile" element={<Profile/>}/>
         <Route path ="/items" element={<Items/>}/>
          <Route path ="/sellershop" element={<Sellershop/>}/>
          <Route path = '/itemsview/:shopId' element ={<Itemsview/>}/>
          <Route path ='/bag' element={<Bag/>}/>
          <Route path ='/sellershopview' element={<Sellershopview/>}/>
          <Route path ="/success" element={<Success/>}/>
          <Route path ="/failure" element={<Failure/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </Provider>
  );
}
