import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'primereact/resources/themes/lara-light-blue/theme.css'; 

import { LoadingOverlayProvider } from './context/LoadingOverlayContext';
import { ToastrProvider } from './context/ToastrContext';
import { PrimeReactProvider } from "primereact/api";

        
createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <PrimeReactProvider>
                <LoadingOverlayProvider>
                    <ToastrProvider>
                        
                            <App {...props} />
                    </ToastrProvider>
                </LoadingOverlayProvider>
            </PrimeReactProvider>
        );
    },
});
