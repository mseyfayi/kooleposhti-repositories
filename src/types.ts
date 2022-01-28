export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Category {
  id: string;
  title: string;
  tags: Array<Tag>;
}
