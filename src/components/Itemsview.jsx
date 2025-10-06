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

  if (loading) return <h1 className="text-center text-xl font-semibold mt-10">Loading...</h1>;

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🛍️ Items List
      </h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No items found</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item._id || index}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-transform hover:scale-[1.01]"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center px-6 py-4 bg-gray-50 hover:bg-gray-100 transition"
              >
                <span className="font-semibold text-lg text-gray-800">
                  {item.name}
                </span>
                <span className="text-gray-600 text-sm">
                  {openIndex === index ? "▲" : "▼"}
                </span>
              </button>

              {/* Accordion Body */}
              {openIndex === index && (
                <div className="p-6 border-t border-gray-200 bg-gradient-to-b from-white to-gray-50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-xl font-semibold text-gray-800 mb-1">
                        ₹ {item.price}
                      </p>
                      <p className="text-gray-600 mb-3">{item.description}</p>

                      {/* Add/Remove buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleadd(item)}
                          className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
                        >
                          Add ➕
                        </button>
                        
                      </div>
                    </div>

                    {/* Item Image */}
                    {item.image && (
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-40 h-40 object-cover rounded-xl border border-gray-300 shadow-sm"
                        />
                      </div>
                    )}
                  </div>
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
