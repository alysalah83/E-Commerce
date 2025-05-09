import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";

function FormStateMessage({ state }) {
  if (!state) return null;

  return state?.success ? (
    <p className="flex items-center gap-1 text-sm font-medium text-emerald-600 capitalize">
      <IoCheckmarkCircleOutline className="h-4 w-4" />
      <span>{state.message}</span>
    </p>
  ) : (
    <p className="flex items-center gap-1 text-sm font-medium text-red-600 capitalize">
      <MdErrorOutline className="h-4 w-4" />
      <span>{state.message}</span>
    </p>
  );
}

export default FormStateMessage;
