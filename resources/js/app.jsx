import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import {useEffect} from "react";
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import axios from "axios";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register("/service-worker.js").then((registration) => {
    console.log('Service worker registration successfully');
  });
}


createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
