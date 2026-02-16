import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import { additems, removeitems } from "../utils/itemSlice";

const Itemsview = () => {
  const { shopId } = useParams();
  const dispatch = useDispatch();

  const { searchTerm = "" } = useOutletContext(); // ✅ safe fallback

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  const handleadd = (item) => dispatch(additems(item));
  const handleremove = (item) => dispatch(removeitems(item));

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/shops/${shopId}/items`, {
        withCredentials: true,
      });

      setItems(res.data.data || []);
    } catch (err) {
      console.error("Error fetching items:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ reload when shop changes
  useEffect(() => {
    if (shopId) fetchItems();
  }, [shopId]);

  // ✅ Search filter added
  const filteredItems = items.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading)
    return (
      <h1 className="text-center text-xl font-semibold mt-10">
        Loading...
      </h1>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🛍️ Items List
      </h1>

      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No items found</p>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item, index) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-transform hover:scale-[1.01]"
            >
              {/* Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center px-6 py-4 bg-gray-50 hover:bg-gray-100"
              >
                <span className="font-semibold text-lg text-gray-800">
                  {item.name}
                </span>
                <span>{openIndex === index ? "▲" : "▼"}</span>
              </button>

              {/* Body */}
              {openIndex === index && (
                <div className="p-6 border-t bg-gradient-to-b from-white to-gray-50">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-xl font-semibold mb-1">
                        ₹ {item.price}
                      </p>
                      <p className="text-gray-600 mb-3">
                        {item.description}
                      </p>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleadd(item)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                          Add ➕
                        </button>

                        <button
                          onClick={() => handleremove(item)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Remove ➖
                        </button>
                      </div>
                    </div>

                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-40 h-40 object-cover rounded-xl border shadow-sm"
                      />
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
