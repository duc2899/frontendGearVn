import { createContext, useState } from "react";

export const CartUserProvider = createContext(null);
const CartUserContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const value = { showCart, setShowCart };
  return (
    <CartUserProvider.Provider value={value}>
      {children}
    </CartUserProvider.Provider>
  );
};
export default CartUserContext;
