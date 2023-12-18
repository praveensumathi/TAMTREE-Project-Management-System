import { Employee, Project } from "../types/type";

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
        tasks: [
          {
            _id: "task1",
            title: "About header section",
            description: "About header section description",
            duration: "1 month",
            status: 1,
          },
          {
            _id: "task2",
            title: "About body section",
            description: "About body section description",
            duration: "2 month",
            status: 2,
          },
          {
            _id: "task3_1",
            title: "About body section update update",
            description: "About body section description",
            duration: "2 month",
            status: 2,
          },
        ],
      },
      {
        _id: "story2",
        name: "Contact page",
        description: "Contact page description",
        tasks: [
          {
            _id: "task3",
            tname: "Contact header section",
            description: "Contact header section description",
            duration: "1 month",
            status: 2,
          },
          {
            _id: "task4",
            tname: "Contact body section",
            description: "Contact body section description",
            duration: "2 month",
            status: 1,
          },
        ],
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
        tasks: [
          {
            _id: "task5",
            title: "Contact header section",
            description: "Contact header section description",
            duration: "1 month",
            status: 1,
          },
          {
            _id: "task6",
            title: "Contact body section",
            description: "Contact body section description",
            duration: "2 month",
            status: 3,
          },
        ],
      },
      {
        _id: "story5",
        name: "Home page",
        description: "Home page description",
        tasks: [
          {
            _id: "task7",
            title: "Home header section",
            description: "Home header section description",
            duration: "1 month",
            status: 4,
          },
          {
            _id: "task8",
            title: "Home body section",
            description: "Home body section description",
            duration: "2 month",
            status: 1,
          },
        ],
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
        name: "Footer page",
        description: "Home page description",
        tasks: [
          {
            _id: "task9",
            title: "Footer header section",
            description: "Footer header section description",
            duration: "1 month",
            status: 1,
          },
          {
            _id: "task10",
            title: "Footer body section",
            description: "Footer body section description",
            duration: "2 month",
            status: 3,
          },
        ],
      },
    ],
  },
];
