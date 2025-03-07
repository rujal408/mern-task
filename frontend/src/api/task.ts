import axios from "axios";
import { Task } from "../types/tasks";

const API_URL = import.meta.env.VITE_API_URL; // Update if needed

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(API_URL);
  return response.data.data;
};

export const addTask = async (task: Task): Promise<Task> => {
  const response = await axios.post(API_URL, task);
  return response.data.data;
};

export const updateTask = async (id: string, task: Task): Promise<Task> => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
