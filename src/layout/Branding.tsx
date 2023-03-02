import Typography from "@mui/material/Typography";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import applicationInformation from "../../package.json";

interface Branding {
  display: any;
  variant: any;
  flexGrow: any;
}

export function Branding({ display, variant, flexGrow }: Branding) {
  return (
    <>
      <LocalLibraryIcon sx={{ display: display, mr: 1 }} />
      <Typography
        variant={variant}
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: display,
          flexGrow: flexGrow,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {applicationInformation.displayName.toUpperCase()}
      </Typography>
    </>
  );
}
