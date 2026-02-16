import { BASE_URL } from "../utils/constants";
const Header = ()=>{
const logoUrl = `${BASE_URL}/images/Amazon-Logo.png`;
    return(
        <div className="flex justify-center">
            <img className="px-auto w-[200px]" src ={logoUrl}/>
        </div>
    )
}
export default Header;