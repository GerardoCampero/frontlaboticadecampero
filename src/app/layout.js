// app/layout.js
'use client'

import PageContext from "@/components/context/context";
import { Provider } from "@/components/ui/provider";


export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <title>La Botica de Campero</title>
      </head>
      <body>
        <Provider>
          <PageContext>
            {children}  {/* Esto renderiza las páginas hijas */}
          </PageContext>
        </Provider>
      </body>
    </html>
  );
}
