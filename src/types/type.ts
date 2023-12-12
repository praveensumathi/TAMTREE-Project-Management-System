export type Project = {
  _id: string;
  projectName: string;
  description: string;
 startDate:Date;
 endDate:Date;
 duration:string;
  
};

export type Story = {
  _id: string;
  title:string;
  description: string;
  project:Project;
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
  stories: Story[];
};

export type ProjectProps = {
  projectDrawerOpen: boolean;
  selectedProject: Project ;
  onDrawerClose: () => void;
 handleProjectUpdate: (handleProjectUpdate: Project) => void;
 
};

