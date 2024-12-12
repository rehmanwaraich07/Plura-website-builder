import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";

import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>{children}</ClerkProvider>
  );
};

export default Layout;
