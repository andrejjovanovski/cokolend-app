import SecondaryButton from "@/Components/SecondaryButton.jsx";
import StatusTag from "@/Components/StatusTag.jsx";
import {Link} from "@inertiajs/react";

export default function Card({ image, title, status, description, date, buttonText = "Види повеќе", toRoute }) {

  return (
    <div
      className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
      <div className="relative m-2.5 h-[350px] overflow-hidden text-white rounded-md">
        <img
          className="w-full h-auto object-contain"
          src={image}
          alt={title}/>
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
        <p className=" font-extrabold text-xl text-red-500 leading-normal">
          За ден:<br/>
          {date}
        </p>
      </div>
      <div className="px-4 pb-4 pt-0 mt-7 flex justify-center items-center">
      <Link
        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
        href={toRoute}
      >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
