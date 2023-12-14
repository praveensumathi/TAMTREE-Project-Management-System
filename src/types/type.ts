import { ProjectTask } from "./boardTypes";

export type Project = {
  _id?: string;
  title: string;
  description: string;
  assignedTo: string;
};

export type ProjectProps = {
  projectDrawerOpen: boolean;
  projectDetail: Project;
  onDrawerClose: () => void;
  onSaveClick: (project: Project) => void;
};

export type ITaskDrawerProps = {
  openDrawer: boolean;
  onClose: () => void;
  selectedTask: ProjectTask;
  SelectedStoryId: string;
  onSuccessSave: () => void;
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
