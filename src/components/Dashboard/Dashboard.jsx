import { AuthedUserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  const { handleSignout } = props;
  const user = useContext(AuthedUserContext);

  return (
    <main>
      <div className="dashboardCard">
        <h1>Welcome, {user.username}</h1>
        <p>Start Crafting!</p>

        <h3>Favorite Crafts</h3>
      </div>
      <Link to="/">
        <button onClick={handleSignout}>Sign out</button>
      </Link>
    </main>
  );
};

export default Dashboard;
