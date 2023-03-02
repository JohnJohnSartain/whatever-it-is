import {
  Avatar,
  Chip,
  Container,
  Hidden,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid/Grid";
import { ArticlePublic } from "./ArticlePublic";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import { useNavigate } from "react-router";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import RichTextViewer from "./RichTextViewer";
import { useEffect, useRef, useState } from "react";
import UserFunctions from "../user/UserFunctions";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { ArticleReaction } from "./ArticleReaction";
import LoginDialog from "../user/LoginDialog";

interface ArticleView {
  article: ArticlePublic;
  articlePageMode: boolean;
  listMode: boolean;
  isEditMode: boolean;
  showCreatorDetails: boolean;
  failedToLoad: string | null;
}

function ArticleView({
  article,
  articlePageMode,
  listMode,
  isEditMode,
  failedToLoad,
  showCreatorDetails,
}: ArticleView) {
  const navigate = useNavigate();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const articleReactionInitial: ArticleReaction = {
    id: null,
    articleId: article.id,
    createdBy: UserFunctions.getUser()?.id ?? null,
    modifiedBy: UserFunctions.getUser()?.id ?? null,
    created: new Date(),
    modified: new Date(),
    isLiked: article.isLiked ?? false,
    isDisliked: article.isDisliked ?? false,
  };

  const [articleReaction, setArticleReaction] = useState<ArticleReaction>(
    articleReactionInitial
  );

  useEffect(() => {
    if (articlePageMode && article.id !== undefined) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${UserFunctions.getUserToken()}`,
        },
      };

      fetch(
        process.env.REACT_APP_WHATEVER_IT_IS_API_CONNECTION_STRING +
          "/content/blog/article/view/" +
          article.id,
        requestOptions
      )
        .then((response) => {
          if (!response.ok) throw Error();

          return response.json();
        })
        .then((json) => {})
        .catch((error) => {});
    }
  }, [article.id]);

  const goToTag = (tag: string) => navigate("/article?tag=" + tag);

  const goToArticle = (articleId: string) =>
    navigate((isEditMode ? "/write/" : "/article/") + articleId);

  const handleLiked = () => {
    if (UserFunctions.getUser() === null) setIsLoginDialogOpen(true);

    article.likes = articleReaction.isLiked
      ? article.likes - 1
      : article.likes + 1;
    setArticleReaction({
      ...articleReaction,
      isLiked: !articleReaction.isLiked,
      isDisliked: articleReaction.isDisliked
        ? false
        : articleReaction.isDisliked,
    });
  };

  const handleDislike = () => {
    if (UserFunctions.getUser() === null) setIsLoginDialogOpen(true);

    article.dislikes = articleReaction.isDisliked
      ? article.dislikes - 1
      : article.dislikes + 1;
    setArticleReaction({
      ...articleReaction,
      isDisliked: !articleReaction.isDisliked,
      isLiked: articleReaction.isLiked ? false : articleReaction.isLiked,
    });
  };

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      updateReaction();
    } else {
      isMounted.current = true;
    }
  }, [articleReaction]);

  function updateReaction() {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${UserFunctions.getUserToken()}`,
      },
      body: JSON.stringify(articleReaction),
    };

    fetch(
      process.env.REACT_APP_WHATEVER_IT_IS_API_CONNECTION_STRING +
        "/content/blog/article/reaction",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) throw Error();
      })
      .catch((error) => {});
  }

  return (
    <Container maxWidth="md">
      {failedToLoad !== null && failedToLoad.length > 0 ? (
        <Typography variant="h3" align="center">
          {failedToLoad}
        </Typography>
      ) : (
        <Grid container>
          <Grid item xs={9}>
            <Stack direction="column" spacing={0}>
              {showCreatorDetails && (
                <Stack direction="row" spacing={1}>
                  <Avatar
                    alt={article.creatorName}
                    src={article.creatorProfileImageUrl ?? ""}
                    sx={{ width: 20, height: 20 }}
                  />
                  <Typography variant="body2">{article.creatorName}</Typography>
                  <Typography variant="body2">
                    {new Date(article.modified).toLocaleDateString()}
                  </Typography>
                </Stack>
              )}
              <Stack direction="column" spacing={1}>
                <a
                  href={"/article/" + article.id}
                  title={article.name ?? "No Article Title"}
                />
                <Typography
                  variant="body1"
                  fontWeight={"bold"}
                  onClick={() => goToArticle(article.id)}
                >
                  {article.name}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <IconButton aria-label="Views" disabled size="small">
                  {article.views}
                  <RemoveRedEyeIcon style={{ marginLeft: 8 }} />
                </IconButton>
                <IconButton aria-label="Approval Rating" disabled size="small">
                  {(article.approvalRating ?? 0) + "%"}
                  <ThumbsUpDownIcon style={{ marginLeft: 8 }} />
                </IconButton>
                {articlePageMode && (
                  <>
                    <IconButton
                      aria-label="Like"
                      size="small"
                      onClick={handleLiked}
                    >
                      {article.likes}
                      {articleReaction.isLiked ? (
                        <ThumbUpIcon style={{ marginLeft: 8 }} />
                      ) : (
                        <ThumbUpOffAltIcon style={{ marginLeft: 8 }} />
                      )}
                    </IconButton>
                    <IconButton
                      aria-label="Dislike"
                      size="small"
                      onClick={handleDislike}
                    >
                      {article.dislikes}
                      {articleReaction.isDisliked ? (
                        <ThumbDownIcon style={{ marginLeft: 8 }} />
                      ) : (
                        <ThumbDownOffAltIcon style={{ marginLeft: 8 }} />
                      )}
                    </IconButton>
                  </>
                )}
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <img
              onClick={() => goToArticle(article.id)}
              src={article.imageUrlThumbnail ?? ""}
              alt={article.name ?? "no image found"}
              style={{
                width: "100px",
                height: "100px",
                display: "block",
                marginLeft: "auto",
              }}
              loading="lazy"
            />
          </Grid>
          <Grid xs={12}>
            <Hidden mdDown={true}>
              <Typography
                variant="subtitle1"
                gutterBottom
                onClick={() => goToArticle(article.id)}
              >
                {article.description}
              </Typography>
            </Hidden>
          </Grid>
          <Grid xs={12}>
            <Typography variant="body1" color="text.primary" gutterBottom>
              {articlePageMode &&
                article.tags?.map((tag, key) => (
                  <>
                    <Chip
                      label={tag}
                      key={key}
                      style={{
                        marginLeft: 2,
                        marginRight: 2,
                        marginBottom: 4,
                      }}
                      onClick={() => goToTag(tag)}
                    />
                    <a
                      href={"/article?tag=" + (tag ?? "No Tag Name")}
                      title={tag ?? "No tag name"}
                    />
                  </>
                ))}
            </Typography>
          </Grid>
          {articlePageMode && (
            <Grid xs={12}>
              <RichTextViewer content={article.content} />
            </Grid>
          )}
        </Grid>
      )}
      <LoginDialog
        isOpen={isLoginDialogOpen}
        handleClose={setIsLoginDialogOpen}
      />
    </Container>
  );
}

export default ArticleView;
