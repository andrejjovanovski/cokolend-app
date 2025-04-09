import { usePage } from '@inertiajs/react';

export default function useAuth() {
  const { auth } = usePage().props;
  const user = auth?.user;

  const can = (permission) => user?.permissions?.includes(permission);
  const hasRole = (role) => user?.roles?.includes(role);

  return { user, can, hasRole };
}
