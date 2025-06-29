"use client";

import { useActionState, useState } from "react";
import FormInputGroup from "../common/FormInputGroup";
import { getGeoLocation } from "@/src/lib/helper";
import { getAddressInformation } from "@/src/lib/geo";
import toast from "react-hot-toast";
import { IoLocationOutline } from "react-icons/io5";
import Button from "../common/Button";
import { updateUser } from "@/src/lib/actions";
import FormStateMessage from "../common/FormStateMessage";

function AccountForm({ session, userData }) {
  const updateUserWithUserId = updateUser.bind(null, session.user.email);
  const [state, action, isPending] = useActionState(updateUserWithUserId, null);
  const [address, setAddress] = useState(userData.address || "");
  const [fullName, setFullName] = useState(userData.fullName);
  const [isLoading, setIsloading] = useState(false);
  const [disableForm, setDisableForm] = useState(false);

  const handleGetAddress = async function (e) {
    if (e) {
      e.preventDefault();
      setAddress("");
    }
    setIsloading(true);
    const toastId = toast.loading("Loading Address");
    try {
      const { latitude, longitude } = await getGeoLocation();
      const {
        features: [{ properties }],
      } = await getAddressInformation({ latitude, longitude });
      setAddress(
        `${properties.country}, ${properties.city}, ${properties.address_line1}`,
      );
    } catch (error) {
      toast.error(error.message || "failed to extract the position");
    } finally {
      setIsloading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <form action={action}>
      <FormInputGroup
        value={fullName}
        onChange={(e) => {
          setFullName(e.target.value);
        }}
        label="Full Name"
        name="fullName"
        inputType="text"
        disabled={isPending || disableForm}
      />
      <FormInputGroup
        value={userData.email}
        label="Email"
        name="email"
        inputType="email"
        disabled={true}
      />
      <div className="relative mb-2">
        <FormInputGroup
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          label="Address"
          name="address"
          inputType="text"
          disabledCursor="disabled:cursor-progress"
          disabled={isLoading || disableForm || isPending}
        />
        <button
          className="absolute top-2 right-0.5 cursor-pointer rounded-md disabled:cursor-progress"
          aria-label="get address button"
          disabled={isLoading || disableForm || isPending}
          onClick={handleGetAddress}
        >
          <IoLocationOutline className="h-6 w-6 text-blue-600" />
        </button>
      </div>
      <p className="mb-12 text-sm font-medium text-gray-400">
        Click the location button to get your address
      </p>
      <div className="mb-2">
        <Button disabled={disableForm || isPending}>Update Setting</Button>
      </div>
      <FormStateMessage state={state} />
    </form>
  );
}

export default AccountForm;
