import { AuthedUserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import * as craftService from "../../services/craftService";
import { useLocation } from "react-router-dom";

const Dashboard = (props) => {
  const { handleSignout, handleViewCraft } = props;
  const [favoritedCrafts, setFavoritedCrafts] = useState([]);
  const user = useContext(AuthedUserContext);
  const location = useLocation();

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
    let userFavCrafts = { ...user };
    const userFavoritedCrafts = userFavCrafts.userCrafts;
    return userFavoritedCrafts?.includes(craft._id);
  });

  const crafts = filteredCrafts.map((craftItem) => (
    <li key={craftItem._id}>
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
          <Link
            to={`/crafts/${craftItem._id}`}
            state={{ from: location }}
          >
            <button
              className="navLinkButton"
              onClick={() => handleViewCraft(craftItem)}
            >
              View
            </button>
          </Link>
        </div>
      </div>
    </li>
  ));

  return (
    <main>
      <div className="dashboardCard">
        <h1>Welcome, {user.username}!</h1>
        <br />
        <h3 className="subtitle">Favorite Crafts</h3>
        <div className="craftContainer">
          {!user?.userCrafts?.length ? (
            <h5>Add some crafts to your favorites!</h5>
          ) : (
            <ul className="craftList dashboardList">{crafts}</ul>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
