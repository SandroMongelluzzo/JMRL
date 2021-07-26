import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { SlaService } from 'src/app/core/services/sla.service';

@Component({
  selector: 'app-sla-list',
  templateUrl: './sla-list.component.html',
  styleUrls: ['./sla-list.component.css']
})
export class SlaListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'options'];
  sla = null as any
  dataSource = null as any;

  constructor(
    private slaService: SlaService,
    private alertService: AlertService) { }


  ngOnInit(): void {

    this.slaService.getAll()
      .pipe(first())
      .subscribe(sla => {
        this.sla = sla
        this.dataSource = new MatTableDataSource(this.sla)
      });
  }

  deleteSla(id: number) {
    const SLA = this.sla.find((x: any) => x.id === id);
    SLA.isDeleting = true;
    this.slaService.delete(id)
      .pipe(first())
      .subscribe(() => this.sla = this.sla.filter((x: any) => x.id !== id));
    this.deleteRowDataTable();
    this.alertService.warn('Sla deleted successfully', { keepAfterRouteChange: true });
  }

  private deleteRowDataTable() {
    this.dataSource = null;
    this.sla = [];
    setTimeout(() => {
      this.ngOnInit();
    }, 500);
  }
}