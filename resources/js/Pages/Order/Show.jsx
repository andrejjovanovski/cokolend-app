import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link, router} from "@inertiajs/react";
import StatusTag from "@/Components/StatusTag.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import Modal from "@/Components/Modal.jsx";
import {useState} from "react";
import SelectInput from "@/Components/SelectInput.jsx";
import {Inertia} from '@inertiajs/inertia';
import {MdDeleteOutline} from "react-icons/md";
import {CiEdit} from "react-icons/ci";


export default function Show({auth, order}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelivered, setIsDelivered] = useState(order.delivered);
  const [productionStatus, setProductionStatus] = useState(order.production_status); // Initialize with order status

  // Mark as Delivered Handler
  const handleMarkAsDelivered = () => {
    Inertia.post(
      route("orders.mark-as-delivered", order.id),
      {},
      {
        onSuccess: () => {
          setIsDelivered(true); // Update state to reflect delivery
        },
        onError: (error) => {
          console.error("Error:", error);
        }
      }
    );
  };

  // Handle Status Update Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post(
      route("order.update-status", order.id),
      {production_status: productionStatus},
      {
        onSuccess: () => {
          setIsModalOpen(false);
        },
        onError: (error) => {
          console.error('Error:', error);
        },
      }
    );
  };


  // DELETE ORDER
  const deleteOrder = (order) => {
    if (!window.confirm("Дали сте сигурни дека сакате да ја избришете нарачката?")) {
      return;
    }
    router.delete(route("order.destroy", order.id));
  }

  // ORDER LOCATION
  const orderLocation = order.delivery_location === 'Дуќан' ? order.delivery_location : order.delivery_location_custom || 'Локација не е наведена!';


  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            {`Нарачка: ${order.name}`}
          </h2>
          <div className="flex items-center gap-2">
            <Link
              href={route("order.edit", order.id)}
              className="p-1 bg-orange-500 text-white border border-orange-500 dark:border-red-500 rounded shadow hover:bg-orange-600">
              <CiEdit
                className="w-5 h-5"
              />

            </Link>
            <button
              onClick={(e) => deleteOrder(order)}
              className="p-1 bg-red-500 text-white border border-red-500 dark:border-red-500 rounded shadow hover:bg-red-600">
              <MdDeleteOutline
                className="w-5 h-5"/>
            </button>
          </div>
        </div>

      }
    >
      <Head title={`Нарачка: "${order.name}"`}/>

      <div className="py-12">
        <div className="mx-auto max-w-[1500px] sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="pb-5 border-b border-gray-500">
                <img src={order.image_path} alt="" className="mx-auto object-cover h-[550px] bg-center bg-cover"/>
              </div>
              <div className="grid gap-1 grid-cols-2 mt-5">
                {/*LEFT COL*/}
                <div>
                  <div>
                    <label className="font-bold text-lg">Број на нарачка</label>
                    <p className="mt-1">{order.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Парчиња и вкус</label>
                    <p className="mt-1">{order.name}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Цена на нарачка</label>
                    <p className="mt-1">{order.price} MKD</p>
                  </div>

                  <div className="mt-4 flex sm:gap-10 flex-col md:flex-row md:gap-10">
                    <div>
                      <label className="font-bold text-lg">Датум за испорака</label>
                      <p className="mt-1">{order.delivery_date}</p>
                    </div>

                    <div className="me-6">
                      <label className="font-bold text-lg">Час за испорака</label>
                      <p className="mt-1">{order.delivery_time}</p>
                    </div>
                  </div>


                  <div className="mt-4">
                    <label className="font-bold text-lg">Статус на нарачка</label>
                    <p className="mt-1">
                      <StatusTag orderStatus={order.production_status}/>
                    </p>
                  </div>

                  <div className="mt-4 flex sm:gap-10 flex-col md:flex-row md:gap-10">
                    <div>
                      <label className="font-bold text-lg">Креирана од</label>
                      <p className="mt-1">{order.user_id.name}, <i>{order.created_at}</i></p>
                    </div>

                    <div>
                      <label className="font-bold text-lg">Изменета од</label>
                      <p className="mt-1">
                        {order.updated_by === null ? (
                          ' '
                        ) : (
                          <>
                            {order.updated_by.name}, <i>{order.updated_at}</i>
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                </div>

                {/*RIGHT COL*/}
                <div>
                  <div>
                    <label className="font-bold text-lg">Опис на нарачка</label>
                    <p className="mt-1">{order.description}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Локација за испорака</label>
                    <p className="mt-1">{orderLocation}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Име на клиентот</label>
                    <p className="mt-1">{order.customer_name}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Број на клиентот</label>
                    <p className="mt-1">{order.customer_phone_number}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Достава</label>
                    <p className="mt-1">{isDelivered ? 'Доставена' : 'Не е доставена'}</p>
                  </div>

                  <div className="mt-4 hidden">
                    <div className="flex gap-3 ">
                      <PrimaryButton
                        children={isDelivered ? 'Доставена' : 'Означи како доставено'}
                        className="w-full justify-center"
                        disabled={isDelivered || productionStatus !== 'processing'}
                        onClick={handleMarkAsDelivered}
                      />
                      <SecondaryButton
                        children="Промени статус"
                        className="w-full"
                        disabled={isDelivered}
                        onClick={() => setIsModalOpen(true)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:block">
                <div className="flex gap-3 ">
                  <PrimaryButton
                    children={isDelivered ? 'Доставена' : 'Означи како доставено'}
                    className="w-full justify-center"
                    disabled={isDelivered || productionStatus !== 'processing'}
                    onClick={handleMarkAsDelivered}
                  />
                  <SecondaryButton
                    children="Промени статус"
                    className="w-full"
                    disabled={isDelivered}
                    onClick={() => setIsModalOpen(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={isModalOpen}
        maxWidth="lg"
        onClose={() => setIsModalOpen(false)}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold">Промени статус на изработка</h2>
          <div className="mt-3">
            <form onSubmit={handleSubmit}>
              <SelectInput
                className="w-full"
                value={productionStatus}
                onChange={(e) => setProductionStatus(e.target.value)} // Update the state
              >
                <option value="">Избери статус</option>
                <option value="pending">На чекање</option>
                <option value="processing">Прифатена</option>
              </SelectInput>

              <div className="flex justify-between items-center mt-3">
                <button
                  className="mt-6 px-4 py-2 text-white bg-emerald-500 rounded-md hover:bg-emerald-600 uppercase tracking-widest text-xs"
                  type="submit"
                >
                  Зачувај
                </button>

                <button
                  className="mt-6 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 uppercase tracking-widest text-xs"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsModalOpen(false);
                  }}
                >
                  Затвори
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </AuthenticatedLayout>
  );
}
