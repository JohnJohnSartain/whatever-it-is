import { Avatar, Grid, Stack, Typography } from "@mui/material";
import { UserPublic } from "./UserPublic";
import ArticleList from "../article/ArticleList";

interface UserProfile {
  user: UserPublic;
  isEditMode: boolean;
}

function UserProfile({ user, isEditMode }: UserProfile) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Avatar
            alt={user?.name ?? ""}
            sx={{ height: "100px", width: "100px" }}
            src={user?.profileImageUrl ?? "/static/images/avatar/2.jpg"}
          />
          <Typography variant="h3">{user.name}</Typography>
          <Typography>
            Since: {new Date(user.created).toLocaleDateString()}
          </Typography>
          {user.website && (
            <a
              href={user.website ?? "No website yet"}
              title="creator's Website"
            >
              {user.website}
            </a>
          )}
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <ArticleList
          creatorId={user.id}
          tag={null}
          quantity={null}
          sortByMostViewed={false}
          sortByMostPopular={true}
          articlePageMode={false}
          isEditMode={isEditMode}
          showCreatorDetails={false}
        />
      </Grid>
    </Grid>
  );
}

export default UserProfile;
