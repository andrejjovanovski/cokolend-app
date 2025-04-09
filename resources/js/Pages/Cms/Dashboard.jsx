import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router, usePage} from '@inertiajs/react';
import {useState, useEffect} from 'react';
import SelectInput from "@/Components/SelectInput.jsx";

export default function Dashboard({users, roles}) {
  const {props} = usePage();
  const flashSuccess = props.flash?.success;

  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

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
      user_id: selectedUserId,
      role: selectedRole,
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
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          CMS Dashboard
        </h2>
      }
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

                {successMessage && (
                  <div className="bg-green-200 text-green-800 p-3 rounded mb-4">
                    {successMessage}
                  </div>
                )}

                <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                  {/* Select User */}
                  <SelectInput value={selectedUserId} onChange={handleUserChange} name="user_id" className="w-full">
                    <option value="">Select user</option>
                    {users.data.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.email}
                      </option>
                    ))}
                  </SelectInput>

                  {/* Show Current Role */}
                  {selectedUser && (
                    <p>
                      Current role:{" "}
                      <span className="font-semibold text-blue-600">
                        {selectedUser.roles?.[0] ?? 'None'}
                      </span>
                    </p>
                  )}

                  <div className="flex justify-between items-center">
                    {/* Select Role */}
                    <SelectInput value={selectedRole} onChange={handleRoleChange} name="role" className="me-3">
                      <option value="">Select role</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </SelectInput>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                      Update Role
                    </button>
                  </div>
                </form>
              </div>

              <div
                className="flex flex-col p-6 col-span-3 text-gray-900 dark:text-gray-100 bg-white rounded-md shadow-md sm:rounded-lg">
                <h2 className="uppercase font-bold text-lg text-gray-900">Reports</h2>
                <hr className="my-2"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
