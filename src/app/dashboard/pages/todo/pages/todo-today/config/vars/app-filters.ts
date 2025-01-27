export interface TaskFilters {
  selectedPriority: string;
  searchText: string;
  product: string;
}

export const initialTaskFilters: TaskFilters = {
  selectedPriority: '',
  searchText: '',
  product: '',
};
