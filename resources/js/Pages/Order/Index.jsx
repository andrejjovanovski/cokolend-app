import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, router} from "@inertiajs/react";
import Card from "@/Components/Card.jsx";
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";

export default function Index({auth, orders, queryParams = null, success}) {

  queryParams = queryParams || {}

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name]
    }

    router.get(route('order.index'), queryParams)
  }

  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return;

    searchFieldChanged(name, e.target.value)
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Orders
          </h2>

          <Link
            href={route('order.create')}
            className="bg-emerald-500 px-4 py-2 text-white rounded shadow transition-all hover:bg-emerald-600 tracking-widest uppercase text-xs">
            Create order
          </Link>
        </div>
      }
    >

      <Head title='Orders'/>

      {success && (
        <div className="bg-emerald-500 py-2 px-4 text-white rounded">{success}</div>
      )}

      <div className="py-12">
        <div className="mx-auto max-w-[1500px] sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">

              <div className="flex items-center justify-end content-end gap-3">
                <TextInput
                  placeholder="Search"
                  defaultValue={queryParams.name}
                  onBlur={e => searchFieldChanged('name', e.target.value)}
                  onKeyPress={e => onKeyPress('name', e)}
                />
                <SelectInput
                  defaultValue={queryParams.status}
                  onChange={e => searchFieldChanged('status', e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="delivered">Delivered</option>
                </SelectInput>
              </div>

              <div className="flex items-center justify-around flex-wrap">
                {orders.data.map((order) => (
                  <Card
                    key={order.id}
                    image={order.image_path}
                    status={order.production_status}
                    title={order.name}
                    description={order.description}
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
  )
}
