// app/layout.js
'use client'

import PageContext from "@/components/context/context";
import { Provider } from "@/components/ui/provider";
import { ToastContainer } from "react-toastify";



export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico"></link>
        <title>La Botica de Campero</title>
      </head>
      <body>
        <ToastContainer/>
        <Provider>
          <PageContext>
            {children}  {/* Esto renderiza las páginas hijas */}
          </PageContext>
        </Provider>
      </body>
    </html>
  );
}
