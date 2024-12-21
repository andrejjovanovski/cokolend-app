import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, router} from "@inertiajs/react";
import Card from "@/Components/Card.jsx";
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import {useEffect, useState} from "react";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import dayjs from "dayjs";
import {DatePicker} from "antd";

export default function Index({auth, orders, queryParams = null, success}) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route('order.index'), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return;

    searchFieldChanged(name, e.target.value);
  };

  const [successMessage, setSuccessMessage] = useState(success);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null); // Hide the success message after 5 seconds
      }, 5000); // 5000 ms = 5 seconds

      return () => clearTimeout(timer); // Cleanup timeout on unmount
    }
  }, [successMessage]);

  const clearFilters = () => {
    router.get(route('order.index'), {});
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Нарачки
          </h2>

          <Link
            href={route('order.create')}
            className="bg-emerald-500 px-4 py-2 text-white font-bold rounded shadow transition-all hover:bg-emerald-600 tracking-widest uppercase text-xs">
            Креирај нарачка
          </Link>
        </div>
      }
    >
      <Head title="Нарачки"/>

      {successMessage && (
        <div className="bg-emerald-500 py-2 px-4 text-white rounded">{successMessage}</div>
      )}

      <div className="py-12">
        <div className="mx-auto max-w-[1500px] sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="flex items-center justify-between flex-col md:flex-row">
                <div className="mb-2 md:mb-0 flex items-center gap-3 w-full md:w-auto">
                  <SelectInput
                    defaultValue={queryParams.timeline}
                    onChange={e => searchFieldChanged('timeline', e.target.value)}
                  >
                    <option value="">Сите</option>
                    <option value="newest">Најнови</option>
                    <option value="today">Денес</option>
                    <option value="7">7 дена</option>
                    <option value="30">1 месец</option>
                  </SelectInput>

                  <DatePicker
                    value={queryParams.delivery_date ? dayjs(queryParams.delivery_date) : null}
                    placeholder="Избери датум"
                    needConfirm
                    format="YYYY-MM-DD"
                    onChange={(date, dateString) => searchFieldChanged("delivery_date", dateString)}
                    className="w-full h-full block rounded-md border-gray-300 shadow-sm py-2"
                  />
                </div>


                <div className="flex items-center flex-wrap md:flex-nowrap md:justify-end md:gap-3 content-end">
                  <TextInput
                    className="w-full mb-3 md:w-auto md:mb-0"
                    placeholder="Пребарувај"
                    defaultValue={queryParams.name}
                    onBlur={e => searchFieldChanged('name', e.target.value)}
                    onKeyPress={e => onKeyPress('name', e)}
                  />
                  <div className="flex w-full gap-3 items-center">
                    <SelectInput
                      className=""
                      defaultValue={queryParams.status}
                      onChange={e => searchFieldChanged('status', e.target.value)}
                    >
                      <option value="">Статус</option>
                      <option value="pending">На чекање</option>
                      <option value="processing">Прифатена</option>
                    </SelectInput>
                    <SecondaryButton
                      className="py-3 w-full md:w-auto"
                      onClick={clearFilters}
                    >
                      Избриши
                    </SecondaryButton>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-around flex-wrap z-10">
                {orders.data.map((order) => (
                  <Card
                    key={order.id}
                    image={order.image_path}
                    status={order.production_status}
                    title={order.name}
                    deliveryLocation={order.delivery_location}
                    deliveryLocationCustom={order.delivery_location_custom}
                    description={order.description}
                    date={order.delivery_date}
                    toRoute={route("order.show", order.id)}
                  />
                ))}
              </div>
              <Pagination links={orders.meta.links}/>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
