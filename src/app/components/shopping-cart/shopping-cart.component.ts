import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../cart-item';
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
        this.cartItems = items;
      }
    );
  }

  removeItem(id: number): void {
    this.cartService.removeFromCart(id).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.id !== id);
    }
    );
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.precio, 0);
  }
}