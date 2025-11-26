export const styles = `
  .cart-drawer .cart-item {
    box-sizing: border-box;
  }
  .cart-drawer .cart-item-img {
    width: 72px;
    height: 72px;
    object-fit: cover;
    border-radius: 6px;
    flex-shrink: 0;
  }
  @media (max-width: 480px) {
    .cart-drawer .cart-item-img {
      width: 64px;
      height: 64px;
    }
    .cart-drawer .cart-item { 
      padding: 10px; 
      gap: 8px; 
    }
    .cart-drawer .cart-total { 
      padding: 8px 0; 
    }
  }
`