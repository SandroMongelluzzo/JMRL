import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AccountService } from '../../services/account-service.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  user?: User;

  constructor(private accountService: AccountService) {
      this.accountService.user.subscribe(x => this.user = x);
  }

  logout() {
      this.accountService.logout();
  }

  ngOnInit(): void {
  }

}

