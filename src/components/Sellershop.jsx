import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";

const Sellershop = () => {
  const [name, setname] = useState("");
  const [bannerUrl, setbannerUrl] = useState(
    "https://img.freepik.com/premium-vector/add-paper-icon-vector-image-can-be-used-ui_120816-168697.jpg"
  );
  const [category, setcategory] = useState("");
  const [Address, setAddress] = useState("");

  const AddShops = async () => {
    try {
      await axios.post(
        BASE_URL + "/shops",
        { name, bannerUrl, category, Address },
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

        <fieldset className="fieldset my-3">
          <legend className="fieldset-legend text-sm">Name</legend>
          <input
            type="text"
            value={name}
            className="input input-sm w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter shop name"
            onChange={(e) => setname(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset my-3">
          <legend className="fieldset-legend text-sm">Banner URL</legend>
          <input
            type="text"
            value={bannerUrl}
            className="input input-sm w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter image URL"
            onChange={(e) => setbannerUrl(e.target.value)}
          />
          <img
            src={bannerUrl}
            alt="preview"
            className="mt-2 rounded-md shadow-sm w-full h-28 object-cover"
          />
        </fieldset>

        <fieldset className="fieldset my-3">
          <legend className="fieldset-legend text-sm">Category</legend>
          <input
            type="text"
            value={category}
            className="input input-sm w-full border border-gray-300 rounded-md p-2"
            placeholder="Type category"
            onChange={(e) => setcategory(e.target.value)}
          />
        </fieldset>

        <h6 className="font-bold text-sm mt-3">Address</h6>
        <textarea
          className="textarea textarea-bordered w-full border-gray-300 rounded-md p-2"
          placeholder="Enter shop address"
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
        />

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
