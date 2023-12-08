import { Project } from "../types/type";

export const projects: Project[] = [
  {
    title: "Tamtree management system Tamtree management system",
    description: "TamTree description for project",
    _id: "tamid",
    startDate: new Date('2023-01-10'),
    stories: [{
      _id: "tamtreeStoryIdOne",
      title: "Tamtree home STORY1",
      description: "Description 1",
      assignedTo: "kavi",
      priority: 'High',
      endDate: new Date('2023-01-15'),
      tasks: [{
        _id: 'Tamtree home page header',
        title: "story 1 task",
        description: 'Task 1 description',
        status: "DEPLOYED"
      }, {
        _id: 'Tamtree home page footer',
        title: "TamtreeFooter",
        description: 'Task 2 description',
        status: "IN PROGRESS"
      }]
    },
    {
      _id: "tamtreeStoryIdTwo ",
      title: "footer STORY 2",
      description: "Description 2",
      assignedTo: "mohi",
      priority: 'Medium',
      endDate: new Date('2023-01-15'),
      tasks: [{
        _id: 'taskID',
        title: "story 2 task",
        description: 'Task story 2 task description',
        status: "IN PROGRESS"
      }]
    },
    {
      _id: "tamtreeStoryId3",
      title: "Story 3 sTORY 3",
      description: "Description 3",
      assignedTo: "sound",
      priority: 'Medium',
      tasks: [{
        _id: 'task3',
        description: 'Task 3 description',
        status: 'DONE',
        title: "task 3",
      }]
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
        title: "Header",
        description: "Description 1",
        assignedTo: "Team Member 1",
        priority: 'High',
        endDate: new Date('2023-01-15'),
        tasks: [{
          _id: 'one11',
          description: 'Task 1 description',
          status: "IN PROGRESS",
          title: "Header",
        }]
      },
      {
        _id: "s2",
        title: "footer",
        description: "Description 2",
        assignedTo: "Team Member 2",
        priority: 'Medium',
        tasks: [{
          _id: 'one22',
          description: 'Task 2 description',
          status: "DEPLOYED",
          title: "Foter",
        }]
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
        title: "Header",
        description: "Description 1",
        assignedTo: "Team Member 1",
        priority: 'High',
        endDate: new Date('2023-01-15'),
        tasks: [{
          _id: 'one33',
          description: 'Task 3 description',
          status: "TO DO",
          title: "Footer",
        }]
      },
      {
        _id: "s2",
        title: "footer",
        description: "Description 2",
        assignedTo: "Team Member 2",
        priority: 'Medium',
        tasks: [{
          _id: 'one55',
          description: 'Task 5 description',
          status: "DONE",
          title: "Foter",
        }]
      },
    ]
  },
];

export const TaskStatusList = [
  { status: "TO DO", description: " the upcoming stages of the project. " },
  { status: "IN PROGRESS", description: "Stroies that are currently being worked on " },
  { status: "DEPLOYED", description: "Stories that have been completed " },
  { status: "DONE", description: " successfully completed and verified." }
]
