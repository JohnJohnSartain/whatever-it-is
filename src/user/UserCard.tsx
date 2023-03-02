import {
  Avatar,
  Card,
  CardHeader,
  Typography,
  CardActions,
  CardContent,
} from "@mui/material";
import { UserPublic } from "./UserPublic";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";

interface UserCard {
  user: UserPublic;
}

function UserCard({ user }: UserCard) {
  const navigate = useNavigate();

  const goToCreator = (id: string) => navigate("/creator/" + id);

  return (
    <Card>
      <CardHeader
        onClick={() => goToCreator(user.id)}
        avatar={
          <Avatar
            aria-label="profile photo"
            src={user?.profileImageUrl ?? "/static/images/avatar/2.jpg"}
          >
            {user.name?.substring(0, 1)}
          </Avatar>
        }
        title={user.name}
        subheader={"Since: " + new Date(user.created).toLocaleDateString()}
      />
      <CardContent onClick={() => goToCreator(user.id)}>
        <Typography variant="body2" color="text.secondary">
          {user.website && (
            <>
              <a href={user.website} title="User\'s website">
                {user.website}
              </a>
              <br />
            </>
          )}
          Top rated articles comming soon:
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Favorite this creator">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon onClick={() => goToCreator(user.id)} />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default UserCard;
