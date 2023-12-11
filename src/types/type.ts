export type Project = {
  _id: string;
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
  tasks?: Task[];
};

export type Task = {
  _id: string;
  tname: string;
  description: string;
  duration: string;
  status: number;
};

export type Employee = {
  _id: string,
  employeeId: string,
  name: string;
  email: string;
  age: number;

}

export type ViewDialogProps = {
  open: boolean;
  onClose: () => void;
  stories: Storie[];
};

export type ProjectProps = {
  projectDrawerOpen: boolean;
  selectedProject: Project ;
  onDrawerClose: () => void;
 handleProjectUpdate: (handleProjectUpdate: Project) => void;
 
};

