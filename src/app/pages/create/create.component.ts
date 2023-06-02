import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { ProductElementService } from "../../core/services/productElement.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductElement } from "../../shared/interfaces/ProductElement";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
  providers: [ProductElementService],
})
export class CreateComponent implements OnInit {
  public idProduct!: number;
  public data!: FormGroup;

  constructor(
    public fb: FormBuilder,
    public productElementService: ProductElementService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.data = fb.group({
      name: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern("^[a-zA-Z ]*$"),
        ]),
      ],
      cost: ["", Validators.required],
      unit: ["", Validators.required],
      validity: ["", Validators.required],
      perishable: ["", Validators.required],
      quantity: ["", Validators.required],
      fabrication: ["", Validators.required],
    });
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.queryParamMap.get("id");
    if (id) {
      this.productElementService
        .showElement(id)
        .subscribe((response: ProductElement) => {
          this.idProduct = response.id;
          this.data = this.fb.group({
            name: [
              response.name,
              Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.pattern("^[a-zA-Z ]*$"),
              ]),
            ],
            cost: [response.cost, Validators.required],
            unit: [response.unit, Validators.required],
            validity: [response.validity, Validators.required],
            perishable: [response.perishable, Validators.required],
            quantity: [response.quantity, Validators.required],
            fabrication: [response.fabrication, Validators.required],
          });
        });
    }
  }

  create(): void {
    let newValidity: moment.Moment = moment
      .utc(this.data.value.validity)
      .local();
    this.data.value.validity = newValidity.format("YYYY-MM-DD");

    let newFabrication: moment.Moment = moment
      .utc(this.data.value.fabrication)
      .local();
    this.data.value.fabrication = newFabrication.format("YYYY-MM-DD");

    if (!this.idProduct) {
      this.productElementService.createElements(this.data.value).subscribe(
        () => {
          this.router.navigate(["/"]);
        },
        (err) => {
          console.log("Error occurred", err);
        }
      );
    } else {
      this.productElementService
        .editElement(this.idProduct, this.data.value)
        .subscribe(
          () => {
            this.router.navigate(["/"]);
          },
          (err) => {
            console.log("Error occurred", err);
          }
        );
    }
  }
}
