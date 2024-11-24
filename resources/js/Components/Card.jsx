import SecondaryButton from "@/Components/SecondaryButton.jsx";
import StatusTag from "@/Components/StatusTag.jsx";

export default function Card({ image, title, status, description, buttonText = "Details", toRoute }) {
  return (
    <div
      className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
      <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
        <img
          src={image}
          alt={title} />
      </div>
      <div className="px-4">
        <StatusTag
          orderStatus={status}
        />
      </div>
      <div className="p-4 pt-1">

        <h6 className="mb-2 text-slate-800 text-xl font-semibold">
          {title}
        </h6>
        <p className="text-slate-600 leading-normal font-light h-[100px]">
          {description}
        </p>
      </div>
      <div className="px-4 pb-4 pt-0 mt-7 flex justify-center items-center">

        <SecondaryButton href={toRoute}>
          {buttonText}
        </SecondaryButton>

      </div>
    </div>
  );
}
