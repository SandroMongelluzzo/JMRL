import { TestBed } from '@angular/core/testing';

import { TicketAttachmentsService } from './ticket-attachments.service';

describe('TicketAttachmentsService', () => {
  let service: TicketAttachmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketAttachmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
