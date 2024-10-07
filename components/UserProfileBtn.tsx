import authService from "@/appwrite/auth";
import { logout } from "@/lib/features/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, PanelsTopLeft, User, UserRound } from "lucide-react";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

export default function UserProfileBtn() {
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.auth.userData);
  const dispatch = useDispatch<AppDispatch>();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      router.push("/login");
    });
  };
  const labels = currentUser?.labels || currentUser?.userData?.labels || [];
  const role = labels[0];
  const isAdmin = role === "admin";

  console.log("isAdmin: ", isAdmin);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="p-2 rounded-full hover:bg-gray-100/50 cursor-pointer">
          <UserRound className="size-[20px] lg:size-[24px]" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="ml-2 font-bold">
          {isAdmin ? "Admin" : "My Account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {isAdmin && (
            <DropdownMenuItem className="">
              <Link href="/admin/dashboard" className="flex w-full h-full">
                <PanelsTopLeft className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/my-account" className="flex w-full h-full">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button onClick={logoutHandler} className="flex w-full h-full">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
