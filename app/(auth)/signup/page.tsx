import React from "react";

import AuthLayout from "@/components/AuthLayout";
import Signup from "@/components/Signup";

const page = () => {
  return (
    <AuthLayout authentication={false}>
      <Signup />
    </AuthLayout>
  );
};

export default page;
