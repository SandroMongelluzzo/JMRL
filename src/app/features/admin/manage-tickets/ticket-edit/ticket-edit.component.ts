import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/core/services/account-service.service';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { TicketService } from 'src/app/core/services/ticket.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit {

  form?: FormGroup;
  id?: number;
  isAddMode?: boolean;
  loading = false;
  submitted = false;
  user?: User;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private alertService: AlertService,
    private accountSerivce: AccountService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.user = this.accountSerivce.userValue;

    this.form = this.formBuilder.group({
      type: ['', Validators.required],
      status: ['', Validators.required],
      userId: ['', Validators.required],
      userEmail: ['', Validators.required],
      userName: ['', Validators.required],
      content: ['', Validators.required],
      comment: ['', Validators.required],
      attachment: ['', Validators.required],
      employeeId: ['0', Validators.required],
    });

    if (!this.isAddMode) {
      this.ticketService.getById(this.id!)
        .pipe(first())
        .subscribe(x => this.form?.patchValue(x));
    }
  }

  get f() { return this.form?.controls; }

  onSubmit() {
    this.submitted = true;


    this.alertService.clear();

    if (this.form?.invalid) {
      return;
    }

    this.loading = true;
    if (!this.isAddMode) {
      this.updateTicket();
    }
  }

  private updateTicket() {
    this.ticketService.update(this.id!, this.form?.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Update successful', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}