import { AuthedUserContext } from "../../App";
import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Craft.css";

const CraftList = (props) => {
  const {
    craftList,
    handleViewCraft,
    filteredCrafts,
    selectedCraftType,
    searchCraft,
    scrollToTop,
  } = props;
  const user = useContext(AuthedUserContext);

  const craftsResults = filteredCrafts.map((craftItem) => (
    <div key={craftItem._id}>
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
            <Link to={`/crafts/${craftItem._id}`}>
              <button
                className="navLinkButton"
                onClick={() => {
                  handleViewCraft(craftItem);
                }}
              >
                View
              </button>
            </Link>
          ) : (
            <Link to="/signin">
              <button
                className="navLinkButton"
                onClick={scrollToTop}
              >
                Sign In to View
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <div className="craftContainer">
        <div>
          <h2 id="craftHeader">Crafts by Category</h2>
          <Link to={`/crafts/craftform`}>
            <button className="navLinkButton">Add Craft</button>
          </Link>
        </div>
        <ul className="craftList">{craftsResults}</ul>
      </div>
    </div>
  );
};

export default CraftList;
