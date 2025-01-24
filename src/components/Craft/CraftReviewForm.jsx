import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useRef } from "react";
import { AuthedUserContext } from "../../App";
import * as craftService from "../../services/craftService";

const initialState = {
  craftReviews: [],
};

const CraftReviewForm = (props) => {
  const { selectedCraft, setSelectedCraft, setCraftList, craftList } = props;
  const [formData, setFormData] = useState(initialState);
  const [reviewList, setReviewList] = useState([]);
  const user = useContext(AuthedUserContext);
  const navigate = useNavigate();

  const reviewerRef = useRef(user.username);
  const ratingRef = useRef(null);
  const reviewRef = useRef(null);

  const handleUpdateCraft = async (formData, craftId) => {
    try {
      const updatedCraft = await craftService.update(formData, craftId);
      if (updatedCraft.error) {
        throw new Error(updatedCraft.error);
      }
      const updatedCraftList = craftList.map((craft) =>
        craft._id !== updatedCraft._id ? craft : updatedCraft
      );
      setCraftList(updatedCraftList);
      setSelectedCraft(updatedCraft);
    } catch (error) {
      console.error("Error updating craft:", error);
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddReview();
    handleUpdateCraft(formData, selectedCraft._id);
    setFormData(initialState);
    navigate(`/crafts/${selectedCraft._id}`);
  };

  const handleAddReview = () => {
    const reviewer = reviewerRef.current.value;
    const rating = ratingRef.current.value;
    const review = reviewRef.current.value;
    const newUserReview = [...reviewList, { reviewer, rating, review }];
    setReviewList(newUserReview);
    setFormData((prevFormData) => ({
      ...prevFormData,
      craftReviews: newUserReview,
    }));
    reviewerRef.current.value = "";
    ratingRef.current.value = "";
    reviewRef.current.value = "";
  };

  // TODO: FIX ALL THIS!

  return (
    <>
      <div id="add-review-background">
        <form
          id="add-review-input"
          onSubmit={handleSubmit}
        >
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
              name="reviewer"
              id="reviewer-name"
              autoCapitalize="on"
              autoComplete="name"
              defaultValue={user.username}
              value={user.username}
              onChange={handleChange}
              ref={reviewerRef}
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
              onChange={handleChange}
              ref={ratingRef}
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
              onChange={handleChange}
              ref={reviewRef}
            ></textarea>
          </div>
          <p
            id="craft-id"
            className="hidden-always"
          ></p>
          <div id="review-btns">
            <button
              type="submit"
              id="post-review"
            >
              Post
            </button>
          </div>
        </form>

        <button
          type="button"
          id="cancel-post"
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default CraftReviewForm;
