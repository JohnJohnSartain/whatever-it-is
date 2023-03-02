import Typography from "@mui/material/Typography";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import applicationInformation from "../../package.json";

export function BrandMobile() {
  return (
    <>
      <LocalLibraryIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: "0",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {applicationInformation.displayName.toUpperCase()}
      </Typography>
    </>
  );
}
