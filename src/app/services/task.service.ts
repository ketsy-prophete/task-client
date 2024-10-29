import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tasks } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseURL: string = "http://localhost:5044/api/task";

  constructor(private http: HttpClient) { }

  createTask(newTask: Tasks): Observable<any> {
    return this.http.post(this.baseURL, newTask);
  }

  getAllTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${this.baseURL}`);
  }

  getCompletedTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${this.baseURL}/completed`);
  }

  getIncompleteTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${this.baseURL}/incomplete`);
  }

  updateTask(updatedTask: Tasks): Observable<Tasks> {
    return this.http.put<Tasks>(`${this.baseURL}/${updatedTask.taskId}`, updatedTask);
  }

  deleteTaskById(taskId: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${taskId}`);
  }
}
