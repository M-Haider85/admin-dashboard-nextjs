// "use client"; 

// import { Inter } from "next/font/google";
// import "./globals.css";
// import { cn } from "../lib/utils";
// import SideNavbar from "@/components/SideNavbar";
// import { SessionProvider } from "next-auth/react";

// const inter = Inter({ subsets: ["latin"] });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
    
//       <html lang="en">
//         <SessionProvider>
//         <body
//           className={cn(
//             "min-h-screen w-full bg-white text-black flex ",
//             inter.className,
//             {
//               "debug-screens": process.env.NODE_ENV === "development",
//             }
//           )}
//         >
//           <SideNavbar />
//           <div className="p-8 w-full">{children}</div>
//         </body>
//         </SessionProvider>
//       </html>
//   );
// }





"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
import SideNavbar from "@/components/SideNavbar";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get current route

  const shouldShowSidebar = pathname !== "/admin/login"; // Hide sidebar on login page

  return (
    <html lang="en">
      <SessionProvider>
        <body
          className={cn(
            "min-h-screen w-full bg-white text-black flex",
            inter.className,
            {
              "debug-screens": process.env.NODE_ENV === "development",
            }
          )}
        >
          {shouldShowSidebar && <SideNavbar />} {/* Conditionally render sidebar */}
          <div className="p-8 w-full">{children}</div>
        </body>
      </SessionProvider>
    </html>
  );
}
