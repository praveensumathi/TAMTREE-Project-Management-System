export type Project = {
  title: string;
  description: string;
  startDate: Date;
  _id: string;
  stories: Story[];
};
export type Task = {
  _id: string;
  title: string,
  description: string;
  status: 'DEPLOYED' | 'IN PROGRESS' | 'DONE' | 'TO DO';

}

export type Story = {
  _id: string,
  title: string,
  description: string
  assignedTo: string;
  priority: 'High' | 'Medium' | 'Low';
  endDate?: Date;
  tasks: Task[]
}


export type ProjectDialogProps = {
  open: boolean;
  project: Project | null;
  story: Story | null; // Add the story prop
  onClose: () => void;
  onDelete: () => void;

}
export type ProjectDrawerProps = {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  onDialogOpen: (project: any) => void;
};

export type StoriesListProps = {
  stories: Story[];
  setStories: React.Dispatch<React.SetStateAction<Story[]>>;
}
export type TaskListProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export type DragTaskProps = {
  tasks: Task;
  setTask: React.Dispatch<React.SetStateAction<Task[]>>
  storyId: string
}

export interface DropTargetProps {
  onDrop: (id: string, droppedStatus: string | null) => void;
  setTask: React.Dispatch<React.SetStateAction<Task[]>>
  status?: string;
  children: React.ReactNode;
  handleDropCallback: (id: string, status: string | null, updatedTasks: Task[]) => void;
  storyId: string

}

export type DraggableItem = {
  id: string;
  status: string;
}

export type SectionsProps = {
  task: Task[];
  setTask: React.Dispatch<React.SetStateAction<Task[]>>;
  todo: Story[];
  inprogress: Story[];
  deployed: Story[];
  done: Story[];
}