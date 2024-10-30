import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../cart-iem.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NgFor],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})

export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(
      items => {
        console.log('Cart items:', items); // Para debugging
        this.cartItems = items;
      }
    );
  }

  removeItem(id: number): void {
    console.log('Attempting to remove item with ID:', id); // Para debugging
    this.cartService.removeFromCart(id).subscribe(
      () => {
        console.log('Item removed successfully'); // Para debugging
        this.cartItems = this.cartItems.filter(item => item.id !== id);
      },
      error => {
        console.error('Error removing item:', error);
      }
    );
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }
}