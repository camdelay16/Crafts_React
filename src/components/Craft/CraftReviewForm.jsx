import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthedUserContext } from "../../App";
import * as craftService from "../../services/craftService";
import { set, useForm } from "react-hook-form";

const initialState = {
  craftReviews: [],
};

const CraftReviewForm = (props) => {
  const { selectedCraft, setSelectedCraft, setCraftList, craftList } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState(initialState);
  const user = useContext(AuthedUserContext);
  const navigate = useNavigate();

  const handleUpdateCraft = async (formData, craftId) => {
    try {
      const updatedCraft = await craftService.update(formData, craftId);
      if (!updatedCraft) {
        throw new Error("No response from server");
      }
      if (updatedCraft.error) {
        throw new Error(updatedCraft.error);
      }
      const updatedCraftList = craftList.map((craft) =>
        craft._id !== updatedCraft._id ? craft : updatedCraft
      );
      setCraftList(updatedCraftList);
      setSelectedCraft(updatedCraft);
      navigate(`/crafts/${selectedCraft._id}`);
    } catch (error) {
      console.error("Error updating craft:", error);
    }
  };

  const handleAddReview = async (data) => {
    const newReview = {
      reviewer: data.reviewer,
      rating: data.rating,
      review: data.review,
    };
    const updatedCraft = {
      ...selectedCraft,
      craftReviews: [...selectedCraft.craftReviews, newReview],
    };
    console.log("updatedCraft:", updatedCraft);
    try {
      const updatedCraftResponse = await craftService.update(
        updatedCraft,
        selectedCraft._id
      );
      setSelectedCraft(updatedCraftResponse);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const onSubmit = (data) => {
    handleAddReview(data);
    // handleUpdateCraft(formData, selectedCraft._id);
    setFormData(initialState);
    navigate(`/crafts/${selectedCraft._id}`);
  };

  return (
    <>
      <div id="add-review-background">
        <form
          id="add-review-input"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div id="reviewer-name-cont">
            <div className="label-container">
              <label
                htmlFor="reviewer"
                className="review-label"
              >
                Name:
              </label>
            </div>
            <input
              {...register("reviewer", { required: true })}
              name="reviewer"
              id="reviewer-name"
              autoCapitalize="on"
              autoComplete="name"
              defaultValue={user.username}
              readOnly
            />
            {errors.reviewer && (
              <span className="error">{errors.reviewer.message}</span>
            )}
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
              {...register("rating", { required: true, min: 1, max: 5 })}
              type="number"
              min="1"
              max="5"
              name="rating"
              id="reviewer-rating"
            />
            {errors.rating && (
              <span className="error">{errors.rating.message}</span>
            )}
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
              {...register("review", { required: true })}
              name="review"
              id="reviewer-review"
            ></textarea>
            {errors.review && (
              <span className="error">{errors.review.message}</span>
            )}
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
          onClick={() => navigate(`/crafts/${selectedCraft._id}`)}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default CraftReviewForm;
