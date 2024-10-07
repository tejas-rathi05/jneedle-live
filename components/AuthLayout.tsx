"use client";

import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "@/lib/store";

const AuthLayout = ({
  children,
  authentication = true,
}: {
  children: ReactNode;
  authentication: boolean;
}) => {
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const authStatus = useAppSelector((state) => state.auth.status);

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

  return loader ? <h1>Loading...</h1> : <>{children}</>;
};

export default AuthLayout;
