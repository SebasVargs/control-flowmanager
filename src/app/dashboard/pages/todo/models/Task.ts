export interface Task {
  id?: number;
  title: string;
  description?: string;
  make_date: string;
  limit_date: string;
  id_estimation:
    {
      id: number;
      name: string;
    }
  id_status_task?: string;
  id_category_task?: string;
  id_priority?: string;
  id_schedule?: string;

  index?: number;
  isEditingMake?: boolean;
  isEditingLimit?: boolean;
  formattedMakeDate?: boolean;
  formattedLimitDate?: boolean;
}
