import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  items: any[] = [];
  isMobile = window.innerWidth < 600;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.http.get<any[]>('/api/items').subscribe((data) => {
      this.items = data;
    });
  }

  onResize(event: any): void {
    this.isMobile = event.target.innerWidth < 600;
  }
}
