import { useReducer } from "react";
import { createContext } from "react";

// ========== CONTEXT ==========

type CartContextType = {
  items: Item[];
  totalAmount: number;
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  totalAmount: 0,
  addItem: (item: Item) => {},
  removeItem: (id: string) => {},
});

export default CartContext;

// ========== REDUCER ==========

type State = {
  items: any;
  totalAmount: number;
};

type Action = {
  type: string;
  payload: {
    item?: {
      id: string;
      price: number;
      amount: number;
    };
    id?: string;
  };
};

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state: State, action: Action): State => {
  if (action.type === "ADD" && action.payload.item) {
    const updatedTotalAmount =
      state.totalAmount +
      action.payload.item.price * action.payload.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item: Item) => item.id === action.payload.item!.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.payload.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.payload.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "DELETE") {
    const existingCartItemIndex = state.items.findIndex(
      (item: Item) => item.id === action.payload.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(
        (item: Item) => item.id !== action.payload.id
      );
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

// ========== CONTEXT PROVIDER ==========

type CartContextProviderProps = {
  children: React.ReactNode;
};

type Item = {
  id: string;
  title: string;
  price: number;
  amount: number;
};

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const handleAddItemToCart = (item: Item) => {
    dispatchCartAction({ type: "ADD", payload: { item: item } });
  };

  const deleteItemFromCart = (id: string) => {
    dispatchCartAction({ type: "DELETE", payload: { id: id } });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: handleAddItemToCart,
    removeItem: deleteItemFromCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};
