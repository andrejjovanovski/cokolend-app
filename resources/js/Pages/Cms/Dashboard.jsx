import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import SelectInput from "@/Components/SelectInput.jsx";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Modal from "@/Components/Modal.jsx";
import TextInput from "@/Components/TextInput.jsx";

export default function Dashboard({ users, roles, report }) {
  const { props } = usePage();
  const flashSuccess = props.flash?.success;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [reportFilter, setReportFilter] = useState('');
  const [reportType, setReportType] = useState('');
  const [reportData, setReportData] = useState({});

  useEffect(() => {
    if (flashSuccess) {
      setSuccessMessage(flashSuccess);

      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [flashSuccess]);

  // Handle clear from button
  const handleClearForm = (e) => {
    e.preventDefault();

    setReportType('');
    setReportFilter('')
  }

  if (report) {
    console.log(report);
  }

  // Handle submit for report generator form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reportType || !reportFilter) return;

    try {
      const response = await axios.get(`/reports/summary`, {
        params: {
          report_type: reportType,
          report_filter: reportFilter,
        }
      });
      if (response.status === 200) {
        setReportData(response.data)
        console.log('Fetched Report:', response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setSelectedRole(user.roles?.[0] || '');
    setNewPassword('');
    setIsModalOpen(true);
  };

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
        CMS Dashboard
      </h2>}
    >
      <Head title="CMS Dashboard"/>

      <div className="py-12">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-8">
          <div className="overflow-hidden">
            <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div
                className="flex flex-col p-6 col-span-2 text-gray-900 dark:text-gray-100 bg-white rounded-md shadow-md sm:rounded-lg">
                <h2 className="uppercase font-bold text-lg text-gray-900">Report filter</h2>
                <hr className="my-2"/>
                <form
                  onSubmit={handleSubmit}
                >
                  <div className="flex items-center gap-10">
                    {['weekly', 'monthly', 'yearly'].map((filter) => (
                      <div key={filter} className="flex flex-row gap-1 items-center font-bold">
                        <input
                          type="radio"
                          id={filter}
                          name="reports_filter"
                          value={filter}
                          checked={reportFilter === filter}
                          onChange={(e) => setReportFilter(e.target.value)}
                        />
                        <label htmlFor={filter}>
                          {filter === 'weekly' && 'Last 7 days'}
                          {filter === 'monthly' && 'This month'}
                          {filter === 'yearly' && 'This year'}
                          {filter === 'custom' && 'Custom'}
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-row gap-3 items-center font-bold">
                    <div className="flex flex-row gap-1 items-center font-bold">
                      <input
                        type="radio"
                        id="summary"
                        name="reports_type"
                        value="summary"
                        checked={reportType === 'summary'}
                        onChange={(e) => setReportType(e.target.value)}
                      />
                      <label htmlFor="summary">Summary report</label>
                    </div>
                    <div className="flex flex-row gap-1 items-center font-bold">
                      <input
                        type="radio"
                        id="detailed"
                        name="reports_type"
                        value="detailed"
                        checked={reportType === 'detailed'}
                        onChange={(e) => setReportType(e.target.value)}
                      />
                      <label htmlFor="detailed">Detailed report</label>
                    </div>
                  </div>

                  <div className="mt-5 inline-flex items-center justify-between w-full">
                    <button
                      onClick={handleClearForm}
                      className="bg-gray-400 px-4 py-2 text-white font-bold rounded shadow transition-all hover:bg-gray-500 tracking-widest uppercase text-xs">
                      Clear filters
                    </button>
                    <button
                      className="bg-emerald-500 px-4 py-2 text-white font-bold rounded shadow transition-all hover:bg-emerald-600 tracking-widest uppercase text-xs">
                      Generate report
                    </button>
                  </div>
                </form>
              </div>

              <div
                className="flex flex-col p-6 col-span-2 text-gray-900 dark:text-gray-100 bg-white rounded-md shadow-md sm:rounded-lg">
                <h2 className="uppercase font-bold text-lg text-gray-900">Report summary</h2>
                <hr className="my-2"/>
                <div className="flex flex-col gap-4 my-auto font-semibold">
                  {!reportData.total_orders ? (
                      <p>No report data loaded yet.</p>
                    ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <p>Total orders:</p>
                        <p>{reportData.total_orders ?? '-'}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p>Total Revenue</p>
                        <p>{reportData.total_revenue ?? '-'} МКД
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p>Date range:</p>
                        <p>{reportData.date_range ?? '-'}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div
                  className="flex flex-col p-6 col-span-3 text-gray-900 dark:text-gray-100 bg-white rounded-md shadow-md sm:rounded-lg">
                  <h2 className="uppercase font-bold text-lg text-gray-900">Users list</h2>
                  <hr className="my-2"/>
                  <div className="w-full mx-auto bg-white shadow-md rounded-md mt-2 overflow-x-auto">
                    <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2 text-left">#</th>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Role</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                  {users.data.map((user, i) => (
                    <tr key={user.id}>
                      <td className="p-2">{i + 1}</td>
                      <td className="p-2">{user.name}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2 text-blue-500">{user.roles?.[0] || 'None'}</td>
                      <td className="p-2 inline-flex gap-3">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="p-1 bg-orange-500 text-white border border-orange-500 rounded shadow hover:bg-orange-600">
                          <CiEdit className="w-5 h-5"/>
                        </button>
                        <button
                          disabled
                          className="p-1 bg-gray-400 text-white border border-gray-400 rounded shadow">
                          <MdDeleteOutline className="w-5 h-5"/>
                        </button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL */}
        <Modal
          show={isModalOpen}
          maxWidth="lg"
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
            setSelectedRole('');
            setNewPassword('');
          }}
        >
          <div className="p-6">
            {selectedUser && (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  router.put('/user/update', {
                    user_id: selectedUser.id,
                    role: selectedRole || selectedUser.roles?.[0],
                    password: newPassword,
                  }, {
                    onSuccess: () => {
                      setIsModalOpen(false);
                      setSelectedUser(null);
                      setSelectedRole('');
                      setNewPassword('');
                    }
                  });
                }}
              >
                <h2 className="text-lg font-bold mb-4">Edit User</h2>

                <p><strong>Email:</strong> {selectedUser.email}</p>

                <SelectInput
                  value={selectedRole || selectedUser.roles?.[0] || ''}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  name="role"
                  className="w-full"
                >
                  <option value="">Select role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </SelectInput>

                <TextInput
                  type="password"
                  placeholder="New Password (leave blank to keep current)"
                  className="w-full border rounded px-3 py-2"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded"
                >
                  Update
                </button>
              </form>
            )}
          </div>
        </Modal>
      </div>
    </div>
</div>
</AuthenticatedLayout>
)
  ;
}
