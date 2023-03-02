import TrendingArticlesPage from "./article/TrendingArticlesPage";
import ArticlePage from "./article/ArticlePage";
import WritePage from "./article/WritePage";
import GoogleAuthenticationPolicyPage from "./privacy/GoogleAuthenticationPolicyPage";
import PrivacyPolicy from "./privacy/PrivacyPolicyPage";
import OurStoryPage from "./story/OurStoryPage";
import CreatorsPage from "./user/CreatorsPage";
import AccountPage from "./user/AccountPage";
import NotFoundPage from "./error/NotFoundPage";
import ArticleListPage from "./article/ArticleListPage";
import ArchivePage from "./story/ArchivePage";
import CreatorPage from "./user/CreatorPage";

const RouteDefinitions: {
  path: string;
  content: () => JSX.Element;
}[] = [
  {
    path: "/",
    content: TrendingArticlesPage,
  },
  {
    path: "/home",
    content: TrendingArticlesPage,
  },
  {
    path: "/trending",
    content: TrendingArticlesPage,
  },
  {
    path: "/article",
    content: ArticleListPage,
  },
  {
    path: "/article/:id",
    content: ArticlePage,
  },
  {
    path: "/creators",
    content: CreatorsPage,
  },
  {
    path: "/creator/:id",
    content: CreatorPage,
  },
  {
    path: "/our-story",
    content: OurStoryPage,
  },
  {
    path: "/write",
    content: WritePage,
  },
  {
    path: "/write/:id",
    content: WritePage,
  },
  {
    path: "/account",
    content: AccountPage,
  },
  {
    path: "/privacy-policy",
    content: PrivacyPolicy,
  },
  {
    path: "/google-authentication",
    content: GoogleAuthenticationPolicyPage,
  },
  {
    path: "/archive",
    content: ArchivePage,
  },
  {
    path: "*",
    content: NotFoundPage,
  },
];

export default RouteDefinitions;
