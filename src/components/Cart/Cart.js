import { Fragment, useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [showChekout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [httpError, setHttpError] = useState(null);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$ ${cartCtx.totalAmount.toFixed(2)}`;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('https://food-order-app-7db68-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items
        })
      })
      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart()
    } catch (error) {
      setIsSubmitting(false);
      setHttpError(error.message);
    }

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
  const cartModalContent = <Fragment>
    <ul className={classes["cart-items"]}>{cartItems}</ul>

    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    {showChekout && <Checkout onSubmit={submitOrderHandler} onCancel={props.onCloseCart} />}
    {!showChekout && modalButtons}
  </Fragment>
  const isSubmittingContent = <p>Sending data to database...</p>
  const didSubmitContent = <Fragment><p>DATA SUCCESSFULLY SENT TO DATABASE</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onCloseCart}>
        Close
      </button>
    </div>
  </Fragment>
  const error = <Fragment>
    <p>{httpError}</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onCloseCart}>
        Close
      </button>
    </div>
  </Fragment>
  return (
    <Modal onCloseCart={props.onCloseCart}>
      {!isSubmitting && httpError && error}
      {!isSubmitting && didSubmit && didSubmitContent}
      {!isSubmitting && !didSubmit && !httpError && cartModalContent}
      {isSubmitting && isSubmittingContent}


    </Modal>
  );
};

export default Cart;
