import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account-service.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  user?: User;

  constructor(private accountService: AccountService) {
      this.accountService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
  }

}
