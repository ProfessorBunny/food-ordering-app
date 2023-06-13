import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isLessSixCharacter = (value) => value.trim().length <= 6;

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postInputRef = useRef();
  const cityInputRef = useRef();
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    post: true,
    city: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPost = postInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostIsValid = !isLessSixCharacter(enteredPost);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      post: enteredPostIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      post: enteredPost,
      city: enteredCity

    })
  };

  const nameControlClasses = `${classes.control} ${!formInputValidity.name ? classes.invalid : ""
    } `;
  const streetControlClasses = `${classes.control} ${!formInputValidity.street ? classes.invalid : ""
    }`;
  const postControlClasses = `${classes.control} ${!formInputValidity.post ? classes.invalid : ""
    } `;
  const cityContolClasses = `${classes.control} ${!formInputValidity.city ? classes.invalid : ""
    } `;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formInputValidity.name && (
          <p className={classes.errorMessage}>Please enter a valid name</p>
        )}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formInputValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={postControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postInputRef} type="text" id="postal" />
        {!formInputValidity.post && <p>Please enter a Post code</p>}
      </div>
      <div className={cityContolClasses}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formInputValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
