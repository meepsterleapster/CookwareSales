import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import {motion} from "framer-motion";

function SellerFront(props) {
  const [equipment, setEquipment] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('New');
  const [material, setMaterial] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transactionType, setTransactionType] = useState('Renting');  // State for transaction type
  const [sellerID, setSellerID] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setSellerID(user.uid);
      }
    });
    
    return () => unsubscribe();
  }, []);

  const [dimensions, setDimensions] = useState([
    { id: 1, type: 'Length', value: '', unit: 'in' },
    { id: 2, type: 'Width', value: '', unit: 'in' }
  ]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage({
        file: file,
        preview: URL.createObjectURL(file)
      });
    }
  };

  const removeDimension = (id) => {
    setDimensions(dimensions.filter(dim => dim.id !== id));
  };

  const updateDimensionValue = (id, value) => {
    setDimensions(dimensions.map(dim =>
      dim.id === id ? { ...dim, value } : dim
    ));
  };

  const updateDimensionUnit = (id, unit) => {
    setDimensions(dimensions.map(dim =>
      dim.id === id ? { ...dim, unit } : dim
    ));
  };

  const handleSubmit = async (e) => {
    const storeDB = getStorage();
    e.preventDefault();
    setUploading(true);
    let imageUrl = "";
    if (image && image.file) {
      try {
        const storageReference = storageRef(storeDB, `productImage/${equipment}_${Date.now()}`);
        await uploadBytes(storageReference, image.file);
        imageUrl = await getDownloadURL(storageReference);
      } catch (error) {
        console.error("Error uploading image: ", error);
        setUploading(false);
        return;
      }
    }
    if (!sellerID) {
      alert(`You cannot sell cookware without an account!`);
      navigate("/index");
      return;
    }
    const newProduct = {
      id: Math.floor(Math.random() * 1000),
      img: imageUrl,
      name: equipment,
      location: location,
      dimensions: dimensions,
      material: material,
      condition: selectedCondition,
      description: description,
      price: price,
      transactionType: transactionType,
      sellerID: sellerID,
      buyerID : null
    };

    props.addItem(newProduct);
    setUploading(false);
    navigate("/index");

  };

  return (
    <motion.main 
    className="container mt-4 centered-container"
    initial={{x: -100}}animate={{ x: 0 }} 
    transition={{ type: "spring", duration: 1.5 }}
    >
      <h1 className="text-center mb-4">Product Listing</h1>
      <form onSubmit={handleSubmit}>
        {/* Image Upload Section */}
        <div className="image-upload text-center mb-4">
          <input
            type="file"
            id="file-upload"
            onChange={handleImageChange}
            disabled={uploading}
          />
          <label htmlFor="file-upload" className="upload-area">
            {image ? (
              <img
                src={image.preview}
                alt="Selected product"
                className="preview-image"
              />
            ) : (
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/685/685655.png"
                  width="50"
                  alt="Upload Icon"
                />
                <p>Click to upload image</p>
              </div>
            )}
          </label>
        </div>

        {/* Equipment Type */}
        <div className="form-group mb-4">
          <label htmlFor="equipment-type" className="form-label">Equipment Type</label>
          <input
            type="text"
            id="equipment-type"
            className="form-control"
            placeholder="e.g., Pan"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            disabled={uploading}
            required
          />
        </div>

        {/* Dimensions */}
        <div className="form-group mb-4">
          <label className="form-label">Dimensions</label>
          <div className="dimensions-container">
            {dimensions.map((dim) => (
              <div className="dimension-box" key={dim.id}>
                <strong className="dimension-title">{dim.type}</strong>
                <div className="dimension-input-container">
                  <input
                    type="number"
                    id={`dimension-value-${dim.id}`}
                    className="form-control dimension-value"
                    placeholder="Value"
                    value={dim.value}
                    onChange={(e) => updateDimensionValue(dim.id, e.target.value)}
                    disabled={uploading}
                  />
                  <label htmlFor={`dimension-unit-${dim.id}`} className="visually-hidden">{dim.type} Unit</label>
                  <select
                    id={`dimension-unit-${dim.id}`}
                    className="form-select dimension-unit"
                    value={dim.unit}
                    onChange={(e) => updateDimensionUnit(dim.id, e.target.value)}
                    disabled={uploading}
                  >
                    <option value="in">in</option>
                    <option value="cm">cm</option>
                    <option value="mm">mm</option>
                    <option value="ft">ft</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Material */}
        <div className="form-group mb-4">
          <label htmlFor="material" className="form-label">Material</label>
          <input
            type="text"
            id="material"
            className="form-control"
            placeholder="e.g., Stainless Steel"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            disabled={uploading}
          />
        </div>

        {/* Location */}
        <div className="form-group mb-4">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            id="location"
            className="form-control"
            placeholder="Middle of Nowhere, USA"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            disabled={uploading}
          />
        </div>

        {/* Condition */}
        <div className="form-group mb-4">
          <label htmlFor="condition" className="form-label">Condition</label>
          <select
            id="condition"
            className="form-select"
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            disabled={uploading}
          >
            <option value="New">New</option>
            <option value="Used - Like New">Used - Like New</option>
            <option value="Used - Good">Used - Good</option>
            <option value="Used - Fair">Used - Fair</option>
          </select>
        </div>

        {/* Price */}
        <div className="form-group mb-4">
          <label htmlFor="price" className="form-label">Price ($)</label>
          <input
            type="number"
            id="price"
            className="form-control"
            placeholder="e.g., 50"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            disabled={uploading}
          />
        </div>

        {/* Transaction Type - Renting or Selling */}
        <div className="form-group mb-4">
          <label htmlFor="transaction-type" className="form-label">Transaction Type:</label>
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center mb-2">
              <input
                type="radio"
                id="renting"
                name="transactionType"
                value="Renting"
                checked={transactionType === 'Renting'}
                onChange={(e) => setTransactionType(e.target.value)}
                disabled={uploading}
              />
              <label htmlFor="renting" className="ms-2">Renting (Per Month) </label>
            </div>
            <div className="d-flex align-items-center">
              <input
                type="radio"
                id="selling"
                name="transactionType"
                value="Selling"
                checked={transactionType === 'Selling'}
                onChange={(e) => setTransactionType(e.target.value)}
                disabled={uploading}
              />
              <label htmlFor="selling" className="ms-2">Selling</label>
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="form-group mb-4">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            className="form-control description-input"
            rows="4"
            placeholder="Enter details about the product"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={uploading}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn submit-btn mb-4" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Submit Posting'}
        </button>
      </form>
    </motion.main>
  );
}

export default SellerFront;
