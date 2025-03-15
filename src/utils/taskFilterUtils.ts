
import { Task } from '@/types/flow';

export const filterTasks = (tasks: Task[], filterStatus: string): Task[] => {
  return tasks.filter(task => 
    filterStatus === 'all' || task.status === filterStatus
  );
};

export const sortTasks = (tasks: Task[], sortBy: string): Task[] => {
  return [...tasks].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
    } else if (sortBy === 'due_date') {
      return new Date(a.due_date || '').getTime() - new Date(b.due_date || '').getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });
};
