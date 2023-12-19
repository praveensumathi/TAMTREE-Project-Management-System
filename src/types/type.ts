import { ProjectTask } from "./boardTypes";

export type Project = {
  _id: string;
  projectName: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
};

export type Story = {
  _id?: string;
  title: string;
  description: string;
  project?: Project;
};

export type ProjectProps = {
  projectDrawerOpen: boolean;
  projectDetail: Project;
  projectStories: { [projectId: string]: Story[] };
  onDrawerClose: () => void;
};

export type ITaskDrawerProps = {
  openDrawer: boolean;
  onClose: () => void;
  selectedTask: ProjectTask;
  SelectedStoryId: string;
  onSuccessSave: () => void;
};

export type EmployeeDrawerProps = {
  isDrawerOpen: boolean;
  selectedEmployee: Employee | null | undefined;
  handleDrawerClose: () => void;
}

//Use here
export type Employee = {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  contact: string;
  address: string;
};

export type ViewDialogProps = {
  open: boolean;
  onClose: () => void;
  stories: Story[];
}
