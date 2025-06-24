import SellerFront from "./SellerFront.jsx";
import Index from "./index"
import SignUp from "./signup.jsx"
import Profile from "./profile.jsx"
import Login from "./login.jsx"
import List from "./List.jsx";
import { ItemList } from "./ItemList.jsx";
import Checkout from "./Checkout.jsx";
import { NavBar } from "./navbar.jsx"
import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDatabase, ref as dbRef, set, onValue, push } from "firebase/database";
import { auth } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
// import { Elements } from "@stripe/react-stripe-js";
// import stripePromise from "../stripe";

function App() {
  // Placeholder data for the index page

  const db = getDatabase();
  const [user, setUser] = useState(undefined);
  const storage = getStorage();

  // state for search functionality
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchActive, setSearchActive] = useState(false);

  //
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUserObj) => {
      if (firebaseUserObj) {
        firebaseUserObj.userId = firebaseUserObj.uid;
        setUser(firebaseUserObj);
      } else {
        setUser(null);
      }
    });
  }, []);


  useEffect(() => {
    const unsubscribe = onValue(itemsRef, (snapshot) => {
      let data = snapshot.val();
      if (!data) {
        // If the database is empty, initialize it with placeholderItems
        set(itemsRef, placeholderItems);
        data = placeholderItems;
      }
      const itemKeys = Object.keys(data);
      const itemsArray = itemKeys.map((key) => ({ ...data[key], key }));
      setItems(itemsArray);
    });
    return () => unsubscribe();
  }, []);



  const placeholderItems = [
    {
      id: 1,
      img: "https://firebasestorage.googleapis.com/v0/b/cookwaresale-315b4.firebasestorage.app/o/productImage%2FairFryerTest?alt=media&token=44d51dcd-4788-4983-b4c6-54d8e4c1cf5c",
      name: "Air Fryer",
      location: "Seattle WA",
      condition: "Mild Use",
      material: "Copper",
      description: "A Slightly Used Air Fryer.",
      dimensions: [
        { id: 1, type: "Length", value: "10", unit: "in" },
        { id: 2, type: "Width", value: "8", unit: "in" },
      ],
    },
    {
      id: 2,
      img: "https://firebasestorage.googleapis.com/v0/b/cookwaresale-315b4.firebasestorage.app/o/productImage%2FsteelPanTest?alt=media&token=59666d30-afc5-4ab4-87d1-b44517a990b9",
      name: "Non-Stick Fry Pan",
      location: "Bothell",
      condition: "New",
      material: "Aluminum",
      description: "A durable non-stick pan.",
      dimensions: [
        { id: 1, type: "Length", value: "12", unit: "in" },
        { id: 2, type: "Width", value: "9", unit: "in" },
      ],
    },
  ];


  const itemsRef = dbRef(db, "kitchenWare");


  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    const newItemRef = push(itemsRef); // Creates a new unique key for each item
    set(newItemRef, newItem);
  };

  // searching products by name
  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredItems([]);
      setSearchActive(false);
    } else {
      const results = items.filter(item => item.name && item.name.toLowerCase().includes(query.toLowerCase()));
      setFilteredItems(results);
      setSearchActive(true);
    }
  };

  // which items to display based on status
  const displayItems = searchActive ? filteredItems : items;

  return (
    <div>
      <head>
        <title>Cookware Sale</title>
        <link rel="icon" type="image/png" href="img/icon.png" />
        <img src="../img/icon.png" alt="Logo" width="40" height="40" />
      </head>
      <NavBar onSearch={handleSearch} />
      <Routes>
        <Route path="*" element={<Navigate to="/index" replace />} />
        <Route path="index" element={<Index cards={displayItems} searchActive={searchActive} />} />
        {/* <Route path="index" element={<Index cards={items} key={items.key} />} /> {/* Pass in a list of items, cards destructs just the parts it needs */}
        <Route path="signup" element={<SignUp />} />
        <Route path="sellerFrontend" element={<SellerFront addItem={addItem} user={user} />} /> {/*We pass in the addItem function as a prop, so we can get items back*/}
        <Route path="profile" element={<Profile items={items} key={items.key} />} />
        <Route path="login" element={<Login />} />
        <Route path="list/:id" element={<ItemList items={items} key={items.key} />} />
        <Route path="checkout" element={<Checkout items={items} />} />
      </Routes>
    </div>
  );
};

export default App;
