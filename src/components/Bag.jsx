import { useSelector, useDispatch } from "react-redux";
import { clearBag, additems, removeitems } from "../utils/itemSlice";

const Bag = () => {
  const bagItems = useSelector((store) => store.bag.items); 
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearBag());
  };

  if (bagItems?.length === 0) {
    return (
      <div className="text-center m-10">
        <h1 className="text-3xl font-extrabold text-gray-800">🛍️ Your Bag</h1>
        <p className="text-gray-500 mt-3 text-lg">
          Bag is empty. Add some items to shop!
        </p>
      </div>
    );
  }

  const totalPrice = bagItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto mt-8 px-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
        🛍️ Your Bag
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {bagItems?.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-white shadow-lg rounded-2xl p-5 border hover:shadow-xl transition"
            >
              <div className="flex gap-4 items-center">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover border"
                  />
                )}
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-gray-600">₹ {item.price}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  onClick={() => dispatch(additems(item))}
                >
                  ➕
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  onClick={() => dispatch(removeitems(item))}
                >
                  ➖
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="bg-gray-50 shadow-lg rounded-2xl p-6 sticky top-10 h-fit">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>
          <div className="flex justify-between mb-2 text-lg">
            <span>Total Items</span>
            <span>{bagItems.length}</span>
          </div>
          <div className="flex justify-between mb-4 text-lg font-semibold">
            <span>Total Price</span>
            <span>₹ {totalPrice}</span>
          </div>

          <button
            className="w-full p-3 bg-black text-white rounded-xl shadow-md hover:bg-gray-800 transition mb-3"
          >
            Proceed to Checkout
          </button>
          <button
            className="w-full p-3 bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 transition"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bag;
