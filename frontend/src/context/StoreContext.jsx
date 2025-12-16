import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "https://food-delivery-dfch.onrender.com";

  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");

  // ================= ADD TO CART =================
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));

    if (token) {
      try {
        const response = await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );

        if (response.data.success) {
          toast.success("Item added to cart");
        }
      } catch (err) {
        toast.error("Error adding item");
      }
    }
  };

  // ================= REMOVE FROM CART =================
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));

    if (token) {
      try {
        const response = await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );

        if (response.data.success) {
          toast.success("Item removed from cart");
        }
      } catch (err) {
        toast.error("Error removing item");
      }
    }
  };

  // ================= TOTAL CART AMOUNT (SAFE) =================
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = food_list.find(
          (product) => product._id === itemId
        );

        // 🔥 CRITICAL SAFETY CHECK (prevents crash)
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      }
    }

    return totalAmount;
  };

  // ================= FETCH FOOD LIST =================
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setFoodList(response.data.data);
      }
    } catch (err) {
      toast.error("Failed to load food items");
    }
  };

  // ================= LOAD CART DATA =================
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        { headers: { token } }
      );
      setCartItems(response.data.cartData || {});
    } catch (err) {
      console.log("Cart load failed");
    }
  };

  // ================= CLEAR CART =================
  const clearCart = () => {
    setCartItems({});
  };

  // ================= INITIAL LOAD =================
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }

    loadData();
  }, []);

  // ================= CONTEXT VALUE =================
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    clearCart,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
