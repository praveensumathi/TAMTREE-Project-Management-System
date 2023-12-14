export type ProjectDetail = {
  _id: string;
  projectName: string;
  description: string;
  duration: string;
  startDate: Date;
  endDate: Date;
  stories: ProjectStory[];
};

export type ProjectStory = {
  _id: string;
  title: string;
  description: string;
  tasks: ProjectTask[];
};

export type ProjectTask = {
  _id?: string;
  title: string;
  description: string;
  duration: string;
  status?: number;
  story?: string;
  assignedTo?: AssignedTo;
};

export type AssignedTo = {
  _id: string;
  name: string;
};
