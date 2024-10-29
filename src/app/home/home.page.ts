import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { DialogService } from '../services/dialog.service';
import { Tasks } from '../models/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  incompleteTasks: Tasks[] = [];
  completedTasks: Tasks[] = [];

  constructor(
    private taskService: TaskService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  onDelete(taskId: number | undefined) {
    if (taskId !== undefined) {
      this.taskService.deleteTaskById(taskId.toString()).subscribe(
        () => this.loadTasks(),
      );
    } else {
      console.warn('Task ID is undefined');
    }
  }

  async newTask() {
    const title = await this.dialogService.showPrompt('Add a Task', 'Enter title for your task:');
    if (title) {
      const newTask: Tasks = {
        title: title,
        completed: false
      };
      this.taskService.createTask(newTask).subscribe(() => this.loadTasks());
    }
  }

  taskCompletionToggle(updatedTask: Tasks) {
    const taskUpdate: Tasks = { ...updatedTask, completed: !updatedTask.completed };
    
    this.taskService.updateTask(taskUpdate).subscribe(
      () => this.loadTasks()
    );
  }

  loadTasks() {
    this.taskService.getIncompleteTasks().subscribe(tasks => this.incompleteTasks = tasks);
    this.taskService.getCompletedTasks().subscribe(tasks => this.completedTasks = tasks);
  }
}
