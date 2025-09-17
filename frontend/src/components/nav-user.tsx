import {
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react"

import {
    Avatar,
    AvatarFallback, AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {Link} from "react-router-dom";
import {useNavigate} from "react-router"
import {useAuthJwtLogoutAuthJwtLogoutPost} from "@/api/auth/auth.ts";
import type {UserRead} from "@/api/generated.schemas.ts";

export function NavUser({user}: {user : UserRead}) {
        const { isMobile } = useSidebar()
        const { mutateAsync } = useAuthJwtLogoutAuthJwtLogoutPost();
        const navigate = useNavigate();

        const handleLogout = async () => {
            try {
                await mutateAsync();
                localStorage.removeItem("access_token");
                navigate("/");
            } catch (err) {
                console.error("Erreur logout :", err);
            }
        };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.email || "Anonymous"}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email || "Anonymous"}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg grayscale">
                      <AvatarImage src="img.png" alt={user.name || "Avatar"} />
                      <AvatarFallback className="rounded-lg">{user.name }</AvatarFallback>
                  </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.email || "Anonymous"}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email || "Anonymous"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                  <Link to="/user-settings">Profil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconLogout />
                <p onClick={handleLogout}>Déconnexion</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
