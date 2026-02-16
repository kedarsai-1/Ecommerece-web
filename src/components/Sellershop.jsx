import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";
import PngUploader from "./PngUploader";

const Sellershop = () => {

  const [name, setName] = useState("");
  const [bannerUrl, setBannerUrl] = useState(
    "https://img.freepik.com/premium-vector/add-paper-icon-vector-image-can-be-used-ui_120816-168697.jpg"
  );
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");

  const AddShops = async () => {
    try {
      await axios.post(
        BASE_URL + "/shops",
        {
          name,
          bannerUrl,
          category,
          Address: address,
        },
        { withCredentials: true }
      );

      alert("Shop added successfully ✅");
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

        {/* NAME */}
        <fieldset className="fieldset my-3">
          <legend className="fieldset-legend text-sm">Name</legend>
          <input
            type="text"
            value={name}
            placeholder="Enter shop name"
            className="input input-sm w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>

        {/* BANNER URL */}
        <fieldset className="fieldset my-3">
          <legend className="fieldset-legend text-sm">Banner URL</legend>
          <input
            type="text"
            value={bannerUrl}
            placeholder="Enter image URL"
            className="input input-sm w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => setBannerUrl(e.target.value)}
          />

          <img
            src={bannerUrl}
            alt="preview"
            className="mt-2 rounded-md shadow-sm w-full h-28 object-cover"
          />
        </fieldset>

        <div className="text-xs text-base-content/70 mt-1">
          Or upload a PNG:
        </div>

        <PngUploader onUploaded={(url) => setBannerUrl(url)} />

        {/* CATEGORY */}
        <fieldset className="fieldset my-3">
          <legend className="fieldset-legend text-sm">Category</legend>
          <input
            type="text"
            value={category}
            placeholder="Type category"
            className="input input-sm w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => setCategory(e.target.value)}
          />
        </fieldset>

        {/* ADDRESS */}
        <h6 className="font-bold text-sm mt-3">Address</h6>
        <textarea
          value={address}
          placeholder="Enter shop address"
          className="textarea textarea-bordered w-full border-gray-300 rounded-md p-2"
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* SUBMIT BUTTON */}
        <div className="flex justify-center mt-6">
          <button
            className="btn btn-primary w-full"
            onClick={AddShops}
          >
            Submit
          </button>
        </div>
      </form>

    </div>
  );
};

export default Sellershop;
