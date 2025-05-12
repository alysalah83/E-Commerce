"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import dummyProfileImg from "@/public/dummy-profile.png";
import RateStars from "../common/RateStars";
import { format, parseISO } from "date-fns";
import { TEXTAREA_MAX_LENGTH } from "@/src/lib/config";
import { addReview } from "@/src/lib/actions";
import Button from "../common/Button";
import AddRatingStar from "../common/AddRatingStar";
import { MdErrorOutline } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import FormInput from "../common/FormInput";
import MiniLoader from "../common/MiniLoader";
import FormStateMessage from "../common/FormStateMessage";

function SwitchTaps({ product }) {
  const [activeTap, setActiveTap] = useState(0);
  const { description, additionInformation, reviews, id } = product;

  const handleActiveTap = (tapOrder) => setActiveTap(tapOrder);

  const taps = [
    { tapName: "description", text: description },
    { tapName: "additional information", text: additionInformation },
    { tapName: "reviews", text: reviews },
  ];

  return (
    <div>
      <menu className="mb-9 flex flex-wrap items-center gap-6 rounded-md bg-white px-7 py-5 shadow-sm">
        {taps.map((tap, i) => (
          <TapList
            tap={tap}
            activeTap={activeTap}
            tapOrder={i}
            handleActiveTap={handleActiveTap}
            key={`title-${tap.tapName}`}
          />
        ))}
      </menu>
      <section>
        {taps.map(
          (tap, i) =>
            activeTap === i && (
              <TapContent
                productId={id}
                tap={tap}
                activeTap={activeTap}
                contentOrder={i}
                key={`content-${tap.tapName}`}
              />
            ),
        )}
      </section>
    </div>
  );
}

function TapList({ tap, tapOrder, activeTap, handleActiveTap }) {
  const { tapName } = tap;
  const onClick = handleActiveTap.bind(null, tapOrder);

  return (
    <li className="relative" onClick={onClick}>
      <span
        className={`peer cursor-pointer font-bold tracking-wide ${tapOrder === activeTap ? "text-blue-700" : "text-gray-600"} capitalize transition duration-300 hover:text-blue-700 sm:text-lg sm:font-semibold lg:text-xl`}
      >
        {tapName}
      </span>
      <span
        className={`h-[2px] rounded-sm text-start ${activeTap === tapOrder ? "w-full" : "w-0"} absolute -bottom-1 left-0 bg-blue-700 transition-all duration-300 peer-hover:w-full`}
      />
    </li>
  );
}

function TapContent({ tap, productId }) {
  const { tapName, text } = tap;

  if (tapName === "reviews" && text?.length > 0)
    return <TapReviews reviews={text} productId={productId} />;

  return text ? (
    <div className="w-full max-w-2xl px-7 py-5">
      <h3 className="mb-7 text-xl font-semibold capitalize lg:text-2xl lg:font-medium">
        specifications:
      </h3>
      <p className="text-lg text-gray-500">{text}</p>
    </div>
  ) : (
    <div className="mb-6 w-full rounded-lg bg-white px-7 py-5 text-lg font-medium text-gray-500 capitalize">
      no {tapName}.
    </div>
  );
}

function TapReviews({ reviews, productId }) {
  return (
    <div className="flex flex-col gap-4 gap-y-12 lg:flex-row">
      <div className="order-2 flex-1 lg:order-1">
        <h3 className="mb-7 text-xl font-semibold capitalize lg:text-2xl lg:font-medium">
          {reviews.length} reviews for this product:
        </h3>
        <div className="flex flex-col gap-5">
          {reviews.toReversed().map((review) => (
            <Review
              review={review}
              productId={productId}
              key={`by:${review.reviewerEmail}_at:${review.date}`}
            />
          ))}
        </div>
      </div>
      <div className="lg:order-2">
        <h3 className="mb-7 text-xl font-semibold capitalize lg:text-2xl lg:font-medium">
          add your review:
        </h3>
        <AddReview productId={productId} />
      </div>
    </div>
  );
}

function Review({ review }) {
  const { date, rating, comment, reviewerName } = review;

  const formattedDate = format(parseISO(date), "MMM EEEE d, yyyy");

  return (
    <div className="rounded-lg bg-white p-4 md:p-6">
      <div className="mb-8 flex w-full items-center gap-4">
        <Image
          src={dummyProfileImg}
          alt={`${reviewerName} profile picture`}
          width={50}
          height={50}
          placeholder="blur"
          className="rounded-full"
        />
        <span className="font-medium">{reviewerName}</span>
        <span className="ml-auto">
          <RateStars showLabel={false} rating={rating} />
        </span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-lg">{comment}</p>
        <span className="text-sm font-medium text-gray-400">
          {formattedDate}
        </span>
      </div>
    </div>
  );
}

function AddReview({ productId }) {
  const textAreaMaxLength = TEXTAREA_MAX_LENGTH;
  const [text, setText] = useState("");
  const [rating, setRating] = useState(null);
  const addReviewWithProductId = addReview.bind(null, productId, rating);
  const [formState, formAction, isPending] = useActionState(
    addReviewWithProductId,
    null,
  );

  const handleInput = (e) => setText(e.target.value);

  return (
    <form
      className="flex flex-col gap-6 rounded-lg bg-white p-4 md:p-6"
      action={formAction}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="review" className="w-fit font-medium">
          Comment
        </label>
        <textarea
          id="review"
          name="comment"
          maxLength={textAreaMaxLength}
          onChange={handleInput}
          placeholder="Enter Your Review"
          required
          disabled={isPending}
          className="h-36 w-full rounded-md border border-gray-300 bg-gray-200 px-4 py-2 ring-blue-600 outline-0 transition duration-300 focus:bg-gray-50 focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-300"
        />
        <div className="mt-1 flex items-center justify-between text-sm font-medium text-gray-400">
          <span>Maximum</span>
          <span>
            {text.length} / {textAreaMaxLength}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 sm:gap-8">
        <FormInput
          label="Name"
          name="reviewerName"
          type="text"
          placeholder="Your Name"
          isPending={isPending}
        />
        <FormInput
          label="Email"
          name="reviewerEmail"
          type="email"
          placeholder="example@gmail.com"
          isPending={isPending}
        />
      </div>
      <div className="flex items-center justify-between">
        <AddRatingStar setOutSideRating={setRating} />
        <Button disabled={isPending}>
          {isPending ? <MiniLoader /> : "Submit Review"}
        </Button>
      </div>
      <FormStateMessage state={formState} />
    </form>
  );
}

export default SwitchTaps;
