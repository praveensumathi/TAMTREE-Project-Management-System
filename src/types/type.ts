export type Project = {
  _id?: string;
  title: string;
  description: string;
  assignedTo: string;
  status: string;
  stories: Storie[];
};

export type Storie = {
  _id?: string;
  name: string;
  description: string;
};
