import { Component, OnInit, ViewChild } from '@angular/core';
import Restaurant  from '../models/restaurant';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { RestaurantsService } from '../services/restaurant.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-restaurant-get',
  templateUrl: './restaurant-get.component.html',
  styleUrls: ['./restaurant-get.component.css']
})
export class RestaurantGetComponent implements OnInit {
  restaurants: any;
  test: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['id', 'name', 'progress', 'color', 'delete'];
  dataSource: MatTableDataSource<Restaurant>;
  
  constructor(
    private rs: RestaurantsService,
    private router: Router,
    ) { 
      this.dataSource = new MatTableDataSource();      
    }
  

  

  needRefresh: Subject<any> = new Subject<any>();

  deleteRestaurant(id) {
    this.rs.deleteRestaurant(id).subscribe(res => {
      this.needRefresh.next();
    });
  }

  ngOnInit() {
    console.info('*****', this.dataSource)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    this.needRefresh.pipe(
      switchMap(() => this.rs.getRestaurants()),
      map(res => res)
    ).subscribe(res => {
      this.restaurants = res;
      console.info('jaja', this.restaurants)
      this.dataSource.data = this.restaurants.data;
      console.info(this.dataSource)
    });    
    this.needRefresh.next();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

