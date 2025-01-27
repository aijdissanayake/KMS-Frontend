import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
} from "react-icons/md";

// Admin Imports
import Employee from "./views/employee";
import EmployeeType from "views/employee-type";
import Industry from "./views/industry";
import Client from "./views/client";
import ProjectCategory from "./views/project-category";
import Project from "./views/project";

const routes = [
  {
    name: "Industry",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/industry",
    component: Industry,
  },
  {
    name: "Client",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/client",
    component: Client,
  },
  {
    name: "Project Category",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/project-category",
    component: ProjectCategory,
  },
  {
    name: "Project",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/project",
    component: Project,
  },
  {
    name: "Employees",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: Employee,
  },
  {
    name: "Employee Types",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit'/>,
    path: "/employee-types",
    component: EmployeeType,
  }
];

export default routes;
