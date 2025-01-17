import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../product';
import { CartItem } from '../../cart-item';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      products => this.products = products
    );
  }

  addToCart(product: Product): void {
    const cartItem = {
      id: product.id,
      nombre: product.nombre,
      precio: product.precio
    };
    this.cartService.addToCart(cartItem).subscribe(() => {
    });
  }
}