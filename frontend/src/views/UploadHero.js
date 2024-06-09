import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const api = process.env.REACT_APP_API;

export default function UploadHero() {
  const initiaData = {
    name: "",
    date_of_dead: "",
    address: "",
    is_featured: 1,
    details: "", // Ensure to add details here
  };
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageData, setImageData] = useState(initiaData); // State for JSON data
  const [uploadMessage, setUploadMessage] = useState("");
  const { token } = useSelector((state) => state.auth.user); // Authorization token

  const handleImageChange = (event) => {
    const newImages = event.target.files;

    if (newImages.length > 10) {
      // Limit to 10 images for demonstration
      setUploadMessage("Please select a maximum of 10 images.");
      return;
    }

    // Validate image types (optional)
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const invalidImages = [];
    for (let i = 0; i < newImages.length; i++) {
      const extension = newImages[i].name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(extension)) {
        invalidImages.push(newImages[i].name);
      }
    }

    if (invalidImages.length > 0) {
      setUploadMessage(
        `Invalid file types detected: ${invalidImages.join(", ")} (Only JPG, JPEG, and PNG allowed).`
      );
      return;
    }

    setSelectedImages(newImages); // Update state with selected images
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setImageData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (selectedImages.length === 0) {
      setUploadMessage("Please select images to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("imageData", JSON.stringify(imageData));

    // Append each selected image to formData
    for (let i = 0; i < selectedImages.length; i++) {
      formData.append("images[]", selectedImages[i]);
    }

    try {
      const response = await axios.post(
        `${api}/hero`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadMessage(response.data.message || "Images uploaded successfully!");
      setSelectedImages([]); // Clear image selection after successful upload
      setImageData(initiaData); // Reset image data after upload
    } catch (error) {
      console.error("Upload error:", error);
      setUploadMessage("Error uploading images. Please try again.");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Upload New Hero
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleUpload}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={imageData.name}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="date_of_dead" className="block text-sm font-medium leading-6 text-gray-900">
                Date of Dead
              </label>
              <div className="mt-2">
                <input
                  id="date_of_dead"
                  name="date_of_dead"
                  type="date"
                  value={imageData.date_of_dead}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={imageData.address}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="details" className="block text-sm font-medium leading-6 text-gray-900">
                Details
              </label>
              <div className="mt-2">
                <textarea
                  id="details"
                  name="details"
                  value={imageData.details}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>

            <div>
              <label htmlFor="images" className="block text-sm font-medium leading-6 text-gray-900">
                Images
              </label>
              <div className="mt-2">
                <input
                  id="images"
                  name="images"
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Upload
              </button>
            </div>

            {uploadMessage && <p className="text-sm text-green-500">{uploadMessage}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
