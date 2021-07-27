import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { TeamService } from 'src/app/core/services/team.service';

@Component({
  selector: 'app-manage-teams-add-edit',
  templateUrl: './manage-teams-add-edit.component.html',
  styleUrls: ['./manage-teams-add-edit.component.css']
})
export class ManageTeamsAddEditComponent implements OnInit {

  form?: FormGroup;
  id?: number;
  isAddMode?: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });

    if (!this.isAddMode) {
      this.teamService.getById(this.id!)
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
      this.createTeam();
    } else {
      this.updateTeam();
    }
  }

  private createTeam() {
    this.teamService.register(this.form?.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Team added successfully', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  private updateTeam() {
    this.teamService.update(this.id!, this.form?.value)
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