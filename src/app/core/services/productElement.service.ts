import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductElement } from '../../shared/interfaces/ProductElement';

@Injectable()
export class ProductElementService {
  elementApiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  getElements(): Observable<ProductElement[]> {
    return this.http.get<ProductElement[]>(this.elementApiUrl + '/getProducts');
  }

  showElement(id: number | string): Observable<ProductElement> {
    return this.http.get<ProductElement>(
      this.elementApiUrl + '/getProductById/' + id
    );
  }

  createElements(element: ProductElement): Observable<ProductElement> {
    return this.http.post<ProductElement>(
      this.elementApiUrl + '/saveProduct',
      element
    );
  }

  editElement(
    id: number | string,
    element: ProductElement
  ): Observable<ProductElement> {
    return this.http.put<ProductElement>(
      this.elementApiUrl + '/saveProduct/' + id,
      element
    );
  }

  deleteElement(id: number | string): Observable<any> {
    return this.http.delete<any>(
      `${this.elementApiUrl + '/deleteProduct/' + id}`
    );
  }
}
