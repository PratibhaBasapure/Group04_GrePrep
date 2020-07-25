import { TestBed } from '@angular/core/testing';

import { QuestionManagerService } from './question-manager.service';

describe('QuestionManagerService', () => {
  let service: QuestionManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
