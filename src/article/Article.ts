export interface Article {
  id: string | null;
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
}
