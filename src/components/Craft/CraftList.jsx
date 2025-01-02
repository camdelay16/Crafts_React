import { Link } from "react-router-dom";

const CraftList = (props) => {
  const { craftList, handleViewCraft, filteredCrafts, selectedCraftType } =
    props;

  const crafts = craftList.map((craftItem) => (
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
          <Link to={`/crafts/${craftItem._id}`}>
            <button onClick={() => handleViewCraft(craftItem)}>View</button>
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <div>
        <h2 id="craftHeader">Crafts by Category</h2>
        <Link to={`/crafts/craftform`}>
          <button>Add Craft</button>
        </Link>
      </div>
      <ul>{crafts}</ul>
    </div>
  );
};

export default CraftList;
