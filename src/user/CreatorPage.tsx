import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import UserFunctions from "./UserFunctions";
import { UserPublic } from "./UserPublic";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile";

function CreatorPage() {
  let { id } = useParams();

  const [isLoadedUser, setIsLoadedUser] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isLoadErrorUser, setIsLoadErrorUser] = useState(false);
  const [loadCreatorError, setLoadCreatorError] = useState<string | null>(null);

  const dummyData: UserPublic = {
    id: "",
    createdBy: UserFunctions.getUser()?.id ?? "",
    modifiedBy: UserFunctions.getUser()?.id ?? "",
    created: new Date(),
    modified: new Date(),
    name: "",
    profileImageUrl: "",
    website: "",
    isDeleted: false,
  };

  const [user, setUser] = useState<UserPublic>(dummyData);

  useEffect(() => {
    document.title = "Creator";

    fetchUsers();
  }, []);

  function fetchUsers() {
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
        "/content/blog/creator/" +
        id,
      requestOptions
    )
      .then((response) => {
        if (!response.ok)
          return response.text().then((text) => {
            throw new Error(text);
          });

        setIsLoadingUser(false);
        setIsLoadErrorUser(false);
        setIsLoadedUser(true);
        return response.json();
      })
      .then((json) => {
        setUser(json);
        document.title = json.name;
      })
      .catch((error) => {
        error.toString().includes("ArgumentException")
          ? setLoadCreatorError("Creator does not exist")
          : setLoadCreatorError("An unexpected error occured");

        setIsLoadingUser(false);
        setIsLoadedUser(false);
        setIsLoadErrorUser(true);
      });
  }

  return (
    <>
      {isLoadedUser && !isLoadErrorUser && user.id.length !== 0 ? (
        <UserProfile user={user} isEditMode={false} />
      ) : loadCreatorError ? (
        <>{loadCreatorError}</>
      ) : (
        "An unexpected error occured"
      )}
    </>
  );
}

export default CreatorPage;
