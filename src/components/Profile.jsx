import { useSelector } from "react-redux"
import Editprofile from "./Editprofile"
const Profile =()=>{
  const user = useSelector((store)=>store.user);
   

    if (!user) {
        return (
            <div className="flex justify-center my-10">
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-4">Loading Profile...</h2>
                    <p>Please wait while we load your profile data.</p>
                </div>
            </div>
        );
    }

    return(
        <div>
            <Editprofile user={user}/>
        </div>
    )
}
export default Profile