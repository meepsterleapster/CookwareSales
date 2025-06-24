import React, { useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, update as firebaseUpdate } from "firebase/database";




const getPublicImageURL = (firebasePath) => {
  return firebasePath.replace(
    "gs://cookwaresale-315b4.appspot.com",
    "https://firebasestorage.googleapis.com/v0/b/cookwaresale-315b4.appspot.com/o"
  ) + "?alt=media";
};

function Checkout() {
  const [curEmail, setCurEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // const stripe = useStripe();
  // const elements = useElements();

  const selectedProduct = location.state || JSON.parse(sessionStorage.getItem("selectedProduct")) || null;
  console.log("Checkout Image URL:", selectedProduct?.img);

  const [rentalDuration, setRentalDuration] = useState(1);


  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUserObj) => {
      if (firebaseUserObj) {
        setCurEmail(firebaseUserObj.email);
      } else {
        setCurEmail(null);
      }
    });
  }, []);

  useEffect(() => {
    // if no selected product is found, display a message and prevent rendering further
    if (!selectedProduct) {
      console.warn("No product selected, redirecting to home.");
      navigate("/");
    }
  }, [selectedProduct, navigate]);

  if (!selectedProduct) {
    console.log("No selected product found, redirecting...");
    return <p className="loading-message">No product selected, redirecting...</p>;
  }
  // convert Firebase Storage URL if necessary
  const imageUrl = selectedProduct.img.startsWith("gs://")
    ? getPublicImageURL(selectedProduct.img)
    : selectedProduct.img;

  console.log("Image URL:", imageUrl);

  const renderProductDetails = () => {
    let totalPrice = selectedProduct.price;

    if (selectedProduct.transactionType === "Renting") {
      totalPrice = selectedProduct.price * rentalDuration;
    }

    return (
      <div>
        <img src={imageUrl} alt={selectedProduct.name} className="checkout-img" />
        <div className="checkout-info">
          <h2>{selectedProduct.name}</h2>
          <p><strong>Material:</strong> {selectedProduct.material}</p>
          <p><strong>Capacity:</strong> {selectedProduct.capacity}</p>
          <p><strong>Price:</strong> ${selectedProduct.price} {selectedProduct.transactionType === 'Renting' ? '/ month' : ''}</p>

          {/* Rental duration dropdown for Renting products only */}
          {selectedProduct.transactionType === "Renting" && (
            <div className="form-group">
              <label htmlFor="rental-duration"><strong>Rental Duration:</strong></label>
              <select
                id="rental-duration"
                className="rental-duration"
                value={rentalDuration}
                onChange={(e) => setRentalDuration(Number(e.target.value))}
              >
                <option value={1}>1 month</option>
                <option value={2}>2 months</option>
                <option value={3}>3 months</option>
                <option value={6}>6 months</option>
              </select>
            </div>
          )}

          <p><strong>Total Price:</strong> ${totalPrice}</p>
        </div>
      </div>
    );
  };
  function handleClick() {
    const db = getDatabase();
    const curItem = ref(db, `kitchenWare/${selectedProduct.key}`);
    
    if (!curEmail) {
      alert("Please login to rent this product");
      return;
    }
  
    let totalPrice = selectedProduct.price;
    if (selectedProduct.transactionType === "Renting") {
      totalPrice = selectedProduct.price * rentalDuration;
    }
  
    firebaseUpdate(curItem, {
      buyerID: curEmail    
    })
      .then(() => {
        alert(`${selectedProduct.transactionType} confirmed! Total: $${totalPrice}`);
      })
      .catch((error) => {
        console.error("Error updating database:", error);
        alert("Failed to complete transaction. Please try again.");
      });
  }
  

  return (
    <main className="checkout-container">
      <h1>Checkout</h1>
      <motion.div
        className="checkout-content"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ type: 'spring' }}
      >
        {renderProductDetails()}

        {/* Checkout actions */}
        <section className="checkout-actions" aria-label="Checkout actions">
          <button
            className="confirm-button"
            onClick={handleClick}
            aria-label={`Confirm rental of ${selectedProduct.name} for ${rentalDuration} months at $${selectedProduct.price * rentalDuration}`}
          >
            Confirm {selectedProduct.transactionType}
          </button>
          <button
            className="back-button"
            onClick={() => navigate(-1)}
            aria-label="Return to previous page"
          >
            Back
          </button>
        </section>
      </motion.div>
    </main>
  );
}


export default Checkout;
