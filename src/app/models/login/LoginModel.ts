import { JobDepartment } from './JobDepartment';
import { Employees } from "./Employees";
import { Job } from "./Job";
import { User } from "./User";
import { UserPermissions } from './UserPermissions';

export interface LoginModel{
  user : User
  employee : Employees
  job : Job
  jobDepartment : JobDepartment
  usuarioPermissions : UserPermissions[]
}


