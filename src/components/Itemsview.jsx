import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import { additems, removeitems } from "../utils/itemSlice";

const Itemsview = () => {
  const { shopId } = useParams(); 
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);
  const dispatch = useDispatch();
  const { setcount, count } = useOutletContext();

  const handleadd = (item) => {
    setcount(count + 1);
    dispatch(additems(item)); 
  };

  const handleremove = (item) => {
    if (count > 0) {
      setcount(count - 1);
    }
    dispatch(removeitems(item));
  };

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/shops/${shopId}/items`, {
        withCredentials: true,
      });
      setItems(res.data.data); 
    } catch (err) {
      console.error("Error fetching items:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) return <h1 className="text-center">Loading...</h1>;

  return (
   
    <div className="max-w-2xl mx-auto mt-6">
    
      <h1 className="text-2xl font-bold mb-4 text-center">Items View</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">No items found</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={item._id || index}
              className="border rounded-2xl shadow-md overflow-hidden"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200"
              >
                <span className="font-semibold">{item.name}</span>
                <span>{openIndex === index ? "▲" : "▼"}</span>
              </button>

              {/* Add/Remove buttons */}
              <div className="flex gap-4 px-4 py-2">
                <span 
                  className="cursor-pointer text-green-600 font-bold"
                  onClick={() => handleadd(item)}
                >
                  Add ➕
                </span>
                <span 
                  className="cursor-pointer text-red-600 font-bold"
                  onClick={() => handleremove(item)}
                >
                  Del ➖
                </span>
              </div>

              {/* Accordion Body */}
              {openIndex === index && (
                <div className="p-4 bg-white">
                  <p className="text-lg font-medium">₹ {item.price}</p>
                  <p className="text-gray-600 my-2">{item.description}</p>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "200px", height: "200px", border: "1px solid red" }}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Itemsview;
