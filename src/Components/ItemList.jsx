import React from 'react';
import { useParams, useNavigate } from "react-router-dom";


export function ItemList(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = props.items.find(item => String(item.id) === id);

  if (!item) {
    return (
      <div className="container mt-4">
        <h2>Item not found</h2>
      </div>
    );
  }

  const handleRentNow = () => {
    console.log("Navigating to checkout with item:", item);
    sessionStorage.setItem("selectedProduct", JSON.stringify(item));
    navigate("/checkout", { state: item });
  };


  const dimensionList = item.dimensions
    ? item.dimensions.map((dim, index) => (
      <span key={index}> {dim.type}: {dim.value} {dim.unit};</span>
    ))
    : null;

  return (

    <div className="container mt-4">
      {/* Price Section */}
      {/* Note that we aren't sure if we doing a rental or just a meetup thing just yet */}
      {/* Price will ALWAYS default to 33$ for now, its intended */}
      
    <section aria-label="Pricing information">
      <h1 className="price">
        {item.price ? `$${item.price}` : '$33'}
        <span>{item.price ? '/month' : '/month'}</span>
      </h1>
      </section>

      {/* Product Info Section */}
      <div className="product-info" aria-label="Product details">
        <h2>{item.name}</h2>
        <ul>
          {item.features && <li><strong>Features:</strong> {item.features}</li>}
          <li><strong>Description:</strong> {item.description}</li>
          {item.specialFeatures && <li><strong>Special Features:</strong> {item.specialFeatures}</li>}
          {item.dimensions && <li><strong>Dimensions:</strong> {dimensionList}</li>}
          <li><strong>Material:</strong> {item.material}</li>
          {item.capacity && <li><strong>Capacity:</strong> {item.capacity}</li>}
          {item.color && <li><strong>Color:</strong> {item.color}</li>}
          <li><strong>Location:</strong> {item.location}</li>
          <li><strong>Condition:</strong> {item.condition}</li>
        </ul>
      </div>

      {/* Main Product Image */}
      <div className="product-images" aria-label="Product images">
        <img src={item.img} alt={item.name} className="img-fluid mb-3" />
      </div>

      {/* Extra Images and Rent Now Button */}
      <div className="image-button-container d-flex mt-3">
        <button className="rent-button btn btn-primary mt-2"
          onClick={() => navigate("/checkout", { state: item })} 
        >
          Rent Now
        </button>
      </div>
    </div>
  );
};
