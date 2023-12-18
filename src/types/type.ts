export type Project = {
  _id: string;
  projectName: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  duration: string;
};

export type Story = {
  _id?: string;
  title: string;
  description: string;
  project?: Project;
};

export type Task = {
  _id: string;
  tname: string;
  description: string;
  duration: string;
  status: number;
};

export type ProjectProps = {
  projectDrawerOpen: boolean;
  projectDetail: Project;
  projectStories: { [projectId: string]: Story[] };
  onDrawerClose: () => void;
};

//Use here
export type Employee = {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  contact: number;
  address: string;
};

export type ViewDialogProps = {
  open: boolean;
  onClose: () => void;
  stories: Story[];
}