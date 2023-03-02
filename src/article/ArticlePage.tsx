import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import UserFunctions from "../user/UserFunctions";
import { ArticlePublic } from "./ArticlePublic";
import ArticleView from "./ArticleView";

const dummyData: ArticlePublic = {
  id: "",
  createdBy: UserFunctions.getUser()?.id ?? null,
  modifiedBy: UserFunctions.getUser()?.id ?? null,
  created: new Date(),
  modified: new Date(),
  name: "",
  description: "",
  content: "",
  tags: [],
  imageUrlHeader: "",
  imageUrlThumbnail: "",
  isDeleted: false,
  likes: 0,
  dislikes: 0,
  isLiked: null,
  isDisliked: null,
  approvalRating: 100,
  creatorName: "",
  creatorProfileImageUrl: "",
  views: 0,
};

function ArticlePage() {
  const [isLoadedArticle, setIsLoadedArticle] = useState(false);
  const [isLoadingArticle, setIsLoadingArticle] = useState(false);
  const [isLoadErrorArticle, setIsLoadErrorArticle] = useState(false);
  const [LoadArticleError, setLoadArticleError] = useState<string | null>(null);

  const [article, setArticle] = useState<ArticlePublic>(dummyData);

  const [searchParams, setSearchParams] = useSearchParams();
  let { id } = useParams();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    fetchArticle();
  }, []);

  useEffect(() => {
    document.title = article.name ?? "Article";
  }, [article]);

  function fetchArticle() {
    setIsLoadingArticle(true);

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${UserFunctions.getUserToken()}`,
      },
    };

    fetch(
      process.env.REACT_APP_WHATEVER_IT_IS_API_CONNECTION_STRING +
        "/content/blog/article/public/" +
        id,
      requestOptions
    )
      .then((response) => {
        if (!response.ok)
          return response.text().then((text) => {
            throw new Error(text);
          });

        setIsLoadingArticle(false);
        setIsLoadErrorArticle(false);
        setIsLoadedArticle(true);
        return response.json();
      })
      .then((json) => {
        setArticle(json);
      })
      .catch((error) => {
        error.toString().includes("KeyNotFoundException")
          ? setLoadArticleError("Article does not exist")
          : setLoadArticleError("An unexpected error occured");
        setIsLoadingArticle(false);
        setIsLoadedArticle(false);
        setIsLoadErrorArticle(true);
      });
  }

  return (
    <div>
      {isLoadedArticle && !isLoadErrorArticle && article.id && (
        <ArticleView
          article={article}
          articlePageMode={true}
          listMode={false}
          isEditMode={false}
          failedToLoad={LoadArticleError}
          showCreatorDetails={true}
        />
      )}
    </div>
  );
}

export default ArticlePage;
