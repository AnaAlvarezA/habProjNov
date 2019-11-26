import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [NavigationComponent, MainComponent, FooterComponent],
  imports: [
    CommonModule
  ],
  exports: [NavigationComponent, MainComponent, FooterComponent]
})
export class LayoutModule { }
