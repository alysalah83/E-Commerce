"use server";

import { revalidatePath } from "next/cache";
import { addReview as addReviewApi } from "./data-service";
import { auth, signIn, signOut } from "../auth";
import { updateUser as updateUserApi } from "./data-service";
import { update } from "../auth";

export async function addReview(productId, rating, prevState, formData) {
  const comment = formData.get("comment");
  const reviewerName = formData.get("reviewerName");
  const reviewerEmail = formData.get("reviewerEmail");

  console.log(comment, reviewerName, reviewerEmail);

  if (!rating)
    return {
      success: false,
      message: "You must add a rating",
    };

  if (comment.length > 250)
    return {
      success: false,
      message: "comment are too long",
    };

  if (comment.trim().length < 2)
    return {
      success: false,
      message: "comment are too short",
    };

  if (
    !reviewerName ||
    reviewerName.trim() === "" ||
    reviewerName.length > 50 ||
    reviewerName.length < 2
  )
    return {
      success: false,
      message: "Enter a valid name",
    };

  if (
    !reviewerEmail ||
    reviewerEmail.trim() === "" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reviewerEmail)
  )
    return {
      success: false,
      message: "enter a valid email",
    };

  const state = await addReviewApi({
    productId,
    comment,
    reviewerName,
    reviewerEmail,
    rating,
  });

  if (!state.success) return state;

  revalidatePath(`/shop/${productId}`);

  return { success: true, message: "your review has been added successfully" };
}

export async function updateUser(email, prevState, formData) {
  const session = await auth();
  if (!session) return { success: false, message: "user isn't logged in" };
  const { user } = session;

  if (user.email !== email)
    return {
      success: false,
      message: "user only allowed to update his information",
    };

  const fullName = formData.get("fullName");
  const address = formData.get("address");

  if (fullName.trim().length > 30)
    return {
      success: false,
      message: "Full Name must be less than 30 letters",
    };
  if (fullName.trim().length < 5)
    return {
      success: false,
      message: "Full Name must be greater than 5 letters",
    };

  if (fullName.trim().length > 100)
    return { success: false, message: "Address must be less than 100 letters" };
  const state = await updateUserApi({ fullName, address, email });

  if (!state.success) return state;

  revalidatePath("/");

  return { success: true, message: "setting has been updated" };
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
