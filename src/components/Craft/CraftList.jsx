import { AuthedUserContext } from "../../App";
import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Craft.css";
import { useLocation } from "react-router-dom";

const CraftList = (props) => {
  const { handleViewCraft, filteredCrafts, scrollToTop, setSelectedCraft } =
    props;
  const user = useContext(AuthedUserContext);
  const location = useLocation();

  const clearSelectedCraft = () => {
    setSelectedCraft(null);
  };

  const craftsResults = filteredCrafts.map((craftItem) => (
    <li
      key={craftItem._id}
      className="resultCraft"
    >
      <div className="resultBackground">
        <div className="resultImgContainer">
          <img
            src={craftItem.craftImg || ""}
            alt="Craft Image"
            id="resultImg"
          />
        </div>
        <div className="resultListDetailsContainer">
          <h3 className="resultName">{craftItem.craftName}</h3>
          <div id="result-difficulty">
            <p>Difficulty: {craftItem.difficulty}</p>
          </div>
          <p id="tagline">{craftItem.tagline}</p>
          {user ? (
            <div className="cardBtn">
              <Link
                to={`/crafts/${craftItem._id}`}
                state={{ from: location }}
              >
                <button
                  className="navLinkButton view"
                  onClick={() => {
                    handleViewCraft(craftItem);
                  }}
                >
                  View
                </button>
              </Link>{" "}
            </div>
          ) : (
            <div className="cardBtn">
              <Link to="/signin">
                <button
                  className="navLinkButton"
                  onClick={scrollToTop}
                >
                  Sign In to View
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </li>
  ));

  return (
    <div>
      <div className="craftContainer">
        <div>
          <h2 id="craftHeader">Crafts by Category</h2>
          {user ? (
            <Link to={`/crafts/craftform`}>
              <button
                className="navLinkButton"
                onClick={clearSelectedCraft}
              >
                Add Craft
              </button>
            </Link>
          ) : (
            <Link to={`/signin`}>
              <button className="navLinkButton signin">
                Sign In to Add Your Own!
              </button>
            </Link>
          )}
        </div>
        <ul className="craftList">{craftsResults}</ul>
      </div>
    </div>
  );
};

export default CraftList;
