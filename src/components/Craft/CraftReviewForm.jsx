import { Link } from "react-router-dom";

const CraftReviewForm = (props) => {
  return (
    <div id="add-review-input">
      <div id="add-review-background">
        <div id="reviewer-name-cont">
          <div className="label-container">
            <label
              htmlFor="name"
              className="review-label"
            >
              Name:
            </label>
          </div>
          <input
            type="text"
            name="name"
            id="reviewer-name"
            autoCapitalize="on"
            autoComplete="name"
          />
        </div>
        <div id="reviewer-rating-cont">
          <div className="label-container">
            <label
              htmlFor="rating"
              className="review-label"
            >
              Rating (1-5):
            </label>
          </div>
          <input
            type="number"
            min="1"
            max="5"
            name="rating"
            id="reviewer-rating"
          />
        </div>
        <div id="reviewer-review-cont">
          <div className="label-container">
            <label
              htmlFor="review"
              className="review-label"
            >
              Review:
            </label>
          </div>
          <textarea
            name="review"
            id="reviewer-review"
          ></textarea>
        </div>
        <p
          id="craft-id"
          className="hidden-always"
        ></p>
        <div id="review-btns">
          <button id="post-review">Post</button>
          <button id="cancel-post">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CraftReviewForm;
