"use client";

import SectionHeader from "../common/SectionHeader";
import { HiOutlineUsers } from "react-icons/hi2";
import TestimonialCards from "./TestimonialCards";
import Slider from "../common/compoundComponents/Slider";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

function TestimonialsSection() {
  return (
    <section>
      <div className="mx-auto mt-16 max-w-7xl overflow-hidden p-6 pt-0">
        <Slider count={3}>
          <SectionHeader
            title="Testimonials"
            label="User Feedbacks"
            icon={<HiOutlineUsers />}
            button={
              <Slider.NavButtons>
                <button className="h-fit cursor-pointer rounded-md border border-slate-300 bg-white px-2 py-2 transition duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200">
                  <SlArrowLeft className="h-5 w-5 fill-slate-900" />
                </button>
                <button className="h-fit cursor-pointer rounded-md border border-slate-300 bg-white px-2 py-2 transition duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200">
                  <SlArrowRight className="h-5 w-5 fill-slate-900" />
                </button>
              </Slider.NavButtons>
            }
          />
          <Slider.Cards>
            <TestimonialCards />
          </Slider.Cards>
        </Slider>
      </div>
    </section>
  );
}

export default TestimonialsSection;
