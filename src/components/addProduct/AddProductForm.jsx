"use client";

import { use, useActionState, useState } from "react";
import FormInputGroup from "../common/FormInputGroup";
import { IoIosAdd } from "react-icons/io";
import toast from "react-hot-toast";
import Image from "next/image";
import Button from "../common/Button";
import FormStateMessage from "../common/FormStateMessage";
import { addProduct } from "@/src/lib/actions";

function AddProductForm({ categoriesPromise }) {
  const [state, action, isPending] = useActionState(addProduct, null);
  const categories = use(categoriesPromise);
  return (
    <main className="mx-auto my-24 max-w-xl rounded-xl bg-white">
      <h2 className="border-b border-gray-100 p-6 text-xl font-semibold tracking-wide text-gray-600 sm:px-8 sm:text-2xl sm:font-bold">
        Enter product information
      </h2>

      <form action={action} className="flex flex-col gap-2 px-8 py-6">
        <FormInputGroup
          name="title"
          label="Title"
          inputType="text"
          disabled={isPending}
        />
        <FormInputGroup
          name="price"
          label="Price"
          inputType="number"
          disabled={isPending}
        />
        <FormInputGroup
          name="brand"
          label="Brand"
          inputType="text"
          disabled={isPending}
        />
        <SelectCategory categories={categories} disabled={isPending} />
        <FormInputGroup
          name="stock"
          label="Stock"
          inputType="number"
          disabled={isPending}
        />
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          required
          disabled={isPending}
          className="mt-6 h-36 w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 ring-blue-600 outline-0 transition duration-300 focus:bg-gray-50 focus:ring-1 disabled:cursor-not-allowed disabled:bg-gray-300"
        />
        <ImageUploader disabled={isPending} />
        <div className="mt-8 text-end">
          <FormStateMessage state={state} />
          <Button disabled={isPending}>add product</Button>
        </div>
      </form>
    </main>
  );
}

function SelectCategory({ categories }) {
  return (
    <select
      name="category"
      className="p mt-6 rounded-lg border border-gray-300 px-5 py-2 text-gray-600 capitalize outline-0 transition duration-300 focus:border-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200"
    >
      <option value="">Select Category</option>
      {categories.map((obj) => (
        <option value={obj.category} className="capitalize" key={obj.id}>
          {obj.category}
        </option>
      ))}
    </select>
  );
}

function ImageUploader({ disabled }) {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return toast.error("no image are selected");

    if (file.size > 5 * 1024 * 1024)
      return toast.error("image size must be less than 5 MB");

    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
    setImage(file);
  };
  return (
    <div className="mt-6 flex flex-wrap items-center gap-4">
      <label
        className={`flex w-fit cursor-pointer items-center gap-1 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-5 py-2 font-semibold text-gray-600 transition duration-300 disabled:cursor-not-allowed disabled:bg-gray-200`}
      >
        <IoIosAdd className="h-5 w-5" />
        <span className="text-nowrap">Upload Image</span>
        <input
          type="file"
          name="imageFile"
          onChange={handleFileChange}
          accept="image/*"
          required
          disabled={disabled}
          className="hidden"
        />
      </label>
      {image && (
        <div className="flex items-center gap-2 lg:gap-3">
          <span className="text-sm font-medium tracking-wide text-gray-400">
            Uploaded: {image.name}
          </span>
          <Image
            width={45}
            height={45}
            src={imagePreview}
            alt={image.name}
            className="object-contain"
          />
        </div>
      )}
    </div>
  );
}

export default AddProductForm;
