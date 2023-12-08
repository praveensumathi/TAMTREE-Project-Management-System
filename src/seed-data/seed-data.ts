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
            tname: "About header section",
            description: "About header section description",
            duration: "1 month",
            status: 1,
          },
          {
            _id: "task2",
            tname: "About body section",
            description: "About body section description",
            duration: "2 month",
            status: 2,
          },
          {
            _id: "task3_1",
            tname: "About body section update update",
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
            tname: "Contact header section",
            description: "Contact header section description",
            duration: "1 month",
            status: 1,

          },
          {
            _id: "task6",
            tname: "Contact body section",
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
            tname: "Home header section",
            description: "Home header section description",
            duration: "1 month",
            status: 4,

          },
          {
            _id: "task8",
            tname: "Home body section",
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
            tname: "Footer header section",
            description: "Footer header section description",
            duration: "1 month",
            status: 1,

          },
          {
            _id: "task10",
            tname: "Footer body section",
            description: "Footer body section description",
            duration: "2 month",
            status: 3,

          },
        ],
      },
    ],
  },
];


export const employees: Employee[] = [
  {
    _id: "db1",
    employeeId: "employeId1",
    first_name: "kavi",
    last_name: "priya",
    email: "kaviinfotechit@gmail.com",
    age: 26,
    gender: "female",

  },
  {
    _id: "db2",
    employeeId: "employeId2",
    first_name: "soundharya",
    last_name: "siva",
    email: "sountarya@gmail.com",
    age: 27,
    gender: "female",

  },
  {
    _id: "db3",
    employeeId: "employeId3",
    first_name: "logesh",
    last_name: "logesh",
    email: "logesh@gmail.com",
    age: 22,
    gender: "male",

  },
]