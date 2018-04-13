import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TodoInterface} from '../../../interfaces/todo-interface'

@Component({
  selector: 'app-todolist-items',
  templateUrl: './todolist-items.component.html',
  styleUrls: ['./todolist-items.component.css']
})
export class TodolistItemsComponent implements OnInit {
  @Input() todo: any;
  @Output() removeTodo = new EventEmitter<any>();
  @Output() editTodo = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  remove(){
    this.removeTodo.emit(this.todo.id)
  }

  edit(){
    this.editTodo.emit(this.todo.id)
  }
}
