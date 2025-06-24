import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function Card(props) {
  const { img, name, location, id } = props;
  return (
    <div className="card">
      <img src={img} alt={`A ${name}`} />
      <p>
        {name}
        <br />
        {/* only display the location icon and location if it exists. */}
        {location ? (
          <>
            <span className="material-symbols-outlined" aria-label="Location">
              location_on
            </span>{" "}
            {location}
          </>
        ) : null}
      </p>
      <Link to={`/list/${id}`}>
        <motion.button className="index-button" type="button" whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}>
          Make an Offer
        </motion.button>
      </Link>
    </div>
  );
}

function Index(props) {
  const { cards, searchActive } = props;
  const navigate = useNavigate();

  // Map cards:
  const cardElements = cards.map((item, index) => (
      <Card
        key={index}
        img={item.img}
        name={item.name}
        location={item.location}
        id={item.id}
      />
  ));
  

  // search result message
  const searchMessage = searchActive ? (
    <div className="search-results-message mb-4">
      <h2>Search Results</h2>
      <p>Found {cards.length} item(s)</p>
    </div>
  ) : null;

  // search result
  const content =
    searchActive && cards.length === 0 ? (
      <section className="content text-center py-5" aria-label="Search results">
        <h2>No items found.</h2>
      </section>
    ) : (
      <section className="content" aria-label="Cookware products">
        {searchMessage}
        <div className="cards">{cardElements}</div>
      </section>
    );

  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap" />
      <header className="header text-center py-3 bg-dark text-white">
        <h1>Cookware Sales</h1>
      </header>
      <main>
        <div className="flex-container">
          <section className="content" aria-label="Cookware products">
            <div className="cards">{content}</div>
          </section>
        </div>
      </main>
      <footer className="bg-dark text-white text-center py-3 mt-4 justify-content-bottom">
        <p>&copy; 2025 CookwareSales. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Index;
