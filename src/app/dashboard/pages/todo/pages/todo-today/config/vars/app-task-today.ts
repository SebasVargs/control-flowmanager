import { CategoryTask } from "../../../../models/CategoryTask";
import { Course } from "../../../../models/Courses";
import { EstimationTask } from "../../../../models/EstimationTask";
import { PriorityTasks } from "../../../../models/PriorityTask";
import { Task } from "../../../../models/Task";

export interface TaskData {
  tasks: Task[];
  filteredTask: Task[];
  priorities: PriorityTasks[];
  categories: CategoryTask[];
  estimations: EstimationTask[];
  courses: Course[];
  habilities: any[];
}

export const initialTaskData: TaskData = {
  tasks: [],
  filteredTask: [],
  priorities: [],
  categories: [],
  estimations: [],
  courses: [],
  habilities: [],
};
