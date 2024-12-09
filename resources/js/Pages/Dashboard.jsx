import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';

export default function Dashboard({stats}) {

  const today = new Date();
  const formattedDate = today.toLocaleDateString('mk-MK', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });


  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Контролна табла
        </h2>
      }
    >
      <Head title="Dashboard"/>

      <div className="py-12">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-8">
          <div className="overflow-hidden">
            <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-4">


              <div
                className="flex items-center justify-center flex-col p-6 col-span-1 text-gray-900 dark:text-gray-100 bg-white rounded-md shadow-md sm:rounded-lg">
                <h2 className="uppercase font-bold text-xl mb-3 text-[#7F5026]">Нова нарачка</h2>
                <Link
                  href={route('order.create')}
                  className="w-full bg-emerald-500 px-4 py-2 text-center font-bold text-white rounded shadow transition-all hover:bg-emerald-600 tracking-widest uppercase text-xs">
                  Креирај нарачка
                </Link>
              </div>

              <div
                className="p-6 col-span-1 sm:col-span-2 text-gray-900 dark:text-gray-100 bg-white rounded-md shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between border-b-2 border-[#7F5026]">
                  <h2 className="uppercase tracking-widest text-sm">Статус на нарачки</h2>
                  <h2 className="uppercase tracking-widest text-sm">{formattedDate}</h2>
                </div>

                <div className="flex items-center flex-col justify-between mt-2 gap-4 md:flex-row">
                  <div className="w-full md:pe-3 md:border-e md:border-e-[#7F5026] h-full ">
                    <div className="flex  justify-between mt-1">
                      <p className="tracking-wider">На чекање:</p>
                      <p className="tracking-wider bg-gray-300 px-1 rounded-md">{stats.pendingOrders}</p>
                    </div>
                    <div className="flex  justify-between mt-1">
                      <p className="tracking-wider">Во изработка:</p>
                      <p className="tracking-wider bg-gray-300 px-1 rounded-md">{stats.inProgressOrders}</p>
                    </div>
                    <div className="flex  justify-between mt-1">
                      <p className="tracking-wider">Завршени:</p>
                      <p className="tracking-wider bg-gray-300 px-1 rounded-md">{stats.completedOrders}</p>
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="flex  justify-between mt-1">
                      <p className="tracking-wider">Нарачки:</p>
                      <p className="tracking-wider bg-gray-300 px-1 rounded-md">{stats.ordersTodayRemote}</p>
                    </div>
                    <div className="flex  justify-between mt-1">
                      <p className="tracking-wider">Нарачки (дуќан):</p>
                      <p className="tracking-wider bg-gray-300 px-1 rounded-md">{stats.ordersTodayShop}</p>
                    </div>
                    <div className="flex  justify-between mt-1">
                      <p className="tracking-wider">Вкупно нарачки:</p>
                      <p className="tracking-wider bg-gray-300 px-1 rounded-md">{stats.allOrders}</p>
                    </div>
                  </div>


                </div>

              </div>

              <div
                className="p-6 col-span-1 text-gray-900 dark:text-gray-100 bg-white rounded-md shadow-md sm:rounded-lg">
                <h2 className="border-b-2 border-[#7F5026] uppercase tracking-widest text-sm">Достава</h2>
                <div className="flex items-center justify-between mt-1">
                  <p className="tracking-wider">За достава денес:<span><br/>({formattedDate})</span></p>
                  <p className="tracking-wider bg-gray-300 px-1 rounded-md">{stats.forDelivery}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
