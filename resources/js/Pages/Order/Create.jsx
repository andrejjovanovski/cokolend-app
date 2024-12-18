import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import Checkbox from "@/Components/Checkbox.jsx";

export default function Create({auth}) {

  const {data, setData, post, errors, reset} = useForm({
    image_path: '',
    name: '',
    description: '',
    price: '',
    delivery_location: '',
    delivery_location_custom: '',
    delivery_time: '',
    delivery_date: '',
    customer_name: '',
    customer_phone_number: '',
  })

  const onSubmit = (e) => {
    e.preventDefault();

    post(route('order.store'))
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Креирај нова нарачка
          </h2>
        </div>
      }
    >

      <Head title='Нова нарачка'/>

      <div className="py-12">
        <div className="mx-auto max-w-[1500px] sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <form
              encType="multipart/form-data"
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-dark:800 shadow sm:rounded-lg"
            >


              <div className="mt-4">
                <InputLabel
                  htmlFor="order_name"
                  value="Парчиња и вкус"
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
                  htmlFor="customer_name"
                  value="Име на купувач"
                />

                <TextInput
                  id="customer_name"
                  name="customer_name"
                  type="text"
                  value={data.customer_name}
                  className="mt-1 w-full block"
                  isFocused={true}
                  onChange={(e) => setData('customer_name', e.target.value)}
                />

                <InputError message={errors.customer_name} className="mt-2"/>
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="customer_phone_number"
                  value="Телефонски број на купувач"
                />

                <TextInput
                  id="customer_phone_number"
                  name="customer_phone_number"
                  type="text"
                  value={data.customer_phone_number}
                  className="mt-1 w-full block"
                  isFocused={true}
                  onChange={(e) => setData('customer_phone_number', e.target.value)}
                />

                <InputError message={errors.customer_phone_number} className="mt-2"/>
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="order_description"
                  value="Опис на нарачка"
                />
                <TextAreaInput
                  id="order_description"
                  name="description"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                >
                </TextAreaInput>

                <InputError
                  message={errors.description}
                  className="mt-2"
                />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="order_price"
                  value="Цена"
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
                <p className="mb-1">Локација за достава</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center">

                    <div className="flex items-center me-4">
                      <TextInput
                        id="delivery_location_shop"
                        value="Дуќан"
                        type="radio"
                        name="delivery_location_radio"
                        onChange={() => setData('delivery_location', 'Дуќан')}
                        className="me-1"
                        checked={data.delivery_location === 'Дуќан'}
                      />
                      <InputLabel
                        htmlFor="delivery_location_shop"
                        value="Дуќан"
                      />
                    </div>

                    <div className="flex items-center">
                      <TextInput
                        id="delivery_location_other"
                        value="other"
                        type="radio"
                        name="delivery_location_radio"
                        onChange={() => setData('delivery_location', 'other')}
                        className="me-1"
                        checked={data.delivery_location === 'other'}
                      />
                      <InputLabel
                        htmlFor="delivery_location_other"
                        value="Друго"
                      />
                    </div>
                  </div>
                </div>

                {data.delivery_location === 'other' && (
                  <div className="w-full mt-3">
                    <TextInput
                      id="delivery_location_custom"
                      name="delivery_location"
                      type="text"
                      value={data.delivery_location_custom || ''}
                      placeholder="Внесете локација за достава"
                      className="mt-1 w-full block"
                      isFocused={true}
                      onChange={(e) => setData('delivery_location_custom', e.target.value)}
                    />
                    <InputError message={errors.delivery_location_custom} className="mt-2"/>
                  </div>
                )}
              </div>


              <div className="mt-4">
                <InputLabel
                  htmlFor="delivery_date"
                  value="Датум на достава"
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
                  value="Време за достава"
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

              <button
                className="mt-6 px-4 py-2 font-bold text-white bg-emerald-500 rounded-md hover:bg-emerald-600 uppercase tracking-widest text-xs"
                type="submit"
              >
                Зачувај
              </button>

            </form>
          </div>
        </div>
      </div>


    </AuthenticatedLayout>
  )
}
