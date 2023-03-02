import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import UserFunctions from "../user/UserFunctions";
import { Chip, Skeleton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function TagList() {
  const [isLoadedArticleTags, setIsLoadedArticleTags] = useState(false);
  const [isLoadingArticleTags, setIsLoadingArticleTags] = useState(false);
  const [isLoadErrorArticleTags, setIsLoadErrorArticleTags] = useState(false);

  const [articleTags, setArticleTags] = useState<string[]>([]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    fetchArticles();
  }, []);

  function fetchArticles() {
    const searchParams = new URLSearchParams();

    setIsLoadingArticleTags(true);

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${UserFunctions.getUserToken()}`,
      },
    };

    fetch(
      process.env.REACT_APP_WHATEVER_IT_IS_API_CONNECTION_STRING +
        "/content/blog/article/tag?" +
        searchParams.toString(),
      requestOptions
    )
      .then((response) => {
        if (!response.ok) throw Error();
        setIsLoadingArticleTags(false);
        setIsLoadErrorArticleTags(false);
        setIsLoadedArticleTags(true);
        return response.json();
      })
      .then((json) =>
        setArticleTags(
          json.filter(
            (thing: any, i: any, arr: any) =>
              arr.findIndex((t: any) => t === thing) === i
          )
        )
      )
      .catch((error) => {
        setIsLoadingArticleTags(false);
        setIsLoadedArticleTags(false);
        setIsLoadErrorArticleTags(true);
      });
  }

  const navigate = useNavigate();

  const goToTag = (tag: string) => navigate("/article?tag=" + tag);

  return (
    <>
      {isLoadingArticleTags ? (
        <>
          {[...Array(10)].map((x, index) => (
            <>
              <Stack spacing={1} direction="row">
                {[...Array(8)].map((x, index) => (
                  <Skeleton variant="rounded" width={60} height={32} />
                ))}
              </Stack>
              <br />
            </>
          ))}
        </>
      ) : isLoadErrorArticleTags ? (
        <Typography color="red">Unable to load tags</Typography>
      ) : articleTags && articleTags.length === 0 ? (
        <Typography color="red">No tags exist yet</Typography>
      ) : (
        <>
          {articleTags
            .filter((n, i) => articleTags.indexOf(n) === i)
            .map((tag, key) => (
              <>
                <Chip
                  label={tag}
                  key={key}
                  style={{ marginLeft: 2, marginRight: 2, marginBottom: 4 }}
                  onClick={() => goToTag(tag)}
                />
                <a
                  href={"/article?tag=" + (tag ?? "No Tag Name")}
                  title={tag ?? "No tag name"}
                />
              </>
            ))}
        </>
      )}
    </>
  );
}

export default TagList;
