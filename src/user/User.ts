export interface User {
  id: string| null;
  created: Date | null;
  createdBy: string | null;
  modified: Date | null;
  modifiedBy: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  email: string | null;
  password: string | null;
  roles?: string[] | null;
  issuer: string | null;
  website: string | null;
  isDeleted: boolean | null;
}
