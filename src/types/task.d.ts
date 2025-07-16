export interface Task {
  id: number;
  title: string;
  completed: boolean;
  category: string;
  dueDate?: string; 
  userEmail: string;
  createdAt: string; // ISO date string
}
