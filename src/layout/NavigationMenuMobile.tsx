import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UserFunctions from "../user/UserFunctions";
import pageNavigationOptions from "./pageNavigationOptions";
import ListItemIcon from "@mui/material/ListItemIcon";

interface NavigationMenuMobile {
  handleOpenNavMenu: any;
  handleCloseNavMenu: any;
  anchorElNav: any;
}

export function NavigationMenuMobile({
  handleOpenNavMenu,
  handleCloseNavMenu,
  anchorElNav,
}: NavigationMenuMobile) {
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pageNavigationOptions.map((page, key) => {
            var userIsAdministrator: boolean = UserFunctions.isAdministrator();

            var shouldShowPage =
              (page.name.toLowerCase().includes("administration") &&
                userIsAdministrator) ||
              !page.name.toLowerCase().includes("administration");

            return (
              shouldShowPage && (
                <MenuItem
                  key={key}
                  onClick={() => {
                    handleCloseNavMenu();
                    window.location.href =
                      "/" + page.name.toLowerCase().replaceAll(" ", "-");
                  }}
                >
                  <a
                    href={"/" + page.name.toLowerCase().replaceAll(" ", "-")}
                    title={page.name}
                  />
                  <ListItemIcon>
                    <page.icon />
                  </ListItemIcon>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              )
            );
          })}
        </Menu>
      </Box>
    </>
  );
}
