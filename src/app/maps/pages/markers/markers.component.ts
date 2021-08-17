import { Component, OnInit, OnDestroy, AfterContentInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerWithColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number];
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
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

    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }

    .markers {
      color: white;
    }

    li {
      cursor: pointer;
    }
  `
  ]
})
export class MarkersComponent implements OnDestroy, AfterViewInit {

  @ViewChild('screenMap') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel: number = 16;
  center: [number,number] = [-77.0297039225162, -12.120732586730842];

  markersWithColor: MarkerWithColor[] = [];

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

    this.readLocalStorage();

    // const markerHTML: HTMLElement = document.createElement('div');
    // markerHTML.innerHTML = 'Buenas';

    // const marker = new mapboxgl.Marker()
    //   .setLngLat(this.center)
    //   .addTo(this.map)
    

    
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

  addMarker() {

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat(this.center)
      .addTo(this.map)

    

    this.markersWithColor.push(
      {
        color,
        marker: newMarker
      });

    this.saveMarkersLocalStorage();

    newMarker.on('dragend', () => {
      this.saveMarkersLocalStorage()
    })
  }
  
  goToMarker(markerWithColor: MarkerWithColor) {
    this.map.flyTo({center: markerWithColor.marker!.getLngLat()})

  }

  saveMarkersLocalStorage() {

    const lngLatArr: MarkerWithColor[] = []

    this.markersWithColor.forEach( m => {
      const color = m.color;
      const {lng, lat} = m.marker!.getLngLat();

      lngLatArr.push({
        color,
        center: [lng, lat]
      })
    })

    localStorage.setItem('markers', JSON.stringify(lngLatArr));
  }

  readLocalStorage() {
    if (!localStorage.getItem('markers')) return;

    const lngLatArr: MarkerWithColor[] = JSON.parse(localStorage.getItem('markers')!);

    lngLatArr.forEach( m => {
      const newMarker = new mapboxgl.Marker({
        
        draggable: true,
        color: m.color
      })
        .setLngLat(m.center!)
        .addTo(this.map)
      
      this.markersWithColor.push(
        {
          color: m.color,
          marker: newMarker,
          center: m.center
        }
      )

      newMarker.on('dragend', () => {
        this.saveMarkersLocalStorage()
      })
    })
  }

  deleteMarker(index: number) {
    console.log("sadsad")
    this.markersWithColor[index].marker?.remove();
    this.markersWithColor.splice(index,1);
    this.saveMarkersLocalStorage();
  }


}
