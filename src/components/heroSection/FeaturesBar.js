import { RxRocket } from "react-icons/rx";
import { GrPowerCycle } from "react-icons/gr";
import { GoShield } from "react-icons/go";
import { BsChatText } from "react-icons/bs";
import Feature from "./Feature";

function FeaturesBar() {
  const features = [
    {
      icon: <RxRocket />,
      title: "free shipping",
      label: "For all orders $200",
    },
    {
      icon: <GrPowerCycle />,
      title: "1 & 1 returns",
      label: "Cancellation after 1 day",
    },
    {
      icon: <GoShield />,
      title: "100% Secure Payments",
      label: "Gurantee secure payments",
    },
    {
      icon: <BsChatText />,
      title: "24/7 Dedicated Support",
      label: "Anywhere & anytime",
    },
  ];

  return (
    <div className="mb-10 flex flex-wrap justify-between gap-6 sm:col-span-2 md:gap-8 lg:justify-around lg:gap-0">
      {features.map((feature) => (
        <Feature feature={feature} key={feature.title} />
      ))}
    </div>
  );
}

export default FeaturesBar;
