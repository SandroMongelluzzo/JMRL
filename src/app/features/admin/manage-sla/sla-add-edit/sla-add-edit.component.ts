import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { SlaService } from 'src/app/core/services/sla.service';

@Component({
  selector: 'app-sla-add-edit',
  templateUrl: './sla-add-edit.component.html',
  styleUrls: ['./sla-add-edit.component.css']
})
export class SlaAddEditComponent implements OnInit {
  form?: FormGroup;
  id?: number;
  isAddMode?: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private slaService: SlaService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      comment: ['', Validators.required],
    });

    if (!this.isAddMode) {
      this.slaService.getById(this.id!)
        .pipe(first())
        .subscribe(x => {
          this.form?.patchValue(x)
        });
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
    if (this.isAddMode) {
      this.createSla();
    } else {
      this.updateSla();
    }
  }

  private createSla() {
    this.slaService.register(this.form?.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Sla added successfully', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  private updateSla() {
    this.slaService.update(this.id!, this.form?.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Update successful', { keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }  
}