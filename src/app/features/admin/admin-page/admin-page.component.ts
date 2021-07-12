import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account-service.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  user?: User;

  constructor(private accountService: AccountService) {
      this.accountService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
  }

}
