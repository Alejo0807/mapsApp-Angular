import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { MarkersComponent } from './pages/markers/markers.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';

const routes: Routes = [
  {
    path: '',
    children: [
     {
       path: 'fullscreen',
       component: FullScreenComponent
     },
     {
      path: 'markers',
      component: MarkersComponent
    },
    {
      path: 'properties',
      component: PropertiesComponent
    },
    {
      path: 'zoom-range',
      component: ZoomRangeComponent
    },
    {
      path: '**',
      redirectTo: 'fullscreen'
    }, 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
