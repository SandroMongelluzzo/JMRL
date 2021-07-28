import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/core/services/account-service.service';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { FaqService } from 'src/app/core/services/faq.service';
import { TicketService } from 'src/app/core/services/ticket.service';
import { Faq } from 'src/app/model/faq';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-new-ticket-by-user',
  templateUrl: './new-ticket-by-user.component.html',
  styleUrls: ['./new-ticket-by-user.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class NewTicketByUserComponent implements OnInit {

  //abilitare this.createTicket() dentro OnSubmit

  issue = new FormControl('', [Validators.required]);

  form?: FormGroup;
  loading = false;
  submitted = false;
  hidden = true;
  user?: User;

  dataSource = null as any;
  columnsToDisplay = ['title'];
  faqs?: Faq[];
  expandedElement?: Faq | null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private alertService: AlertService,
    private accountSerivce: AccountService,
    private faqService: FaqService,
  ) { }

  ngOnInit(): void {
    this.user = this.accountSerivce.userValue;

    this.form = this.formBuilder.group({
      issue: ['', Validators.required],
      errorCode: [null],
      status: ['Opened', Validators.required],
      priority: ['Low', Validators.required],
      //userId: [this.user.id, Validators.required],
      //attachment: ['', Validators.required],
    });

    this.faqService.getAll()
      .pipe(first())
      .subscribe(faq => {
        this.faqs = faq;
        this.dataSource = new MatTableDataSource(this.faqs);
      });
  }

  get f() { return this.form?.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.form?.invalid) {
      console.log('Form is invalid')
      return;
    }
    this.loading = true;
    // this.createTicket(); //disabilitato per testing, da abilitare
  }

  private createTicket() {
    this.ticketService.register(this.form?.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Ticket created successfully', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  getErrorMessage() {
    if (this.issue.hasError('required')) {
      return 'You must enter a value';
    }
    return this.issue.hasError('issue') ? 'Not a valid issue' : '';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.hidden = (filterValue=='')
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}