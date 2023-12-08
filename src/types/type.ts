export type Project = {
  title: string;
  description: string;
  _id: string;
};

export type Id = string | number;

export type Column = {
    id:Id;
    title:string;   
}

export type Task = {
    id: Id;
    columnId: Id;
    title: string;
    description: string;
  };
