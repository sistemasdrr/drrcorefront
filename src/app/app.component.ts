import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  currentUrl!: string;
  constructor(public _router: Router, private renderer : Renderer2) {
    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.currentUrl = routerEvent.url.substring(
          routerEvent.url.lastIndexOf('/') + 1
        );
      }
      if (routerEvent instanceof NavigationEnd) {
        /* empty */
      }
      window.scrollTo(0, 0);
    });
  }
  ngOnInit(): void {
    const headers = new HttpHeaders()
    .set('Cache-Control', 'no-cache')
    .set('Pragma', 'no-cache'); 

    location.reload();
  }
 

 
}
