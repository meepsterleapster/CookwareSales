// const placeholderItems = [
//     {
//       id: 1,
//       img: "src/img/airFryer.jpg",
//       name: "Air Fryer",
//       location: "Seattle WA",
//       condition: "Mild Use",
//       material: "Copper",
//       description: "A Slightly Used Air Fryer.",
//       dimensions: [
//         { id: 1, type: "Length", value: "10", unit: "in" },
//         { id: 2, type: "Width", value: "8", unit: "in" },
//       ],
//     },
//     {
//       id: 2,
//       img: "src/img/stainlessSteelPan.jpg",
//       name: "Non-Stick Fry Pan",
//       location: "Bothell",
//       condition: "New",
//       material: "Aluminum",
//       description: "A durable non-stick pan.",
//       dimensions: [
//         { id: 1, type: "Length", value: "12", unit: "in" },
//         { id: 2, type: "Width", value: "9", unit: "in" },
//       ],
//     },
//   ];

 
//   const itemsRef = dbRef(db, "items");
//   set(itemsRef, placeholderItems);

//   fetch("src/img/stainlessSteelPan.jpg")
//     .then(response => response.blob())
//     .then(blob => {
//       const storage = getStorage();
//       const imageRef = storageRef(storage, "productImage/steelPanTest");
      
//       // Now upload the blob
//       uploadBytes(imageRef, blob).then((snapshot) => {
//         console.log('Uploaded a blob or file!');
//       });
//     });

//     fetch("src/img/airFryer.jpg")
//     .then(response => response.blob())
//     .then(blob => {
//       const storage = getStorage();
//       const imageRef = storageRef(storage, "productImage/airFryerTest");
      
//       // Now upload the blob
//       uploadBytes(imageRef, blob).then((snapshot) => {
//         console.log('Uploaded a blob or file!');
//       });
//     });