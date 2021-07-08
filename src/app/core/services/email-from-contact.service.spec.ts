import { TestBed } from '@angular/core/testing';

import { EmailFromContactService } from './email-from-contact.service';

describe('EmailFromContactService', () => {
  let service: EmailFromContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailFromContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
