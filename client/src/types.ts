export interface Country {
  _id?: string;
  name: string;
  flag?: string;
  population?: number;
  region?: string;
}

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  // email: string;
  phone?: string;
  profilePicture?: string;
  // password: string;
  isAdmin?: boolean;
  permissions?: {
    canAdd?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    [key: string]: boolean | undefined;
  };
  createdAt?: string;
  updatedAt?: string;
}
