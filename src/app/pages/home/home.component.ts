import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ProductElement } from "src/app/shared/interfaces/ProductElement";
import { ProductElementService } from "../../core/services/productElement.service";
import { Router } from "@angular/router";
import { DialogModule } from "../../shared/dialog/dialog.module";
import { MatDialog } from "@angular/material/dialog";
import {
  ConfirmDialogModel,
  DialogComponent,
} from "../../shared/dialog/dialog-component/dialog.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  providers: [ProductElementService],
})
export class HomeComponent {
  displayedColumns: string[] = [
    "name",
    "unit",
    "quantity",
    "cost",
    "perishable",
    "validity",
    "fabrication",
    "actions",
  ];
  dataSource!: ProductElement[];
  @Input() currentDate = new Date().toISOString();
  public searchTable = "";

  constructor(
    public productElementService: ProductElementService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.refreshTable();
  }

  refreshTable(): void {
    this.productElementService
      .getElements(this.searchTable)
      .subscribe((data: ProductElement[]) => {
        this.dataSource = data;
      });
  }

  edit(id: number): void {
    this.router.navigate(["/create"], { queryParams: { id: id } });
  }

  delete(id: number): void {
    const message = `Tem certeza que deseja excluir este produto?`;
    const dialogData = new ConfirmDialogModel("Confirmar exclusão", message);

    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "500px",
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.productElementService.deleteElement(id).subscribe(
          () => {
            this.refreshTable();
          },
          (err) => {
            console.log("Error occurred", err);
          }
        );
      }
    });
  }

  search(): void {
    this.productElementService
      .getElements(this.searchTable)
      .subscribe((data: ProductElement[]) => {
        this.dataSource = data;
      });
  }
}
