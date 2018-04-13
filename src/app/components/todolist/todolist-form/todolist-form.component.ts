import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup,FormBuilder, Validators} from '@angular/forms';
import {TodoInterface} from '../../../interfaces/todo-interface'

@Component({
  selector: 'app-todolist-form',
  templateUrl: './todolist-form.component.html',
  styleUrls: ['./todolist-form.component.css']
})
export class TodolistFormComponent implements OnInit {
  @Output() addTodo = new EventEmitter<TodoInterface>();

  todoForm = new FormGroup({
    text: new FormControl('', [Validators.required,Validators.minLength(3)]),
    'done': new FormControl(false, Validators.required)
  });

  constructor() {
  }

  ngOnInit() {
  }

  addTodoItem() {
    console.log('this.todoForm',this.todoForm);
    this.addTodo.emit(this.todoForm.value);
  }
}
