import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import UserFunctions from "../user/UserFunctions";
import UserProfile from "./UserProfile";
import { UserPublic } from "./UserPublic";

function AccountPage() {
  const [isLoadedUser, setIsLoadedUser] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isLoadErrorUser, setIsLoadErrorUser] = useState(false);

  const [user, setUser] = useState<UserPublic | null>(null);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    document.title = "Account";

    if (UserFunctions.getUser()) fetchUser();
  }, []);

  function fetchUser() {
    setIsLoadingUser(true);

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${UserFunctions.getUserToken()}`,
      },
    };

    fetch(
      process.env.REACT_APP_WHATEVER_IT_IS_API_CONNECTION_STRING +
        "/account/user/" +
        UserFunctions.getUser()?.id,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) throw Error();
        setIsLoadingUser(false);
        setIsLoadErrorUser(false);
        setIsLoadedUser(true);
        return response.json();
      })
      .then((json) => {
        setUser(json);
      })
      .catch((error) => {
        setIsLoadingUser(false);
        setIsLoadedUser(false);
        setIsLoadErrorUser(true);
      });
  }

  return (
    <Grid>
      {user ? (
        <UserProfile user={user} isEditMode={true} />
      ) : (
        "You must be logged in to see your data"
      )}
    </Grid>
  );
}

export default AccountPage;
