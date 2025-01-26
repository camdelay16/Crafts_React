import { AuthedUserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  const { handleSignout } = props;
  const [favoritedCrafts, setFavoritedCrafts] = useState([]);
  const user = useContext(AuthedUserContext);

  useEffect(() => {
    const getCrafts = async () => {
      try {
        const crafts = await craftService.index();
        if (crafts.error) {
          throw new Error(crafts.error);
        }
        setFavoritedCrafts(crafts);
      } catch (error) {
        console.log(error);
      }
    };
    getCrafts();
  }, []);

  const filteredCrafts = favoritedCrafts.filter((craft) => {
    let userFavoriteCrafts = { ...user };
    const favoritedCrafts = userFavoriteCrafts.userCrafts;
    return favoritedCrafts.includes(craft._id);
  });

  const crafts = filteredCrafts.map((craftItem) => (
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
    <main>
      <div className="dashboardCard">
        <h1>Welcome, {user.username}</h1>
        <p>Start Crafting!</p>

        <h3>Favorite Crafts</h3>
        <div className="craftContainer">
          {!favoritedCrafts.length ? (
            <h3>Add some crafts to your favorites!</h3>
          ) : (
            <ul className="craftList">{crafts}</ul>
          )}
        </div>
        <Link to="/">
          <button onClick={handleSignout}>Sign out</button>
        </Link>
      </div>
    </main>
  );
};

export default Dashboard;
