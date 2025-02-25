import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head, Link } from "@inertiajs/react";

export default function Index({ deliveries }) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Испораки
        </h2>
      }
    >
      <Head title="Испораки" />

      <div className="py-12">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-8">
          <div className="overflow-hidden">
            <div className="w-full flex flex-col gap-4">
              {deliveries.data.map((delivery) => {
                // Determine border color based on processing_status
                const borderColor =
                  delivery.production_status === "delivered"
                    ? "border-green-500"
                    : "border-red-500";

                return (
                  <Link
                    key={delivery.id}
                    href={route("order.show", delivery.id)}
                    className={`flex flex-row gap-3 p-2 border-s-[6px] ${borderColor} col-span-1 text-gray-900 dark:text-gray-100 bg-white rounded-md shadow-md sm:rounded-lg hover:cursor-pointer`}
                  >
                    <img
                      className="w-auto max-w-28 h-32 object-contain rounded-lg shadow-md"
                      src={delivery.image_path}
                      alt={delivery.name}
                    />
                    <div className="w-full">
                      <p className="font-bold text-lg border-b border-[#7F5026]">
                        {delivery.name}
                      </p>
                      <div className="w-full flex flex-col">
                        <p>
                          Локација:{" "}
                          {delivery.delivery_location === "Дуќан"
                            ? delivery.delivery_location
                            : delivery.delivery_location_custom ||
                            "Локација не е наведена!"}
                        </p>
                        <p>Цена: {delivery.price}МКД</p>
                        <p className="">
                          Датум за достава<br />
                          <span className="text-red-500">
                            {delivery.delivery_date}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
