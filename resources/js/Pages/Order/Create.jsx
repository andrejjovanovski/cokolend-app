import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";

export default function Create({auth}) {

  const {data, setData, post, errors, reset} = useForm({
    image: '',
    name: '',
    description: '',
  })

  const onSubmit = (e) => {
    e.preventDefault();

    post(route('order.create'))
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Create a new order
          </h2>
        </div>
      }
    >

      <Head title='Orders'/>

      <div className="py-12">
        <div className="mx-auto max-w-[1500px] sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-dark:800 shadow sm:rounded-lg"
            >
              <div>
                <InputLabel
                  htmlFor="order_image_path"
                  value="Order Image"
                />

                <TextInput
                  id="order_image_path"
                  name="image"
                  type="file"
                  value={data.image}
                  className="mt-1 w-full block"
                  onChange={(e) => setData('image', e.target.value)}
                />

                <InputError message={errors.image} className="mt-2"/>
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="order_name"
                  value="Order Name"
                />

                <TextInput
                  id="order_name"
                  name="name"
                  type="text"
                  value={data.name}
                  className="mt-1 w-full block"
                  isFocused={true}
                  onChange={(e) => setData('name', e.target.value)}
                />

                <InputError message={errors.name} className="mt-2"/>
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="order_price"
                  value="Order Price"
                />

                <TextInput
                  id="order_price"
                  name="price"
                  type="number"
                  value={data.price}
                  className="mt-1 w-full block"
                  isFocused={true}
                  onChange={(e) => setData('price', e.target.value)}
                />

                <InputError message={errors.price} className="mt-2"/>
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="delivery_location"
                  value="Delivery Location"
                />

                <TextInput
                  id="delivery_location"
                  name="delivery_location"
                  type="text"
                  value={data.delivery_location}
                  className="mt-1 w-full block"
                  isFocused={true}
                  onChange={(e) => setData('delivery_location', e.target.value)}
                />

                <InputError message={errors.delivery_location} className="mt-2"/>
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="delivery_date"
                  value="Delivery Date"
                />

                <TextInput
                  id="delivery_date"
                  name="delivery_date"
                  type="date"
                  value={data.delivery_date}
                  className="mt-1 w-full block"
                  isFocused={true}
                  onChange={(e) => setData('delivery_date', e.target.value)}
                />

                <InputError message={errors.delivery_date} className="mt-2"/>
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="delivery_time"
                  value="Delivery Time"
                />

                <TextInput
                  id="delivery_time"
                  name="delivery_time"
                  type="time"
                  value={data.delivery_time}
                  className="mt-1 w-full block"
                  isFocused={true}
                  onChange={(e) => setData('delivery_time', e.target.value)}
                />

                <InputError message={errors.delivery_time} className="mt-2"/>
              </div>


            </form>
          </div>
        </div>
      </div>


    </AuthenticatedLayout>
  )
}
