export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  photo: string;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(user: Partial<User>) {
    this.id = user?.id;
    this.name = user?.name;
    this.email = user?.email;
    this.password = user?.password;
    this.photo = user?.photo;
    this.is_active = user?.is_active;
    this.createdAt = user?.createdAt;
    this.updatedAt = user?.updatedAt;
    this.deletedAt = user?.deletedAt;
  }
}
