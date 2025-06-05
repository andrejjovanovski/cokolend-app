import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router, usePage} from '@inertiajs/react';
import {useState, useEffect} from 'react';
import SelectInput from "@/Components/SelectInput.jsx";
import {MdDeleteOutline} from "react-icons/md";
import {CiEdit} from "react-icons/ci";

export default function Dashboard({users, roles}) {
  const {props} = usePage();
  const flashSuccess = props.flash?.success;

  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [reportFilter, setReportFilter] = useState('');
  const [reportType, setReportType] = useState('');

  // Watch for flash success updates
  useEffect(() => {
    if (flashSuccess) {
      setSuccessMessage(flashSuccess);

      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [flashSuccess]);

  // Handle user change
  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUserId(userId);

    const user = users.data.find((u) => u.id == userId);
    setSelectedUser(user);

    const userRole = user?.roles?.[0] ?? '';
    setSelectedRole(userRole); // Pre-fill role dropdown
  };

  // Handle role change
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedUserId || !selectedRole) return;

    router.post('/roles/update', {
      user_id: selectedUserId, role: selectedRole,
    }, {
      onSuccess: () => {
        setSelectedRole('')
        setSelectedUser(null)
        setSelectedUserId('')
      }
    });
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
                className="flex flex-col p-6 col-span-1 text-gray-900 dark:text-gray-100 bg-white rounded-md shadow-md sm:rounded-lg">
                <h2 className="uppercase font-bold text-lg text-gray-900">Role Manager</h2>
                <hr className="my-2"/>

                {successMessage && (<div className="bg-green-200 text-green-800 p-3 rounded mb-4">
                  {successMessage}
                </div>)}

                <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                  {/* Select User */}
                  <SelectInput value={selectedUserId} onChange={handleUserChange} name="user_id" className="w-full">
                    <option value="">Select user</option>
                    {users.data.map((user) => (<option key={user.id} value={user.id}>
                      {user.email}
                    </option>))}
                  </SelectInput>

                  {/* Show Current Role */}
                  {selectedUser && (<p>
                    Current role:{" "}
                    <span className="font-semibold text-blue-600">
                        {selectedUser.roles?.[0] ?? 'None'}
                      </span>
                  </p>)}

                  <div className="flex justify-between items-center">
                    {/* Select Role */}
                    <SelectInput value={selectedRole} onChange={handleRoleChange} name="role" className="me-3">
                      <option value="">Select role</option>
                      {roles.map((role) => (<option key={role.id} value={role.name}>
                        {role.name}
                      </option>))}
                    </SelectInput>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="bg-sky-500 px-4 py-3 text-white font-bold rounded shadow transition-all hover:bg-sky-600 tracking-widest uppercase text-xs">
                      Update Role
                    </button>
                  </div>
                </form>
              </div>

              <div
                className="flex flex-col p-6 col-span-2 text-gray-900 dark:text-gray-100 bg-white rounded-md shadow-md sm:rounded-lg">
                <h2 className="uppercase font-bold text-lg text-gray-900">Report filter</h2>
                <hr className="my-2"/>
                {/*   Report range*/}
                <form action="">
                  <div className="flex items-center gap-10">
                    <div className="flex flex-row gap-1 items-center font-bold">
                      <input
                        type="radio"
                        id="weekly"
                        name="reports_filter"
                        value="weekly"
                        checked={reportFilter === 'weekly'}
                        onChange={(e) => setReportFilter(e.target.value)}
                      />
                      <label htmlFor="weekly">Last 7 days</label>
                    </div>

                    <div className="flex flex-row gap-1 items-center font-bold">
                      <input
                        type="radio"
                        id="monthly"
                        name="reports_filter"
                        value="monthly"
                        checked={reportFilter === 'monthly'}
                        onChange={(e) => setReportFilter(e.target.value)}
                      />
                      <label htmlFor="monthly">This month</label>
                    </div>

                    <div className="flex flex-row gap-1 items-center font-bold">
                      <input
                        type="radio"
                        id="yearly"
                        name="reports_filter"
                        value="yearly"
                        checked={reportFilter === 'yearly'}
                        onChange={(e) => setReportFilter(e.target.value)}
                      />
                      <label htmlFor="yearly">This Year</label>
                    </div>

                    <div className="flex flex-row gap-1 items-center font-bold">
                      <input
                        type="radio"
                        id="custom"
                        name="report_type"
                        value="custom"
                        checked={reportFilter === 'custom'}
                        onChange={(e) => setReportFilter(e.target.value)}
                      />
                      <label htmlFor="custom">Custom</label>
                    </div>
                  </div>

                  {/*   Report type*/}
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

                  {/*  Submit button*/}
                  <div className="mt-5 inline-flex items-center justify-between w-full">
                    <button
                      className="bg-gray-400 px-4 py-2 text-white font-bold rounded shadow transition-all hover:bg-gray-500 tracking-widest uppercase text-xs">
                      Clear filters
                    </button>
                    <button
                      className="bg-emerald-500 px-4 py-2 text-white font-bold rounded shadow transition-all hover:bg-emerald-600 tracking-widest uppercase text-xs">
                      Genereate report
                    </button>
                  </div>
                </form>
              </div>

              <div
                className="flex flex-col p-6 col-span-1 text-gray-900 dark:text-gray-100 bg-white rounded-md shadow-md sm:rounded-lg">
                <h2 className="uppercase font-bold text-lg text-gray-900">Report summary</h2>
                <hr className="my-2"/>
                <div className="flex flex-col gap-4 my-auto font-semibold">
                  <div className="flex justify-between items-center">
                    <p>Total orders:</p>
                    <p>23</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Total revenue:</p>
                    <p>23</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Date range:</p>
                    <p>23</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div
                  className="flex flex-col p-6 col-span-3 text-gray-900 dark:text-gray-100 bg-white rounded-md shadow-md sm:rounded-lg">
                  <h2 className="uppercase font-bold text-lg text-gray-900">Users list</h2>
                  <hr className="my-2"/>
                  {/*TABLE*/}
                  <div className="w-full mx-auto bg-white shadow-md rounded-md mt-2">
                    <div className="">
                      <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                          <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                          <tr>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold text-left">#</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold text-left">Name</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold text-left">Email</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold text-left">Role</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold text-left">actions</div>
                            </th>
                          </tr>
                          </thead>
                          <tbody className="text-sm divide-y divide-gray-100">
                          {users.data.map((user, i) => (
                            <tr>
                              <td className="p-2 whitespace-nowrap">
                                {i + 1}
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                {user.name}
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-left">{user.email}</div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-left font-medium text-blue-400">{user.roles}</div>
                              </td>
                              <td className="p-2 whitespace-nowrap inline-flex gap-3">
                                <button
                                  className="p-1 bg-orange-500 text-white border border-orange-500 dark:border-red-500 rounded shadow hover:bg-orange-600">
                                  <CiEdit
                                    className="w-5 h-5"
                                  />
                                </button>
                                <button
                                  disabled
                                  className="p-1 bg-gray-400 text-white border border-gray-400 rounded shadow">
                                  <MdDeleteOutline
                                    className="w-5 h-5"/>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>);
}
