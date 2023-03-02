import { Grid, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import UserFunctions from "../user/UserFunctions";
import UserCard from "./UserCard";
import { UserPublic } from "./UserPublic";

function CreatorsPage() {
  const [isLoadedUsers, setIsLoadedUsers] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadErrorUsers, setIsLoadErrorUsers] = useState(false);

  const dummyData: UserPublic[] = [
    {
      id: "",
      createdBy: UserFunctions.getUser()?.id ?? "",
      modifiedBy: UserFunctions.getUser()?.id ?? "",
      created: new Date(),
      modified: new Date(),
      name: "",
      profileImageUrl: "",
      website: "",
      isDeleted: false,
    },
  ];

  const [users, setUser] = useState<UserPublic[]>(dummyData);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    document.title = "Creators";

    fetchUsers();
  }, []);

  function fetchUsers() {
    setIsLoadingUsers(true);

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${UserFunctions.getUserToken()}`,
      },
    };

    fetch(
      process.env.REACT_APP_WHATEVER_IT_IS_API_CONNECTION_STRING +
        "/content/blog/creator/",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) throw Error();
        setIsLoadingUsers(false);
        setIsLoadErrorUsers(false);
        setIsLoadedUsers(true);
        return response.json();
      })
      .then((json) => {
        setUser(json);
      })
      .catch((error) => {
        setIsLoadingUsers(false);
        setIsLoadedUsers(false);
        setIsLoadErrorUsers(true);
      });
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3" align="center">
          Creators
        </Typography>
      </Grid>
      {users.map((user, key) => (
        <Grid item xs={12} sm={6} md={4} key={key}>
          <UserCard user={user} />
        </Grid>
      ))}
    </Grid>
  );
}

export default CreatorsPage;
