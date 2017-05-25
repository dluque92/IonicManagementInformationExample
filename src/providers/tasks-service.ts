import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite } from 'ionic-native';

/*
  Generated class for the TasksService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TasksService {

	db: SQLite = null;

	constructor(){
		this.db = new SQLite();
	}

	create(task: any){
		let sql = 'INSERT INTO tasks(title, completed) VALUES(?,?)';
		return this.db.executeSql(sql, [task.title, task.completed]);
	}

	createTable(){
		let sql = 'CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER)';
		return this.db.executeSql(sql, []);
	}

	delete(task: any){
		let sql = 'DELETE FROM tasks WHERE id=?';
		return this.db.executeSql(sql, [task.id]);
	}

	getAll(){
		let sql = 'SELECT * FROM tasks';
		return this.db.executeSql(sql, [])
		.then(response => {
			let tasks = [];
			for(let index = 0; index < response.rows.length; index++){
				tasks.push( response.rows.item(index));
			}
			return Promise.resolve(tasks);
		})
	}

	openDatabase(){
		return this.db.openDatabase({
			name: 'data.db',
			location: 'default' // the location field is required
		});
	}

	update(task: any){
		let sql = 'UPDATE tasks SET title=?, completed =? WHERE id=?';
		return this.db.executeSql(sql, [task.title, task.completed, task.id]);
	}

/*
  constructor(public http: Http) {
    console.log('Hello TasksService Provider');
  }
*/
}
