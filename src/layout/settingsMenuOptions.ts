import FaceIcon from "@mui/icons-material/Face";
import PolicyIcon from "@mui/icons-material/Policy";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

export const settingsMenuOptions: { name: string; icon: any }[] = [
  { name: "Login", icon: LoginIcon },
  { name: "Account", icon: FaceIcon },
  { name: "Privacy Policy", icon: PolicyIcon },
  { name: "Google Authentication", icon: InfoIcon },
  { name: "Logout", icon: LogoutIcon },
];
