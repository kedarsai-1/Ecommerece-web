import axios from "axios";
import Card from "./card"
import { BASE_URL } from "../utils/constants";
import { useEffect,useState} from "react";
import { useOutletContext} from "react-router-dom";
import { Link } from "react-router-dom";

const Shops = () => {
  const { searchTerm } = useOutletContext();
  const [shops, setShops] = useState([]);

  const fetchShops = async () => {
    const res = await axios.get(BASE_URL + "/shops/view", { withCredentials: true });
    setShops(res?.data);
  };

  const filteredShops = shops.filter((shop) =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const categories = [...new Set(filteredShops.map((shop) => shop.category))];

  useEffect(() => {
    fetchShops();
  }, []);

  return (
    <>
      {categories.map((category) => (
        <div key={category} className="m-4">
         
          <div className="font-bold text-xl mb-2">{category}</div>

         
          <div className="m-4 p-4 flex flex-wrap overflow-x-scroll">
            {filteredShops
              .filter((shop) => shop.category === category)
              .map((shop) => (
                <Link to={`/itemsview/${shop._id}`} key={shop._id}>
                  <Card
                    name={shop.name}
                    bannerUrl={shop.bannerUrl}
                    address={shop.Address[0]}
                  />
                </Link>
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Shops;
