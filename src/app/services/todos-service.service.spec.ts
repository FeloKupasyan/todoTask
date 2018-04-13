import { TestBed, inject } from '@angular/core/testing';

import { TodosServiceService } from './todos-service.service';

describe('TodosServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodosServiceService]
    });
  });

  it('should be created', inject([TodosServiceService], (service: TodosServiceService) => {
    expect(service).toBeTruthy();
  }));
});
