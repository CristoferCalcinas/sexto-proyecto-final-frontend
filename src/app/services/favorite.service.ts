import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private readonly STORAGE_KEY = 'wishList';

  // Signal para almacenar los IDs de productos favoritos
  private wishListSignal = signal<number[]>(this.loadWishList());

  // Computed signal para obtener la lista de favoritos
  public wishList = computed(() => this.wishListSignal());

  // Método privado para cargar la lista de deseos desde localStorage
  private loadWishList(): number[] {
    try {
      const storedWishList = localStorage.getItem(this.STORAGE_KEY);
      return storedWishList ? JSON.parse(storedWishList) : [];
    } catch (error) {
      console.warn('Error al cargar la lista de deseos', error);
      return [];
    }
  }

  // Método privado para guardar en localStorage
  private saveWishList(wishList: number[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(wishList));
    } catch (error) {
      console.warn('Error al guardar la lista de deseos', error);
    }
  }

  // Agregar producto a favoritos
  addToWishList(productId: number): void {
    this.wishListSignal.update((currentList) => {
      if (!currentList.includes(productId)) {
        const newList = [...currentList, productId];
        this.saveWishList(newList);
        return newList;
      }
      return currentList;
    });
  }

  // Eliminar producto de favoritos
  removeFromWishList(productId: number): void {
    this.wishListSignal.update((currentList) => {
      const newList = currentList.filter((id) => id !== productId);
      this.saveWishList(newList);
      return newList;
    });
  }

  // Verificar si un producto está en favoritos
  isProductInWishList(productId: number): boolean {
    return this.wishListSignal().includes(productId);
  }

  // Limpiar la lista de favoritos
  clearWishList(): void {
    this.wishListSignal.set([]);
    this.saveWishList([]);
  }

  // Método para obtener el conteo de favoritos
  getFavoriteCount = computed(() => this.wishListSignal().length);
}
