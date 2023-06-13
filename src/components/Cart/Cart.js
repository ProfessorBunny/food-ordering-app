import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [showChekout, setShowCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$ ${cartCtx.totalAmount.toFixed(2)}`;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const submitOrderHandler = (userData) => {
    fetch('https://food-order-app-7db68-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderItems: cartCtx.items
      })
    })
  }

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      amount={item.amount}
      name={item.name}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />
  ));
  const hasItems = cartCtx.items.length > 0;
  const checkoutFormHandler = () => {
    setShowCheckout(true);
  };
  const modalButtons = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={checkoutFormHandler}>
          Order
        </button>
      )}
    </div>
  );
  return (
    <Modal onCloseCart={props.onCloseCart}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showChekout && <Checkout onSubmit={submitOrderHandler} onCancel={props.onCloseCart} />}
      {!showChekout && modalButtons}
    </Modal>
  );
};

export default Cart;
