import Container from "@mui/material/Container";
import { ReactNode } from "react";
import ScrollTop from "./ScrollTop";
import TopBar from "./TopBar";

interface Props {
  children?: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div>
      <TopBar />
      <Container sx={{ my: 2 }}>{children}</Container>
      <ScrollTop />
    </div>
  );
}

export default Layout;
