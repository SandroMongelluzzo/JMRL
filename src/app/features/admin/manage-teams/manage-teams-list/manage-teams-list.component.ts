import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { TeamService } from 'src/app/core/services/team.service';

@Component({
  selector: 'app-manage-teams-list',
  templateUrl: './manage-teams-list.component.html',
  styleUrls: ['./manage-teams-list.component.css']
})
export class ManageTeamsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'options'];
  names=null as any
  dataSource = null as any;
  
  constructor(
    private teamService: TeamService,    
    private alertService: AlertService) { }

  ngOnInit(): void {

    this.teamService.getAll()
      .pipe(first())
      .subscribe(role =>        { 
        this.names = role
        this.dataSource =  new MatTableDataSource(this.names)
        });
  }

  deleteTeam(id: number) {
    const TEAM = this.names.find((x: any) => x.id === id);
    TEAM.isDeleting = true;
    this.teamService.delete(id)
      .pipe(first())
      .subscribe(() => this.names = this.names.filter((x: any) => x.id !== id));
    this.deleteRowDataTable();
    this.alertService.warn('Team deleted successfully', { keepAfterRouteChange: true });
  }

  private deleteRowDataTable() {
    this.dataSource = null;
    this.names = [];
    setTimeout(() => {      
      this.ngOnInit();
    }, 500);
  }
}