export interface UserPublic {
  id: string;
  created: Date;
  createdBy: string;
  modified: Date;
  modifiedBy: string;
  name: string | null;
  profileImageUrl: string | null;
  roles?: string[] | null;
  website: string | null;
  isDeleted: boolean | null;
}
