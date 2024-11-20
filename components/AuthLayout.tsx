"use client";

import { useAuthStore } from "@/lib/store/auth-store";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

const AuthLayout = ({
  children,
  authentication = true,
}: {
  children: ReactNode;
  authentication: boolean;
}) => {
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const { authStatus } = useAuthStore()

  useEffect(() => {
    // TODO: Make it more easy to understand
    if (authentication && authStatus !== authentication) {
      console.log("AUTH: ", authStatus);
      router.push("/login");
    } else if (!authentication && authStatus !== authentication) {
      console.log("AUTH: ", authStatus);

      router.replace("/");
    }
    setLoader(false);
  }, [authStatus, router, authentication]);

  return loader ? <h1 className="h-screen flex items-center justify-center">Loading...</h1> : <>{children}</>;
};

export default AuthLayout;
