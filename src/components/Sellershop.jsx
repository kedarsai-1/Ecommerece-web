import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PngUploader from "./PngUploader";

const Sellershop = () => {
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [bannerUrl, setbannerUrl] = useState(
    "https://img.freepik.com/premium-vector/add-paper-icon-vector-image-can-be-used-ui_120816-168697.jpg"
  );
  const [category, setcategory] = useState("");
  const [Address, setAddress] = useState("");

  const AddShops = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/shops",
        { name, bannerUrl, category, Address },
        { withCredentials: true }
      );

      const createdShopId = res.data._id; // 👈 important
      alert("Shop added successfully ✅");

      // 🚀 redirect to items page with shopId
      navigate("/items", { state: { shopId: createdShopId } });

    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
          Add New Shop
        </h2>

        <input
          type="text"
          value={name}
          className="input input-sm w-full border p-2 my-2"
          placeholder="Enter shop name"
          onChange={(e) => setname(e.target.value)}
        />

        <input
          type="text"
          value={bannerUrl}
          className="input input-sm w-full border p-2 my-2"
          placeholder="Enter image URL"
          onChange={(e) => setbannerUrl(e.target.value)}
        />

        <img src={bannerUrl} className="mt-2 w-full h-28 object-cover rounded" />

        <div className="text-xs mt-1">Or upload PNG:</div>
        <PngUploader onUploaded={(url) => setbannerUrl(url)} />

        <input
          type="text"
          value={category}
          className="input input-sm w-full border p-2 my-2"
          placeholder="Category"
          onChange={(e) => setcategory(e.target.value)}
        />

        <textarea
          className="textarea w-full border p-2 my-2"
          placeholder="Enter shop address"
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          type="button"
          className="btn btn-primary w-full mt-4"
          onClick={AddShops}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Sellershop;
