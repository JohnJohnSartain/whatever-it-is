import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import UserFunctions from "../user/UserFunctions";
import { settingsMenuOptions } from "./settingsMenuOptions";
import ListItemIcon from "@mui/material/ListItemIcon";
import LoginDialog from "../user/LoginDialog";
import { UserPublic } from "../user/UserPublic";

export function SettingsMenu() {
  const [anchorElUser, setAnchorElUser] = useState<any>(null);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const [user, setUser] = useState<UserPublic | null>(UserFunctions.getUser());

  const handleOpenUserMenu = (event: any) =>
    setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  function shouldShowMenuOption(name: string): boolean {
    return (
      (name.toLowerCase() !== "login" &&
        name.toLowerCase() !== "logout" &&
        name.toLowerCase() !== "account") ||
      (name.toLowerCase() === "login" &&
        UserFunctions.isLoggedIn() === false) ||
      (name.toLowerCase() === "logout" &&
        UserFunctions.isLoggedIn() === true) ||
      (name.toLowerCase() === "account" && UserFunctions.isLoggedIn() === true)
    );
  }

  window.addEventListener("User logged in", () => {
    setUser(UserFunctions.getUser());
  });

  window.addEventListener("User logged out", () => {
    setUser(null);
  });

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={user?.name ?? ""}
            src={user?.profileImageUrl ?? "/static/images/avatar/2.jpg"}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settingsMenuOptions.map(
          (setting, key) =>
            shouldShowMenuOption(setting.name) && (
              <MenuItem
                key={key}
                onClick={() => {
                  handleCloseUserMenu();
                  if (
                    setting.name.toLowerCase() !== "login" &&
                    setting.name.toLowerCase() !== "logout"
                  )
                    window.location.href =
                      "/" + setting.name.toLowerCase().replaceAll(" ", "-");
                  if (setting.name.toLowerCase() === "logout")
                    UserFunctions.RemoveUser();
                  if (setting.name.toLocaleLowerCase() === "login")
                    setIsLoginDialogOpen(true);
                }}
              >
                {setting.name.toLowerCase() !== "login" &&
                  setting.name.toLowerCase() !== "logout" && (
                    <a
                      href={
                        "/" + setting.name.toLowerCase().replaceAll(" ", "-")
                      }
                      title={setting.name}
                    />
                  )}
                <ListItemIcon>
                  <setting.icon />
                </ListItemIcon>
                <Typography textAlign="center">{setting.name}</Typography>
              </MenuItem>
            )
        )}
      </Menu>
      <LoginDialog
        isOpen={isLoginDialogOpen}
        handleClose={setIsLoginDialogOpen}
      />
    </Box>
  );
}
