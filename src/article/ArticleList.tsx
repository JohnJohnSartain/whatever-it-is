import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import UserFunctions from "../user/UserFunctions";
import ArticleView from "./ArticleView";
import Grid from "@mui/material/Unstable_Grid2";
import { ArticlePublic } from "./ArticlePublic";
import { Divider, Skeleton, Stack, Typography } from "@mui/material";

interface ArticleList {
  creatorId: string | null;
  tag: string | null;
  isEditMode: boolean;
  quantity: number | null;
  sortByMostViewed: boolean | null;
  sortByMostPopular: boolean | null;
  showCreatorDetails: boolean;
  articlePageMode: boolean;
}

function ArticleList({
  creatorId,
  tag,
  isEditMode,
  quantity,
  sortByMostViewed,
  sortByMostPopular,
  showCreatorDetails,
  articlePageMode,
}: ArticleList) {
  const [isLoadedArticles, setIsLoadedArticles] = useState(false);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);
  const [isLoadErrorArticles, setIsLoadErrorArticles] = useState(false);

  const [articles, setArticles] = useState<ArticlePublic[]>([]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    fetchArticles();
  }, [creatorId, tag]);

  function fetchArticles() {
    const searchParams = new URLSearchParams();
    if (creatorId) searchParams.append("creatorId", creatorId);
    if (tag) searchParams.append("tag", tag);
    if (sortByMostViewed)
      searchParams.append("sortByMostViewed", sortByMostViewed.toString());
    if (sortByMostPopular)
      searchParams.append("sortByMostPopular", sortByMostPopular.toString());
    if (quantity) searchParams.append("quantity", quantity.toString());

    setIsLoadingArticles(true);

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${UserFunctions.getUserToken()}`,
      },
    };

    fetch(
      process.env.REACT_APP_WHATEVER_IT_IS_API_CONNECTION_STRING +
        "/content/blog/article/public?" +
        searchParams.toString(),
      requestOptions
    )
      .then((response) => {
        if (!response.ok) throw Error();
        setIsLoadingArticles(false);
        setIsLoadErrorArticles(false);
        setIsLoadedArticles(true);
        return response.json();
      })
      .then((json) => {
        setArticles(json);
      })
      .catch((error) => {
        setIsLoadingArticles(false);
        setIsLoadedArticles(false);
        setIsLoadErrorArticles(true);
      });
  }

  return (
    <>
      {isLoadingArticles ? (
        <>
          {[...Array(10)].map((x, index) => (
            <Grid container spacing={2}>
              <Grid xs={9}>
                <Stack spacing={1} direction="row">
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rounded" width="100%" height={32} />
                </Stack>
                <br />
                <Skeleton variant="rounded" width="100%" height={30} />
                <br />
                <Skeleton variant="rounded" width="100%" height={20} />
                <br />
              </Grid>
              <Grid xs={3}>
                <Skeleton variant="rectangular" width={118} height={118} />
              </Grid>
            </Grid>
          ))}
        </>
      ) : isLoadErrorArticles ? (
        <Typography color="red">Unable to load articles</Typography>
      ) : articles && articles.length === 0 ? (
        <Typography color="red">No articles exist yet</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {articles.map((article: ArticlePublic, key: number) => (
              <Grid xs={12}>
                <ArticleView
                  article={article}
                  articlePageMode={articlePageMode}
                  listMode={true}
                  isEditMode={isEditMode}
                  failedToLoad={null}
                  showCreatorDetails={showCreatorDetails}
                />
                <Divider />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}
export default ArticleList;
