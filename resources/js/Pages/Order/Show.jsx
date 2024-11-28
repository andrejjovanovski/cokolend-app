import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import StatusTag from "@/Components/StatusTag.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import Modal from "@/Components/Modal.jsx";
import {useState} from "react";
import SelectInput from "@/Components/SelectInput.jsx";
import {Inertia} from '@inertiajs/inertia';

export default function Show({auth, order}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDelivered, setIsDelivered] = useState(order.delivered);

  const handleMarkAsDelivered = () => {
    Inertia.post(route("orders.mark-as-delivered", order.id)), {}, {
      onSuccess: () => {
        setIsDelivered(1);
      },
      onError: (error) => {
        console.log(`Error:`, error);
      }
    };
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          {`Order: ${order.name}`}
        </h2>
      }
    >

      <Head title={`Order "${order.name}"`}/>

      <div className="py-12">
        <div className="mx-auto max-w-[1500px] sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="pb-5 border-b border-gray-500">
                <img src={order.image_path} alt="" className="w-full object-cover h-[550px]"/>
              </div>
              <div className="grid gap-1 grid-cols-2 mt-5">
                {/*LEFT COL*/}
                <div>
                  <div>
                    <label className="font-bold text-lg">Order ID</label>
                    <p className="mt-1">{order.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Order Name</label>
                    <p className="mt-1">{order.name}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Order Price</label>
                    <p className="mt-1">{order.price} MKD</p>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="">
                      <label className="font-bold text-lg">Order Price</label>
                      <p className="mt-1">{order.price} MKD</p>
                    </div>
                    <div className="content-center">
                      <label className="font-bold text-lg">Order Price</label>
                      <p className="mt-1">{order.price} MKD</p>
                    </div>

                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Order Status</label>
                    <p className="mt-1">
                      <StatusTag orderStatus={order.production_status}/>
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Created by</label>
                    <p className="mt-1">{order.user_id.name}</p>
                  </div>
                </div>

                {/*RIGHT COL*/}
                <div>
                  <div>
                    <label className="font-bold text-lg">Order Description</label>
                    <p className="mt-1">{order.description}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Delivery Location</label>
                    <p className="mt-1">{order.delivery_location}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Delivery date</label>
                    <p className="mt-1">{order.delivery_date}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Delivery time</label>
                    <p className="mt-1">{order.delivery_time}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Is delivered?</label>
                    <p className="mt-1">{isDelivered ? 'Delivered' : 'Not delivered'}</p>
                  </div>

                  <div className="mt-4">
                    <div className="flex gap-3 ">
                      <PrimaryButton
                        children={order.production_status === 'delivered' ? 'Delivered' : 'Mark as delivered'}
                        className="w-full justify-center"
                        disabled={order.production_status !== 'completed'}
                        onClick={handleMarkAsDelivered}
                      />
                      <SecondaryButton
                        children="Change Status"
                        className="w-full"
                        disabled={order.production_status === 'delivered'}
                        onClick={() => setIsModalOpen(true)}
                      />

                    </div>
                  </div>
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
          <h2 className="text-xl font-bold">Change production status</h2>
          <div className={"mt-3"}>
            <form action="" className="">
              <SelectInput
                className="w-full"
                value={order.production_status}
                onChange={(e) => handleChange(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>

              </SelectInput>

              <div className="flex justify-between items-center mt-3">
                <button
                  className="mt-6 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 uppercase tracking-widest text-xs"
                  type="submit"
                >
                  Save
                </button>

                {/* Close Button */}
                <button
                  className="mt-6 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 uppercase tracking-widest text-xs"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsModalOpen(false);
                  }
                }

                >
                  Close
                </button>
              </div>
            </form>
          </div>

        </div>
      </Modal>
    </AuthenticatedLayout>
  )
}
