export interface Schedule {
  id?: number;
  date_hour: Date;
  duration: number;
  recurrent: boolean;
  day_week: number;
  course: {
    id: number;
    name: string;
    info: number;
  }
}
