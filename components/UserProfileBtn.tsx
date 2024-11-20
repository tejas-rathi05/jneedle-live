import authService from "@/appwrite/auth";
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
import { useAuthStore } from "@/lib/store/auth-store";

export default function UserProfileBtn() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const logoutHandler = () => {
    authService.logout().then(() => {
      logout();
      router.push("/login");
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="p-2 rounded-full hover:bg-gray-100/50 cursor-pointer">
          <UserRound className="size-[20px] lg:size-[24px]" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/my-account" className="flex w-full h-full">
              <User className="mr-2 h-4 w-4" />
              <span>My account</span>
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
