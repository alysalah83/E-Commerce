import TestimonialCard from "./TestimonialCard";

function TestimonialCards() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <TestimonialCard key={i} />
      ))}
    </>
  );
}

export default TestimonialCards;
