import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistItemsComponent } from './todolist-items.component';

describe('TodolistItemsComponent', () => {
  let component: TodolistItemsComponent;
  let fixture: ComponentFixture<TodolistItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodolistItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
