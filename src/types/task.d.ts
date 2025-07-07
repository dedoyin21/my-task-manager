export interface Task {
  id: number;
  title: string;
  completed: boolean;
  category: string;
  dueDate?: string; // Optional
}
