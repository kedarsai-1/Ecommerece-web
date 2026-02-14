import { useState } from "react";
import { BASE_URL } from "../utils/constants";

export default function PngUploader({ onUploaded }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const uploadImage = async (file) => {
    setError("");

    // Validate
    if (!file) return;
    if (file.type !== "image/png") {
      setError("Only PNG files are allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Max file size is 5MB");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Get signature
      const sigRes = await fetch(`${BASE_URL}/api/cloudinary/signature?folder=ecommerce`, {
        credentials: "include",
      });
      const { timestamp, signature, cloudName, apiKey, folder } = await sigRes.json();

      // 2️⃣ Build upload payload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", folder);

      // 3️⃣ Upload directly to Cloudinary
      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await uploadRes.json();

      if (!uploadRes.ok || !data.secure_url) {
        throw new Error("Upload failed");
      }

      onUploaded?.(data.secure_url);
    } catch (err) {
      setError("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-2">
      <input
        type="file"
        accept="image/png"
        disabled={loading}
        onChange={(e) => uploadImage(e.target.files?.[0])}
        className="file-input file-input-bordered file-input-sm w-full"
      />

      {loading && <p className="text-sm">Uploading...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}