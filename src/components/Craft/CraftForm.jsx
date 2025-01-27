import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import * as craftService from "../../services/craftService";
import "./CraftForm.css";
const initialState = {
  craftName: "",
  description: "",
  craftType_id: "",
  tagline: "",
  difficulty: "",
  premiumMembership: false,
  craftImg: "",
  forKids: false,
  materials: [],
  directions: [],
};

const CraftForm = (props) => {
  const { selectedCraft, setSelectedCraft, craftList, setCraftList } = props;
  const [formData, setFormData] = useState(initialState);
  const [materialList, setMaterialList] = useState([]);
  const [directions, setDirections] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddCraft = async (formData) => {
    try {
      const newCraft = await craftService.create(formData);
      if (newCraft.error) {
        throw new Error(response.error);
      }
      setCraftList([...craftList, newCraft]);
    } catch (error) {
      console.error("Error creating craft:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCraft) {
      handleUpdateCraft(formData, selectedCraft._id);
      setFormData(initialState);
      navigate(`/crafts/${selectedCraft._id}`);
    } else {
      handleAddCraft(formData);
      setFormData(initialState);
      navigate("/crafts");
    }
  };

  const handleAddMaterial = () => {
    const amount = document.getElementById("material-amount").value;
    const unit = document.getElementById("material-unit").value;
    const item = document.getElementById("material-item").value;
    const newMaterialList = [...materialList, { amount, unit, item }];
    setMaterialList(newMaterialList);
    setFormData({ ...formData, materials: newMaterialList });
    document.getElementById("material-amount").value = "";
    document.getElementById("material-unit").value = "";
    document.getElementById("material-item").value = "";
  };

  const handleAddDirection = () => {
    const step = document.getElementById("direction-step").value;
    const direction = document.getElementById("direction-description").value;
    const stepImg = document.getElementById("direction-image").value;
    const newDirections = [...directions, { step, direction, stepImg }];
    setDirections(newDirections);
    setFormData({ ...formData, directions: newDirections });
    document.getElementById("direction-step").value = "";
    document.getElementById("direction-description").value = "";
    document.getElementById("direction-image").value = "";
  };

  const handleEditMaterial = (index) => {
    const material = materialList[index];
    document.getElementById("material-amount").value = material.amount;
    document.getElementById("material-unit").value = material.unit;
    document.getElementById("material-item").value = material.item;
    setMaterialList(materialList.filter((_, i) => i !== index));
  };

  const handleDeleteMaterial = (index) => {
    setMaterialList(materialList.filter((_, i) => i !== index));
  };

  const handleEditDirection = (index) => {
    const direction = directions[index];
    document.getElementById("direction-step").value = direction.step;
    document.getElementById("direction-description").value =
      direction.description;
    document.getElementById("direction-image").value = direction.image;
    setDirections(directions.filter((_, i) => i !== index));
  };

  const handleDeleteDirection = (index) => {
    setDirections(directions.filter((_, i) => i !== index));
  };

  const handleMoveDirectionUp = (index) => {
    if (index === 0) return;
    const newDirections = [...directions];
    [newDirections[index - 1], newDirections[index]] = [
      newDirections[index],
      newDirections[index - 1],
    ];
    newDirections.forEach((direction, i) => (direction.step = i + 1));
    setDirections(newDirections);
  };

  const handleMoveDirectionDown = (index) => {
    if (index === directions.length - 1) return;
    const newDirections = [...directions];
    [newDirections[index + 1], newDirections[index]] = [
      newDirections[index],
      newDirections[index + 1],
    ];
    newDirections.forEach((direction, i) => (direction.step = i + 1));
    setDirections(newDirections);
  };

  useEffect(() => {
    const craftData = location.state?.craftData;
    if (craftData) {
      setFormData(craftData);
      setMaterialList(craftData.materials);
      setDirections(craftData.directions);
    }
  }, [location.state]);

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

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="craftName">Craft Name:</label>
          <input
            type="text"
            id="craftName"
            name="craftName"
            value={formData.craftName}
            onChange={handleChange}
            placeholder="Enter craft name"
          />
        </div>
        <div>
          <label htmlFor="tagline">Tagline:</label>
          <input
            type="text"
            id="tagline"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            placeholder="Enter tagline"
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            required
          />
        </div>
        <div>
          <label htmlFor="type">Craft Type:</label>
          <select
            id="type"
            name="craftType_id"
            value={formData.craftType_id}
            onChange={handleChange}
          >
            <option value={null}>-- Select a Type --</option>
            <option value="67159bf0c5f0b8a90eb3b0fb">
              Painting and Drawing
            </option>
            <option value="67159bf0c5f0b8a90eb3b0fc">Sculpture</option>
            <option value="67159bf0c5f0b8a90eb3b0fd">Textiles</option>
            <option value="67159bf0c5f0b8a90eb3b0fe">Paper Crafts</option>
            <option value="67159bf0c5f0b8a90eb3b0ff">Jewelry Making</option>
            <option value="67159bf0c5f0b8a90eb3b100">Home Decor</option>
            <option value="67159bf0c5f0b8a90eb3b102">Witchcraft</option>
          </select>
        </div>
        <div>
          <label htmlFor="difficulty">Craft Difficulty:</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value={null}>-- Select a Type --</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        <div>
          <label htmlFor="premium-membership">
            Require Premium Membership:
          </label>
          <select
            id="premium-membership"
            name="premium"
            value={formData.premium}
            onChange={handleChange}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div id="add-craft-img-container">
          <div className="label-container">
            <label
              htmlFor="craft-img"
              className="review-label"
            >
              Craft Image URL:
            </label>
          </div>
          <input
            type="text"
            id="craftImg"
            name="craftImg"
            value={formData.craftImg}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>
        <div>
          <label htmlFor="for-kids">For Kids:</label>
          <select
            id="for-kids"
            name="forKids"
            value={formData.forKids}
            onChange={handleChange}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div>
          <label htmlFor="material-amount">Material Amount:</label>
          <input
            type="number"
            id="material-amount"
            name="amount"
            min="1"
            placeholder="Enter amount"
          />
        </div>
        <div>
          <label htmlFor="material-unit">Material Unit:</label>
          <input
            type="text"
            id="material-unit"
            name="unit"
            placeholder="Enter unit"
          />
        </div>
        <div>
          <label htmlFor="material-item">Material Item:</label>
          <input
            type="text"
            id="material-item"
            name="item"
            placeholder="Enter item"
          />
        </div>
        <button
          type="button"
          onClick={handleAddMaterial}
        >
          Add Material
        </button>
        <ul>
          {materialList.map((material, index) => (
            <li key={index}>
              {material.amount} {material.unit} of {material.item}
              <button
                type="button"
                onClick={() => handleEditMaterial(index)}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDeleteMaterial(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div>
          <label htmlFor="direction-step">Direction Step:</label>
          <input
            type="number"
            id="direction-step"
            name="step"
            min="1"
            placeholder={`Enter step ${
              selectedCraft
                ? selectedCraft.directions.length + 1
                : directions.length + 1
            }`}
            defaultValue={
              selectedCraft
                ? selectedCraft.directions.length + 1
                : directions.length + 1
            }
          />
        </div>
        <div>
          <label htmlFor="direction-description">Direction Description:</label>
          <input
            type="text"
            id="direction-description"
            placeholder="Enter description"
          />
        </div>
        <div>
          <label htmlFor="direction-image">Direction Image URL:</label>
          <input
            type="text"
            id="direction-image"
            name="stepImg"
            placeholder="Enter image URL"
          />
        </div>
        <button
          type="button"
          onClick={handleAddDirection}
        >
          Add Direction
        </button>
        <ol>
          {directions
            .sort((a, b) => a.step - b.step)
            .map((direction, index) => (
              <li key={index}>
                Step {direction.step}: {direction.direction}
                <button
                  type="button"
                  onClick={() => handleEditDirection(index)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteDirection(index)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDirectionUp(index)}
                >
                  Move Up
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDirectionDown(index)}
                >
                  Move Down
                </button>
              </li>
            ))}
        </ol>
        <button type="submit">
          {selectedCraft ? "Update Craft" : "Submit New Craft"}
        </button>
      </form>
      {selectedCraft ? (
        <Link to={`/crafts/${selectedCraft._id}`}>
          <button>Cancel</button>
        </Link>
      ) : (
        <Link to="/crafts">
          <button>Cancel</button>
        </Link>
      )}
    </div>
  );
};

export default CraftForm;
