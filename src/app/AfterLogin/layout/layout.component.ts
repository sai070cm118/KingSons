import {Component } from '@angular/core';
import { navItems } from './_nav';
import { AuthService } from '../../Shared/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent  {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(private _authService: AuthService ) {}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    console.log('Logout');
    this._authService.logout().subscribe();
  }

}

