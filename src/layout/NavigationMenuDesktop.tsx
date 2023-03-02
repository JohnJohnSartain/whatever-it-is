import { ListItemIcon, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import UserFunctions from "../user/UserFunctions";
import pageNavigationOptions from "./pageNavigationOptions";

interface NavigationMenuDesktop {
  setNavigationMenu(arg: boolean): void;
}

export function NavigationMenuDesktop({
  setNavigationMenu,
}: NavigationMenuDesktop) {
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pageNavigationOptions.map((page, key) => {
          var userIsAdministrator: boolean = UserFunctions.isAdministrator();

          var shouldShowPage =
            (page.name.toLowerCase().includes("administration") &&
              userIsAdministrator) ||
            !page.name.toLowerCase().includes("administration");

          return (
            shouldShowPage && (
              <Button
                key={key}
                onClick={() => setNavigationMenu(false)}
                href={"/" + page.name.toLowerCase().replaceAll(" ", "-")}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <page.icon />
                  <Typography
                    noWrap
                    component="a"
                    sx={{
                      mx: 1,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".1rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {page.name}
                  </Typography>
                </ListItemIcon>
              </Button>
            )
          );
        })}
      </Box>
    </>
  );
}
