import { monthItems } from "../../../../../../shared/data/month-items";

export interface AppConfig {
  isEditingFilter: boolean;
  isDateFormat: boolean;
  isDeleteTask: boolean;
  taskId: number;
  formattedDate: string;
  months: any[];
  selectedTask: any;
}

export const initialAppConfig: AppConfig = {
  isEditingFilter: true,
  isDateFormat: false,
  isDeleteTask: false,
  taskId: 0,
  formattedDate: '',
  months: monthItems,
  selectedTask: null,
};
