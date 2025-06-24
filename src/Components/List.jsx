import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


function List() {
  console.log("✅ List component rendered!");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const productData = location.state || JSON.parse(sessionStorage.getItem("selectedProduct"));
    console.log("🧐 Checking selectedProduct:", productData);

    if (!productData) {
      console.warn("⏳ No product selected! Redirecting to home...");
      navigate("/");
      return;
    }

    setSelectedProduct(productData);
  }, [location, navigate]);

  if (!selectedProduct) {
    return <p className="loading-message">⏳ Loading product details...</p>;
  }

  return (
    <div className="list-container">
      <div className="product-detail-container">
        {/* 左侧图片区域 */}
        <div className="product-images">
          <img src={selectedProduct.mainImage} alt={selectedProduct.name} className="main-product-img" />
          <div className="extra-images">
            <img src={selectedProduct.extraImage1} alt="Extra 1" className="extra-img" /> {/*alt={`Additional view of ${selectedProduct.name} - 1`}*/}
            <img src={selectedProduct.extraImage2} alt="Extra 2" className="extra-img" />
          </div>
        </div>

        {/* 右侧信息区域 */}
        <div className="product-info">
          <h1>{selectedProduct.name}</h1>
          <p><strong>Features:</strong> {selectedProduct.features}</p>
          <p><strong>Description:</strong> {selectedProduct.description}</p>
          <p><strong>Special Features:</strong> {selectedProduct.specialFeatures}</p>
          <p><strong>Dimensions:</strong> {selectedProduct.dimensions}</p>
          <p><strong>Material:</strong> {selectedProduct.material}</p>
          <p><strong>Capacity:</strong> {selectedProduct.capacity}</p>
          <p><strong>Color:</strong> {selectedProduct.color}</p>

          {/*Added aria-label for accessibility*/}
          <button 
            className="rent-now-button" 
            onClick={() => navigate("/checkout", { state: selectedProduct })}
            aria-label={`Rent ${selectedProduct.name} now`}
          >
            Rent Now
          </button>

        </div>
      </div>
    </div>
  );
}

export default List;
