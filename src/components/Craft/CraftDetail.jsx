import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import * as craftService from "../../services/craftService";
import * as userService from "../../services/userService";
import { AuthedUserContext } from "../../App";
import { useContext } from "react";
import "./CraftDetail.css";

const CraftList = (props) => {
  const {
    selectedCraft,
    craftList,
    setCraftList,
    setSelectedCraft,
    userData,
    setUserData,
    scrollToTopBack,
  } = props;
  const navigate = useNavigate();
  const user = useContext(AuthedUserContext);
  const location = useLocation();

  const handleRemoveCraft = async (craftId) => {
    try {
      await craftService.deleteCraft(craftId);
      setCraftList(craftList.filter((craft) => craft._id !== craftId));
      setSelectedCraft(null);
      navigate("/crafts");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavoriteCraft = async () => {
    try {
      const newUserData = { ...userData };
      if (!newUserData.userCrafts) {
        newUserData.userCrafts = [];
      }
      newUserData.userCrafts.push(selectedCraft._id);
      const updatedUser = await userService.update(user._id, newUserData);
      setUserData(updatedUser);
      navigate(`/crafts/${selectedCraft._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnfavoriteCraft = async () => {
    const alreadyFavorited = userData.userCrafts?.includes(selectedCraft._id);
    if (alreadyFavorited) {
      try {
        let newUserData = { ...userData };
        const indexToRemove = newUserData.userCrafts.lastIndexOf(
          selectedCraft._id
        );
        if (indexToRemove !== -1) {
          newUserData.userCrafts.splice(indexToRemove, 1);
        }
        const updatedUser = await userService.update(user._id, newUserData);
        setUserData(updatedUser);
        navigate(`/crafts/${selectedCraft._id}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate(`/crafts/`);
    }
  };

  return (
    <div>
      <div className="craft-details-container">
        <div className="craft-item-details">
          <div className="craft-header">
            <div id="craft-img-container">
              <div id="craft-img-boarder">
                <img
                  id="craftImg"
                  src={selectedCraft.craftImg || null}
                  alt={selectedCraft.craftName}
                />
              </div>
            </div>
            <div className="craft-header-details">
              <h3 id="craftName">{selectedCraft.craftName}</h3>
              {userData.userCrafts?.includes(selectedCraft._id) ? (
                <button
                  className="fav-btn"
                  onClick={handleUnfavoriteCraft}
                >
                  <i class="fa-solid fa-heart"></i> Remove from Favorites
                </button>
              ) : (
                <button
                  className="fav-btn"
                  onClick={handleFavoriteCraft}
                >
                  <i class="fa-regular fa-heart"></i> Add to Favorites
                </button>
              )}
              <h6 id="difficulty">Difficulty: {selectedCraft.difficulty}</h6>
              <p id="description">{selectedCraft.description}</p>
            </div>
          </div>
          <div className="materials">
            <div className="details-section-title">
              <h4 id="materials">Materials</h4>
            </div>
            <ul id="materials-list">
              {selectedCraft.materials.map((material, index) => (
                <li
                  key={index}
                  className="details-section-background"
                >
                  <div className="material-text">
                    {material.amount} {material.unit} - {material.item}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="directions">
            <div className="details-section-title">
              <h4 id="directions">Directions</h4>
            </div>
            <ul id="directions-list">
              {selectedCraft.directions.map((direction, index) => (
                <li
                  key={index}
                  className="details-section-background"
                >
                  <div className="direction-text">
                    {direction.step} - {direction.direction}
                  </div>
                  {direction.stepImg && (
                    <img
                      className="step-img"
                      src={direction.stepImg}
                      alt={`Step ${direction.step}`}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div id="review-container">
            <div className="review-header">
              <div className="details-section-title">
                <h4 id="reviews">Reviews</h4>
              </div>

              <button
                className="btn-craft-details review"
                onClick={() =>
                  navigate(`/crafts/review`, {
                    state: { craftData: selectedCraft },
                  })
                }
              >
                Add Review
              </button>
            </div>
            <ul id="reviews-list">
              {selectedCraft.craftReviews.map((craftReview, index) => (
                <li
                  key={index}
                  className="details-section-background"
                >
                  <div className="review-text">
                    {craftReview.reviewer} - {"⭐".repeat(craftReview.rating)}
                  </div>
                  <div className="review-text">{craftReview.review}</div>
                </li>
              ))}
            </ul>
            <div>
              <button
                className="btn-craft-details"
                onClick={handleBack}
              >
                Close
              </button>

              {selectedCraft.author === user?._id && (
                <>
                  <button
                    className="btn-craft-details edit"
                    onClick={() =>
                      navigate(`/crafts/craftform`, {
                        state: { craftData: selectedCraft },
                      })
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn-craft-details delete"
                    onClick={() => handleRemoveCraft(selectedCraft._id)}
                  >
                    Delete Craft
                  </button>{" "}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CraftList;
