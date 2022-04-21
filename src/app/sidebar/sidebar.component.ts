import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard', title: 'Admin Dashboard',  icon: 'fa fa-dashboard', class: '' },
    { path: '/admin/game', title: 'Game Settings',  icon:'fa fa-trophy', class: '' },
    { path: '/admin/hype', title: 'Hype Packages',  icon: 'fa fa-fire', class: ''},
    { path: '/admin/subscription', title: 'Subscription Packages',  icon: 'fa fa-usd', class: ''},
    { path: '/admin/flagged', title: 'Flagged Content',  icon:'fa fa-flag', class: '' },
    { path: '/admin/hypecontent', title: 'Hyped Content',  icon:'fa fa-address-book', class: '' },
    { path: '/admin/user', title: 'User Administration',  icon:'pe-7s-config', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  //menuItems: any[];

  constructor() { }

  ngOnInit() {
    //this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };


}
