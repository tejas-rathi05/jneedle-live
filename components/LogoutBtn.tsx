import { useRouter } from "next/navigation";

import authService from "@/appwrite/auth";
import { useAuthStore } from "@/lib/store/auth-store";
import { Button } from "./ui/button";

const LogoutBtn = () => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const logoutHandler = () => {
    authService.logout().then(() => {
      logout();
      router.push("/login");
    });
  };
  return (
    <div className="flex justify-center items-center w-full">
      <Button variant={"custom"} onClick={logoutHandler}>
        <span className="relative z-10 w-full text-sm tracking-widest flex items-center justify-center">
          Logout
        </span>
      </Button>
    </div>
  );
};

export default LogoutBtn;
