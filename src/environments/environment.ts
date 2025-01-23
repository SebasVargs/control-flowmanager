export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  apiRoutes: {
    tasks: {
      base: 'todo',
      others: [
        {
          base: 'tasks',
          byId: (id: number) => `tasks/${id}`
        },
        {
          base: 'estimations',
          byId: (id: number) => `estimations/${id}`
        },
        {
          base: 'category_task',
          byId: (id: number) => `category_task/${id}`
        },
        {
          base: 'priorities',
          byId: (id: number) => `priorities/${id}`
        },
        {
          base: 'status_tasks',
          byId: (id: number) => `status_tasks/${id}`
        }
      ]
    },
    schedule: {
      base: 'schedule',
      others: [
        {
          base: 'course',
          byId: (id: number) => `course/${id}`
        },
        {
          base: 'schedule',
          byId: (id: number) => `schedule/${id}`
        }
      ]
    }
  },
  debugMode: true,
  logLevel: 'debug'
}
