import Button from "@mui/material/Button";
import { useState } from "react";
import LoginDialog from "./LoginDialog";

function OpenLoginDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button>
      <LoginDialog isOpen={open} handleClose={setOpen} />
    </div>
  );
}

export default OpenLoginDialog;
