import { Typography } from "@mui/material";
import { useEffect } from "react";

function NotFoundPage() {
  useEffect(() => {
    document.title = "Page Not Found";
  }, []);

  return (
    <>
      <Typography variant="h1" align="center">
        This page was not found
      </Typography>
      <br />
      <Typography variant="h3" align="center">
        <a href="/" title="Home Page">
          Home
        </a>
      </Typography>
      <br />
      <Typography variant="h3" align="center">
        <a href="/archive" title="Article Archives">
          Article Archives
        </a>
      </Typography>
    </>
  );
}

export default NotFoundPage;
