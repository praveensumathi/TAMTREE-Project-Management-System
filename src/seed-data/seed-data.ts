import { Project } from "../types/type";

export const projects: Project[] = [
  {
    title: "Tamtreee",
    description: "Project Description 1",
    _id: "p1",
    startDate: new Date('2023-01-10'),
    stories: [{
      _id: "s1",
      title: "Story 1",
      description: "Description 1",
      assignedTo: "kavi",
      priority: 'High',
      status: 'In Progress',
      endDate: new Date('2023-01-15'),
    },
    {
      _id: "s2",
      title: "Story 2",
      description: "Description 2",
      assignedTo: "mohi",
      priority: 'Medium',
      status: 'In Progress',
      endDate: new Date('2023-01-15'),
    },
    {
      _id: "s3",
      title: "Story 3",
      description: "Description 3",
      assignedTo: "sound",
      priority: 'Medium',
      status: 'To Do',
    },]
  },
  {
    title: "Smart city",
    description: "smart cirty Description",
    _id: "p2",
    startDate: new Date('2023-01-20'),
    stories: [
      {
        _id: "s1",
        title: "Story 1",
        description: "Description 1",
        assignedTo: "Team Member 1",
        priority: 'High',
        status: 'In Progress',
        endDate: new Date('2023-01-15'),
      },
      {
        _id: "s2",
        title: "Story 2",
        description: "Description 2",
        assignedTo: "Team Member 2",
        priority: 'Medium',
        status: 'To Do',
      },
    ]
  },
  {
    title: "shopping",
    description: "shopping Description",
    _id: "p3",
    startDate: new Date('2023-01-20'),
    stories: [
      {
        _id: "s1",
        title: "Story 1",
        description: "Description 1",
        assignedTo: "Team Member 1",
        priority: 'High',
        status: 'In Progress',
        endDate: new Date('2023-01-15'),
      },
      {
        _id: "s2",
        title: "Story 2",
        description: "Description 2",
        assignedTo: "Team Member 2",
        priority: 'Medium',
        status: 'To Do',
      },
    ]
  },
];

