import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CartItem } from '../cart-item';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private apiUrl = 'http://localhost:3000/cart';
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  private loadCart(): void {
    this.http.get<CartItem[]>(this.apiUrl).subscribe(items => {
      this.cartSubject.next(items);
    });
  }
  

  getCartItems(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: any): Observable<CartItem> {
    const cartItem: CartItem = {
      id: product.id,
      nombre: product.nombre,
      precio: product.precio
    };

    return this.http.post<CartItem>(this.apiUrl, cartItem).pipe(
      tap(newItem => {
        const currentItems = this.cartSubject.getValue();
        this.cartSubject.next([...currentItems, newItem]);
      })
    );
  }

  removeFromCart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.loadCart();
      })
    );
  }
  
}