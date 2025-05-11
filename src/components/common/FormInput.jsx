function FormInput({ label, name, isPending, type, placeholder }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={label} className="w-fit font-medium">
        {label}
      </label>
      <input
        id={label}
        name={name}
        type={type}
        placeholder={placeholder}
        required
        disabled={isPending}
        className="w-full rounded-md border border-gray-300 bg-gray-200 px-4 py-2 ring-blue-600 outline-0 transition duration-300 focus:bg-gray-50 focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-300"
      />
    </div>
  );
}

export default FormInput;
