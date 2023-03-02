import { useEffect, useState } from "react";
import { ArticlePublic } from "../article/ArticlePublic";
import UserFunctions from "../user/UserFunctions";

function ArchivePage() {
  const [isLoadedArticles, setIsLoadedArticles] = useState(false);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);
  const [isLoadErrorArticles, setIsLoadErrorArticles] = useState(false);

  const [articles, setArticles] = useState<ArticlePublic[]>([]);

  useEffect(() => {
    document.title = "Our Story";

    fetchArticles();
  }, []);

  function fetchArticles() {
    const searchParams = new URLSearchParams();

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
        "/content/blog/article/public" +
        searchParams.toString(),
      requestOptions
    )
      .then((response) => {
        if (!response.ok) throw Error();
        setIsLoadedArticles(true);
        setIsLoadErrorArticles(false);
        setIsLoadingArticles(false);

        return response.json();
      })
      .then((json) => setArticles(json))
      .catch((error) => {
        setIsLoadingArticles(false);
        setIsLoadedArticles(false);
        setIsLoadErrorArticles(true);
      });
  }

  return (
    <div>
      {articles.map((article, key) => (
        <div>
          <a
            href={"/article/" + article.id}
            title={article.name ?? "No Name Given"}
            key={key}
          >
            {article.name} by {article.creatorName}
          </a>
          <br />
          {article.description !== null
            ? article.description
            : "No description given"}
        </div>
      ))}
    </div>
  );
}

export default ArchivePage;
