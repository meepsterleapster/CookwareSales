import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";

function useAuthUser() {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserEmail, setCurrentEmail] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unregisterFunction = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setCurrentUser(firebaseUser.uid);
                setCurrentEmail(firebaseUser.email);
            } else {
                setCurrentUser(null);
                setCurrentEmail(null);
            }
        });

        return () => unregisterFunction();
    }, []);

    return { currentUser, currentUserEmail };
}

function useUserItems(currentUser, items) {
    const [userItems, setUserItems] = useState([]);

    useEffect(() => {
        if (currentUser && items) {
            const filteredItems = items.filter(item => item.sellerID === currentUser);
            setUserItems(filteredItems);
        }
    }, [currentUser, items]);

    return userItems;
}
const renderUserItems = (userItems) => {
    if (userItems.length === 0) {
        return <p>You haven't added any items yet.</p>;
    }

    return (
        <div className="row">
            {userItems.map(item => (
                <motion.div className="row-md-4 mb-4" key={item.id} whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}>
                    <div className="card h-100">
                        {item.img && (
                            <img
                                src={item.img}
                                className="card-img-top"
                                alt={item.name}
                            />
                        )}
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">${item.price}</p>
                            <p className="card-text">{item.description}</p>
                            {item.buyerID && (
                                <p className="text-success">
                                    Interested buyer, contact: {item.buyerID}
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

function Profile(props) {
    const { currentUser, currentUserEmail } = useAuthUser();
    const userItems = useUserItems(currentUser, props.items);

    if (!currentUser) {
        return (
            <div className="container text-center mt-5 .bg-warning-subtle">
                <h2>Please sign in to view your profile</h2>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="container py-4">
                <h1>Your Profile</h1>
                <p>Email: {currentUserEmail}</p>
                <h2 className="mt-4">Your Items:</h2>
                {renderUserItems(userItems)}
            </div>
        </div>
    );
}

export default Profile;
