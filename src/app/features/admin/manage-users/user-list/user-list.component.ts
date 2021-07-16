import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/core/services/account-service.service';
import { AlertService } from 'src/app/core/services/alert-service.service';

@Component({ templateUrl: 'user-list.component.html' })
export class UserListComponent implements OnInit {
    users = null as any;

    constructor(
        private accountService: AccountService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    deleteUser(id: number) {
        const user = this.users.find((x: any) => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter((x: any) => x.id !== id));
        this.alertService.warn('User deleted successfully');
    }
}