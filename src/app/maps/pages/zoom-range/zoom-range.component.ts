import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
    .map-container {
      width: 100%;
      height: 100%;
    }

    .row {
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      z-index: 999;
      width: 400px;
    }
  `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('screenMap') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel: number = 16;
  center: [number,number] = [-77.0297039225162, -12.120732586730842];

  constructor() { }


  ngOnDestroy(): void {
    this.map.off('zoom', () => {})
    this.map.off('zoomend', () => {})
    this.map.off('move', () => {})
  }


  ngAfterViewInit(): void {

    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
      });
    
    this.map.on('zoom', (ev) => {
      this.zoomLevel = this.map.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if (this.map.getZoom() > 18){
        this.map.zoomTo(18);
      }
    });

    this.map.on('move', (ev) => {
      this.center[1] = this.map.getCenter().lat
      this.center[0] = this.map.getCenter().lng
    });
  }


  zoom( type: string ) {

    if (type === 'in') this.map.zoomIn();
    if (type === 'out') this.map.zoomOut();
    
  }

  zoomChanged(value : string) {
    this.map.zoomTo(Number(value))
  }

}
