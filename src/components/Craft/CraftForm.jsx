import React, { useState } from "react";

const CraftForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [materials, setMaterials] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, materials });
    setName("");
    setDescription("");
    setMaterials("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Craft Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="materials">Materials:</label>
        <input
          type="text"
          id="materials"
          value={materials}
          onChange={(e) => setMaterials(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Craft</button>
    </form>
  );
};

export default CraftForm;
