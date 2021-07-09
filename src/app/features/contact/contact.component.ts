import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { ContactService } from 'src/app/core/services/contact.service';
import { EmailFromContactService } from 'src/app/core/services/email-from-contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  FormData?: FormGroup = null as any;
  loading = false;
  id?: string;
  isAddMode?: boolean;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private router: Router,
    private builder?: FormBuilder,
    private contact?: ContactService,
    private emailService?: EmailFromContactService,

  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.FormData = this.builder?.group({
      emailAddress: new FormControl('', [Validators.compose([Validators.required, Validators.email])!]),
      name: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
      attachmentURL:  new FormControl('', [Validators.required])

    });
  }

  get f() { return this.FormData?.controls; }


  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.FormData?.invalid) {
        return;
    }

    this.loading = true;
    if (this.isAddMode) {
        this.sendEmail();
    } else {
    }
}

  private sendEmail() {
    this.emailService?.register(this.FormData?.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Email sent successfully', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}