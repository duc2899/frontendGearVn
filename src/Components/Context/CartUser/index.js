import { createContext, useState } from "react";

export const CartUserProvider = createContext(null);
const CartUserContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [productCart, setProductCart] = useState({
    image: "",
    title: "",
  });
  const value = { showCart, setShowCart, productCart, setProductCart };
  return (
    <CartUserProvider.Provider value={value}>
      {children}
    </CartUserProvider.Provider>
  );
};
export default CartUserContext;
