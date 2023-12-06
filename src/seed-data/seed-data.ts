import { Project } from "../types/type";

export const projects: Project[] = [
  {
    _id: "p1",
    title: "megna silks",
    description: " megna silks description",
    assignedTo: "praveen",
    status: "To Do",

    stories: [
      {
        _id: "story1",
        name: "About page",
        description: "About page description",
      },
      {
        _id: "story2",
        name: "Contact page",
        description: "Contact page description",
      },
    ],
  },
  {
    _id: "p2",
    title: "ahimsa",
    description: "ahimsa Description",
    assignedTo: "kavi",
    status: "In Progress",

    stories: [
      {
        _id: "story3",
        name: "Contact page",
        description: "Contact page description",
      },
      {
        _id: "story5",
        name: "Home page",
        description: "Home page description",
      },
    ],
  },
  {
    _id: "p3",
    title: "chennai silks",
    description: "chennai silks Description",
    assignedTo: "usena",
    status: "Done",

    stories: [
      {
        _id: "story4",
        name: "Home page",
        description: "Home page description",
      },
    ],
  },
];
