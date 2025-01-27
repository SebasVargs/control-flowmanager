import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { menuItems } from '../../../../shared/data/menu-items';
import { monthItems } from '../../../../shared/data/month-items';
import { settingsItems } from '../../../todo/shared/data/settings-items';
import { CrudScheduleService } from '../../services/schedule/CrudSchedule.service';
import { Router } from '@angular/router';
import { dayWeek } from '../../shared/data/day-items';
import { Schedule } from '../../models/Schedule';
import { DateTimeService } from '../../services/utils/DateTime.service';
import { GeneralDataService } from '../../../../../core/services/generalData.service';
import { CrudTasksService } from '../../../todo/services/tasks/crudTasks.service';
import { Task } from '../../../todo/models/Task';
import { CourseHabilityService } from '../../services/course-hability/CourseHability.service';

@Component({
  selector: 'app-assign-calendar',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './assign-calendar.component.html',
  styleUrl: './assign-calendar.component.css'
})
export class AssignCalendarComponent {

  constructor(
  ){
    this.configItems.find(config => config.label === 'Logout')!.onClick = this.openLogoutModal.bind(this)
    this.generateHours(7, 20)
  }

  days = dayWeek;
  calendar: { [day: string]: { [hour: string]: any[] } } = {};
  hours: string[] = [];

  currentRoute: string = 'home';
  isOpenCourses: boolean = false
  isOpenHabilities: boolean = false
  isMenuOpen: boolean = false;
  months = monthItems
  isOpenLogoutModal = false;
  height: String = '100vh';
  itemsDrop = menuItems;
  configItems = settingsItems

  configOpen: boolean = false;
  categoriesOpen: boolean = false;
  dropdownOpen: boolean = false;
  openModalCourse: boolean = false;
  selectedCourse: any;
  dayAndHour: any[] = [];
  tasks: Task[] = []
  schedule: Schedule[] = []
  courseHability: any[] = []

  private serviceSchedule = inject(CrudScheduleService)
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private dateTimeService = inject(DateTimeService)
  private generalData = inject(GeneralDataService)
  private serviceTasks = inject(CrudTasksService)
  private serviceCourseHability = inject(CourseHabilityService)

  readonly urlTasks: string = `${this.serviceTasks.getApiUrl()}`
  readonly urlSchedule: string = `${this.serviceSchedule.getApiUrl()}`
  readonly urlCourseHability: string = `${this.serviceCourseHability.getApiUrl()}`

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.height = `${window.innerHeight}px`;
    }
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const routePath = this.activatedRoute.snapshot.firstChild?.routeConfig?.path;
        this.currentRoute = routePath ? `home / ${routePath}` : 'home';
      });
    this.formatSchedule();
    this.loadData<Schedule>(`${this.urlSchedule}`, 'schedule')
    this.loadData<Task>(`${this.urlTasks}`, 'tasks')
    this.loadData(`${this.urlCourseHability}`, 'courseHability')
  }

  private loadData<T>(url: string, target: keyof this & string): void {
    this.generalData.getDataWithIndex(url).subscribe({
      next: (data: T[]) => {
        (this[target] as T[]) = data;
        console.log(data)
      },
      error: (err) => {
        console.error(`Error cargando datos desde ${url}`, err)
      }
    });
  }

  // Generar lista de horas
  private generateHours(startHour: number, endHour: number): void {
    for (let hour = startHour; hour <= endHour; hour++) {
      const time = hour <= 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`;
      this.hours.push(time);
    }
  }

  formatSchedule(): void {
    this.calendar = {};
    this.serviceSchedule.getSchedule().subscribe({
      next: (data) => {
        // Inicializar el calendario
        this.days.forEach(day => {
          this.calendar[day.name] = {}; // Asume que `day.name` es el nombre del día
          this.hours.forEach(hour => {
            this.calendar[day.name][hour] = []; // Cada hora inicia como un array vacío
          });
        });

        // Mapear los datos al calendario
        data.forEach(schedule => {
          const dayName = this.days.find(day => day.id === schedule.day_week)?.name;
          const hour = this.dateTimeService.formatHour(schedule.date_hour); // Formatear la hora desde `date_hour`
          if (dayName && hour && this.calendar[dayName]?.[hour]) {
            this.calendar[dayName][hour].push({
              id: schedule.course.id,
              day_week: schedule.day_week,
              course: schedule.course.name,
              duration: schedule.duration,
              recurrent: schedule.recurrent,
              info: schedule.course.info,
            });
          }
        });
      },
      error: (err) => console.error('Error fetching schedule:', err),
    });
  }

  openLogoutModal(){
    this.isOpenLogoutModal = true
    document.body.style.overflow = 'hidden';
  }

  closeLogoutModal(){
    this.isOpenLogoutModal = false;
    document.body.style.overflow = 'auto';
  }

  OpenCoursesModal(){
    this.isOpenCourses = true;
    document.body.style.overflow = 'auto';
  }

  OpenHabilitiesModal(){
    this.isOpenHabilities = true;
  }

  configDropdown(): void {
    this.configOpen = !this.configOpen;
  }

  openModalCourses(course: Schedule[], day: string, hour: any){
    this.dayAndHour = []
    this.openModalCourse = true
    this.selectedCourse = course;
    this.dayAndHour.push(day, hour, this.dateTimeService.convertMinutesToHours(this.selectedCourse.duration))
    this.filterCourses(this.selectedCourse)
  }

  courseFilter: any[] = [];
  taskFilter: any[] = [];
  coursehabilFilter: any[] = [];

  filterCourses(course: any): void {
    this.courseFilter = this.schedule.filter(
      (schedule) =>
        course.id === schedule.course.id &&
        String(course.day_week).trim().toLowerCase() === String(schedule.day_week).trim().toLowerCase()
    );
    this.filterTasks();
    this.habilitiesFilter(this.courseFilter);
  }

  filterTasks(): void {
    this.taskFilter = this.tasks.filter(
      (taskEach) =>
        taskEach.id_course &&
        taskEach.id_course.id != null &&
        this.courseFilter.some((courseFilter) => taskEach.id_course.id === courseFilter.course.id)
    );
  }

  habilitiesFilter(object: any[]): void {
    this.coursehabilFilter = this.courseHability.filter((corhabil) =>
      object.some((obj) => obj.course.name === corhabil.id_course.name)
    );
  }



  onHiddeModalCourse(){
    this.openModalCourse = false
  }
}
