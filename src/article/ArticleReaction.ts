export interface ArticleReaction {
  id: string | null;
  created: Date;
  createdBy: string | null;
  modified: Date;
  modifiedBy: string | null;
  articleId: string | null;
  isLiked: boolean | null;
  isDisliked: boolean | null;
}
