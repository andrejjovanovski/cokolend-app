import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';

export default function Dashboard() {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard"/>

      <div className="py-12">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-8">
          <div className="overflow-hidden">
            <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div
                className="p-6 col-span-1 sm:col-span-2 text-gray-900 dark:text-gray-100 bg-white rounded-md shadow-md sm:rounded-lg">
                <h2>Create new order</h2>
                <Link
                  href={route('order.create')}
                  className="w-full bg-emerald-500 px-4 py-2 text-white rounded shadow transition-all hover:bg-emerald-600 tracking-widest uppercase text-xs">
                  Create order
                </Link>
              </div>

              <div
                className="p-6 col-span-1 text-gray-900 dark:text-gray-100 bg-white rounded-md shadow-md sm:rounded-lg">
                <h2>Create new order</h2>
                <Link
                  href={route('order.create')}
                  className="w-full bg-emerald-500 px-4 py-2 text-white rounded shadow transition-all hover:bg-emerald-600 tracking-widest uppercase text-xs">
                  Create order
                </Link>
              </div>

              <div
                className="p-6 col-span-1 text-gray-900 dark:text-gray-100 bg-white rounded-md shadow-md sm:rounded-lg">
                <h2 className="border-b-2 border-[#7F5026] uppercase tracking-widest text-sm">For Delivery</h2>
                <div className="flex items-center justify-between mt-2">
                  <p className="tracking-wider">Awaiting delivery</p>
                  <p className="tracking-wider">30</p>
                </div>
                <div className="flex items-center justify-between items-center mt-1">
                  <p className="tracking-wider">Awaiting delivery today<span><br/>(28.11.2024)</span></p>
                  <p className="tracking-wider">5</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
