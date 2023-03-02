export interface ArticlePublic {
  id: string;
  created: Date;
  createdBy: string | null;
  modified: Date;
  modifiedBy: string | null;
  name: string | null;
  description: string | null;
  content: string | null;
  tags?: string[] | null;
  imageUrlHeader: string | null;
  imageUrlThumbnail?: string | null;
  isDeleted: boolean | null;
  likes: number;
  dislikes: number;
  approvalRating: number | null;
  creatorName: string;
  creatorProfileImageUrl: string | null;
  views: number | null;
  isLiked: boolean| null;
  isDisliked: boolean| null;
}
