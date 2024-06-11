export class Emblem {
  id: number;
  name: string;
  slug: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(emblem: Partial<Emblem>) {
    this.id = emblem?.id;
    this.name = emblem?.name;
    this.slug = emblem?.slug;
    this.image = emblem?.image;
    this.createdAt = emblem?.createdAt;
    this.updatedAt = emblem?.updatedAt;
    this.deletedAt = emblem?.deletedAt;
  }
}
