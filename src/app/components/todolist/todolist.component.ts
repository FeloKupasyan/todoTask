import {Component, OnInit} from '@angular/core';
import {TodosServiceService} from '../../services/todos-service.service';
import {TodoInterface} from '../../interfaces/todo-interface';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  // the todolist is a generic component and should not hold
  // the user or group id
  userId: string;
  groupId: string;
  todoList: any;
  // shouldn't put variable type in name todoList"Array"
  todoListArray: Array<TodoInterface> = [];

  constructor(private todoService: TodosServiceService) {
  }

  ngOnInit() {
    this.getUserId();
  }

  // please move getting the userId and the groupId into todoService
  getUserId() {
    this.todoService.getUserId().subscribe(data => {
        this.userId = data.userId;
        // getGroupId does not depend on user id. please make
        // this request parallel
        this.getGroupId();
        console.log('this.userId', this.userId);
      },
      error => {
        console.log('error::', error);
      });
  }

  getGroupId() {
    this.todoService.getGroupId().subscribe(data => {
        // should not se groupId here. instead, this getter should
        // return the id.
        this.groupId = data.groupId;
        console.log('this.groupId', this.groupId);
        this.getTodoList();
      },
      error => {
        console.log('error::', error);
      });
  }

  getTodoList() {
    // please do not write something to "this" in a getter...
    // getters should be "pure" with no side effects
    this.todoService.getTodoList(this.userId, this.groupId).subscribe(data => {
        this.todoList = data;
        for (let key in this.todoList) {
          this.todoListArray.push(this.todoList[key]);
        }
      },
      error => {
        console.log('error::', error);
      });
  }

  removeTodo(e) {
    if (this.todoListArray.length === 1) {
      // why not?
      console.log('cant delete last element');
    } else {
      delete this.todoList[e];
      console.log(e);
      this.todoListArray = this.todoListArray.filter((t) => {
        return t.id !== e;
      });

      // why always pass user id and group id to editTodoList?
      // your service should store this.
      this.todoService.editTodoList(this.userId, this.groupId, this.todoListArray)
        .subscribe(data => {
            this.todoListArray = data;
            console.log('after delete data', data);
          },
          error => {
            console.log('error::', error);
          });
    }
  }

  editTodo(e) {
    // 1) please enhance the "edit" so I can also edit the text of
    // an existing todo
    this.todoListArray.forEach(function (td) {
      if (td.id === e) {
        td.done = !td.done;
      }
    });
    this.todoService.editTodoList(this.userId, this.groupId, this.todoListArray).subscribe(data => {
      console.log('data after status change', data);
      this.todoListArray = data;
    });

  }

  addTodo(e) {
    e.id = this.getNewId();
    // why do you push to your local state, when you replace this array 2 lines below
    // with the put response data?
    this.todoListArray.push(e);
    this.todoService.editTodoList(this.userId, this.groupId, this.todoListArray).subscribe(data => {
        console.log('data after add', data);
        this.todoListArray = data;
      },
      error => {
        console.log('error::', error);
      });
  }

  getNewId() {
    let next = Math.max.apply(Math, this.todoListArray.map(function (o) {
      console.log(o);
      let next = o.id.substr(1);
      return next;
    }));
    return 't' + (next + 1);
  }
}
