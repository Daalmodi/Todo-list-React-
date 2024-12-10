interface TaskModel  {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    priority: 'high' | 'medium' | 'low';
    category: 'work' | 'personal' | 'study';
    completed: boolean;
    createdAt: Date;
  }
  export default TaskModel;