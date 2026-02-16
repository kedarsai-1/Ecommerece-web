import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import PngUploader from "./PngUploader";

const Items = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(
    "https://img.freepik.com/premium-vector/add-paper-icon-vector-image-can-be-used-ui_120816-168697.jpg"
  );
  const [shopId, setShopId] = useState("");
  const [toast, setToast] = useState(false);

  const AddItems = async () => {
    try {
      await axios.post(
        `${BASE_URL}/shops/${shopId}/items`,
        { name, price, description, image, shopId },
        { withCredentials: true }
      );

      setToast(true);

      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form
        className="bg-white p-6 rounded-2xl shadow-md w-96 flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* NAME */}
        <input
          className="p-3 border rounded-xl"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* PRICE */}
        <input
          className="p-3 border rounded-xl"
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* DESCRIPTION */}
        <input
          className="p-3 border rounded-xl"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* IMAGE URL INPUT */}
        <input
          className="p-3 border rounded-xl"
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        {/* IMAGE PREVIEW */}
        <img
          src={image}
          alt="preview"
          className="w-full h-32 object-cover rounded-lg"
        />

        {/* PNG UPLOADER */}
        <div className="text-xs text-gray-500">Or upload PNG:</div>
        <PngUploader onUploaded={(url) => setImage(url)} />

        {/* SHOP ID */}
        <input
          className="p-3 border rounded-xl"
          type="text"
          placeholder="Shop Id"
          value={shopId}
          onChange={(e) => setShopId(e.target.value)}
        />

        {/* BUTTON */}
        <button
          type="button"
          className="bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition"
          onClick={AddItems}
        >
          Add Item
        </button>
      </form>

      {/* TOAST */}
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Items Added successfully.</span>
          </div>
        </div>
      )}

    </div>
  );
};

export default Items;
