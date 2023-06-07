import { Component, OnInit } from '@angular/core';

import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  title = 'angular-gmap';
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  
  map: google.maps.Map;
  lat = 40.73061;
  lng = -73.935242;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
   center: this.coordinates,
   zoom: 8
  };

 

  constructor() { }

  ngOnInit(): void {
   // this.mapInitializer();
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }



  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
   const marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
    });
    marker.setMap(this.map);
  }


}
