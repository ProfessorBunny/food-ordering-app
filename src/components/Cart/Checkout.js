import classes from "./Checkout.module.css";
const Checkout = (props) => {
  const confirmHandler = (event) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name"></input>
      </div>
      <div className={classes.control}>
        <label htmlFor="Address">Address</label>
        <input type="text" id="Address"></input>
      </div>
      <div className={classes.control}>
        <label htmlFor="State">State</label>
        <input type="text" id="State"></input>
      </div>
      <div className={classes.control}>
        <label htmlFor="PostCode">Post Code</label>
        <input type="text" id="PostCode"></input>
      </div>
      <button type="button" onClick={props.onCancel}>
        Cancel
      </button>
      <button>Confirm</button>
    </form>
  );
};

export default Checkout;
