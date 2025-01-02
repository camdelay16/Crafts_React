import { Link } from "react-router-dom";

const CraftList = (props) => {
  const { selectedCraft, craftList, handleViewCraft } = props;

  return (
    <div>
      <div className="craft-details-container">
        <div className="craft-item-details">
          <div className="craft-header">
            <div id="craft-img-container">
              <div id="craft-img-boarder">
                <img
                  id="craftImg"
                  src={selectedCraft.craftImg}
                  alt={selectedCraft.craftName}
                />
              </div>
            </div>
            <div className="craft-header-details">
              <h3 id="craftName">{selectedCraft.craftName}</h3>
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
                className="add-review-btn"
                id="add-review-btn"
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
            <button id="close-craft-details">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CraftList;
