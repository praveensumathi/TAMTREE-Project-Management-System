export type Project = {
  title: string;
  description: string;
  startDate: Date;
  _id: string;
  stories: Story[];
};

export type Story = {
  _id: string,
  title: string,
  description: string
  assignedTo: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Deployed' | 'In Progress' | 'Done' | "To Do";
  endDate?: Date;
}

export type ProjectDialogProps = {
  open: boolean;
  project: any;
  onClose: () => void;
  onDelete: () => void;

}
export type ProjectDrawerProps = {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  onDialogOpen: (project: any) => void;
};
