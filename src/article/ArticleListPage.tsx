import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ArticleList from "./ArticleList";

function ArticleListPage() {
  useEffect(() => {
    document.title = "Articles";
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <ArticleList
        articlePageMode={false}
        creatorId={searchParams.get("creatorId") ?? null}
        tag={searchParams.get("tag") ?? null}
        isEditMode={false}
        quantity={null}
        sortByMostViewed={false}
        sortByMostPopular={true}
        showCreatorDetails={false}
      />
    </div>
  );
}

export default ArticleListPage;
