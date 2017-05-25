import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import { TasksService } from '../../providers/tasks-service';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})

export class Page1 {

	tasks: any[] = [];

	constructor(
		public alertCtrl: AlertController,
		public navCtrl: NavController, 
		public tasksService: TasksService
		) {

	}

	ionViewDidLoad(){
		this.getAllTasks();
	}

	deleteTask(task: any, index){
		this.tasksService.delete(task)
		.then(response => {
			console.log(response);
			this.tasks.splice(index, 1);
			alert("Se ha eliminado el registo");
		})
		.catch( error => {
			console.error( error );
		})
	}

	getAllTasks(){
		this.tasksService.getAll()
		.then(tasks => {
			console.log(tasks);
			this.tasks = tasks;
		})
	}

	openAlertNewTask(){
		let alert = this.alertCtrl.create({
			title: 'Crear Tarea',
			message: 'Escribe el nombre de la tarea.',
			inputs: [
				{
					name: 'title',
					placeholder: 'Nueva tarea.',
				}
			],
			buttons: [
				{
					text: 'Cancelar',
					handler: () => {
						console.log('cancelar');
					}
				},
				{
					text: 'Crear',
					handler: (data) => {
						data.completed = false;
						this.tasksService.create(data)
						.then(response => {
							this.tasks.unshift(data);
						})
						.catch(error => {
							console.error(error);
						})
					}
				}
			]
		});
		alert.present();
	}

	updateTask(task, index){
		task = Object.assign({}, task);
		task.completed = !task.completed;
		this.tasksService.update(task)
		.then( response => {
			this.tasks[index] = task; 
		})
		.catch( error => {
			console.error(error);
		})
	}

}
