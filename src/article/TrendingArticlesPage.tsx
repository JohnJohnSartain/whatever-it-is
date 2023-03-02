import { useEffect } from "react";
import ArticleList from "./ArticleList";
import Grid from "@mui/material/Grid/Grid";
import TagList from "./TagList";

function TrendingArticlesPage() {
  useEffect(() => {
    document.title = "Trending";
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={8} lg={7}>
        <ArticleList
          creatorId={null}
          tag={null}
          isEditMode={false}
          quantity={20}
          sortByMostViewed={false}
          sortByMostPopular={true}
          showCreatorDetails={true}
          articlePageMode={false}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={5}>
        <TagList />
      </Grid>
    </Grid>
  );
}

export default TrendingArticlesPage;
