import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { EmailFromContactService } from 'src/app/core/services/email-from-contact.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-emails-edit',
  templateUrl: './emails-edit.component.html',
  styleUrls: ['./emails-edit.component.css']
})
export class EmailsEditComponent implements OnInit {

  form?: FormGroup;
  id?: string;
  isAddMode?: boolean;
  loading = false;
  submitted = false;
  iUrl = null as any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private emailService: EmailFromContactService,
    private alertService: AlertService
  ) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      emailAddress: ['', Validators.required],
      name: ['', Validators.required],
      comment: ['', Validators.required],
      attachmentURL: ['', Validators.required],
      answer: ['', Validators.required],
    });

    if (!this.isAddMode) {
      this.emailService.getById(this.id!)
        .pipe(first())
        .subscribe(x => {
          this.form?.patchValue(x);
          console.log(x.attachmentURL)
          this.iUrl = x.attachmentURL
        });
    }

  }

  get f() { return this.form?.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form?.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createEmail();
    } else {
      this.updateEmail();
    }
  }

  private createEmail() {
    this.emailService.register(this.form?.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Email added successfully', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  private updateEmail() {
    this.emailService.update(this.id!, this.form?.value)
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
