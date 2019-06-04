import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-item',
  templateUrl: './admin-item.component.html',
  styleUrls: ['./admin-item.component.css']
})
export class AdminItemComponent implements OnInit {
  @Input() admin: any = {};
  @Input() index: number;
  
  constructor(private router: Router) { }


  ngOnInit() {
  }

}
