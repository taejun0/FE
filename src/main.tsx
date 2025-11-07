import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';

// const initGA = () => {
//   const GA_MEASUREMENT_ID = import.meta.env.VITE_GOOGLE_ANALYTICS;

//   if (GA_MEASUREMENT_ID) {
//     const script = document.createElement("script");
//     script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
//     script.async = true;
//     document.head.appendChild(script);

//     window.dataLayer = window.dataLayer || [];
//     function gtag() {
//       window.dataLayer.push(arguments);
//     }
//     gtag("js", new Date());
//     gtag("config", GA_MEASUREMENT_ID);
//   } else {
//     console.error("GA_MEASUREMENT_ID is not defined");
//   }
// };

// initGA();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
);
