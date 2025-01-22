import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import {useEffect} from "react";
import axios from "axios";

export default function Edit({ mustVerifyEmail, status }) {



    const askForPermission = () => {
      if ('Notification' in window && 'serviceWorker' in navigator) {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            navigator.serviceWorker.ready
              .then((reg) => {
                reg.pushManager
                  .subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: 'BHv4C2J7vdf-7G9A1IKIQjb6krT2iBIuOUXZ2F-lLl9U_03ktMIZ2n6KVlJe5fDD3omgxn1Th2d9XsG9I_fXUhA',
                  })
                  .then((subscription) => {
                    console.log('Push subscription:', subscription);
                    saveSubscription(subscription);
                  })
                  .catch((error) => {
                    console.error('Push subscription failed:', error);
                  });
              })
              .catch((error) => {
                console.error('Service Worker not ready:', error);
              });
          } else {
            console.log('Notification permission denied.');
          }
        });
      }
    };

  const saveSubscription = (sub) => {
    axios.post('/save-push-notification-sub', {
      subscriptions: JSON.stringify(sub),
    })
      .catch(err => console.log('Failed to save subscription:', err));
  }


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                  Профил
                </h2>
            }
        >
            <Head title="Профил" />

            <div className="py-12">
              <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <div className="bg-yellow-300 p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                  <div className="flex justify-between items-center">
                    <p>* За непречено функционирање на апликацијата со активирани нотификации, бидете сигурни дека нотификациите се дозволени!</p>
                    <SecondaryButton
                      className="shadow-lg"
                      onClick={askForPermission}
                    >
                      Дозволи нотификации
                    </SecondaryButton>
                  </div>
                </div>

                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                  <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className="max-w-xl"
                  />
                </div>

                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                  <UpdatePasswordForm className="max-w-xl"/>
                </div>

                {/*<div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">*/}
                {/*    <DeleteUserForm className="max-w-xl" />*/}
                {/*</div>*/}
              </div>
            </div>
        </AuthenticatedLayout>
    );
}
