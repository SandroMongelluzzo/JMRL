import { Component } from '@angular/core';
import { AccountService } from 'src/app/core/services/account-service.service';
import { User } from 'src/app/model/user';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }
}