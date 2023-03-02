import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { GoogleLogin } from "@react-oauth/google";
import UserFunctions from "./UserFunctions";
import { UserPublic } from "./UserPublic";

interface LoginDialog {
  isOpen: boolean;
  handleClose(arg: boolean): void;
}

function LoginDialog({ isOpen, handleClose }: LoginDialog) {
  const responseMessage = (response: any) => {
    requestUserToken(response.credential);
  };

  function requestUserToken(googleToken: string) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: googleToken }),
    };

    fetch(
      process.env.REACT_APP_WHATEVER_IT_IS_API_CONNECTION_STRING +
        "/account/user/token",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) throw Error();
        return response.text();
      })
      .then((text) => {
        UserFunctions.setUserToken(text);
        requestUserData(text)
      })
      .catch((error) => {
      });
  }

  function requestUserData(googleToken: string) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${UserFunctions.getUserToken()}`,
      },
    };

    fetch(
      process.env.REACT_APP_WHATEVER_IT_IS_API_CONNECTION_STRING +
        "/account/user/me",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) throw Error();
        return response.json();
      })
      .then((json: UserPublic) => {
        handleClose(false);
        UserFunctions.setUserData(json);
      })
      .catch((error) => {
      });
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => handleClose(false)}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" align="center">
        {"Welcome"}
      </DialogTitle>
      <DialogContent>
        <GoogleLogin
          size="large"
          shape="pill"
          onSuccess={responseMessage}
          onError={() => {
          }}
        />
        <br />
        Other sign in options coming soon
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
