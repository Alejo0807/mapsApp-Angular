import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [`
    #map {
      width: 100%;
      height: 100%;
    }
  `
  ]
})

export class FullScreenComponent implements OnInit{
  
  
  
  
  ngOnInit(): void {
    
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-77.0297039225162, -12.120732586730842],
      zoom: 16
      });
  }


}
