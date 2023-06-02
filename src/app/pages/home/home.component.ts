import { Component, Input, ViewChild } from '@angular/core';
import { ProductElement } from 'src/app/shared/interfaces/ProductElement';
import { ProductElementService } from '../../core/services/productElement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ProductElementService],
})
export class HomeComponent {
  displayedColumns: string[] = [
    'name',
    'unit',
    'quantity',
    'cost',
    'perishable',
    'validity',
    'fabrication',
    'actions',
  ];
  dataSource!: ProductElement[];
  @Input() currentDate = new Date().toISOString();

  constructor(
    public productElementService: ProductElementService,
    private router: Router
  ) {
    this.refreshTable();
  }

  refreshTable(): void {
    this.productElementService
      .getElements()
      .subscribe((data: ProductElement[]) => {
        this.dataSource = data;
      });
  }

  edit(id: number): void {
    this.router.navigate(['/create'], { queryParams: { id: id } });
  }

  delete(id: number): void {
    this.productElementService.deleteElement(id).subscribe(
      () => {
        this.refreshTable();
      },
      (err) => {
        console.log('Error occurred', err);
      }
    );
  }
}
