import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { NavigationMenuDesktop } from "./NavigationMenuDesktop";
import { NavigationMenuMobile } from "./NavigationMenuMobile";
import { BrandMobile } from "./BrandMobile";
import { BrandDesktop } from "./BrandDesktop";
import { SettingsMenu } from "./SettingsMenu";

function TopBar() {
  const [anchorElNav, setAnchorElNav] = useState<any>(null);

  const handleOpenNavMenu = (event: any) => setAnchorElNav(event.currentTarget);

  return (
    <AppBar position="static">
      <Toolbar id="back-to-top-anchor" >
        <BrandDesktop />
        <NavigationMenuMobile
          handleOpenNavMenu={handleOpenNavMenu}
          handleCloseNavMenu={() => setAnchorElNav(false)}
          anchorElNav={anchorElNav}
        />
        <BrandMobile />
        <NavigationMenuDesktop setNavigationMenu={setAnchorElNav} />
        <SettingsMenu />
      </Toolbar>
      {process.env.REACT_APP_SECRET_NAME !== "production" ? (
        <div style={{ textAlign: "center", fontSize: 20 }}>
          {process.env.REACT_APP_SECRET_NAME} mode{" "}
        </div>
      ) : (
        ""
      )}
    </AppBar>
  );
}

export default TopBar;
