import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu-components/menu.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, MatButtonModule, RouterModule],
  exports: [MenuComponent],
})
export class MenuModule {}
