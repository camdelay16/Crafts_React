import { useState, useEffect, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HeaderSearch from "./components/HeaderSearch/HeaderSearch";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import CraftDetail from "./components/Craft/CraftDetail";
import Footer from "./components/Footer/Footer";
import * as craftService from "./services/craftService";
import * as userService from "./services/userService";

export const AuthedUserContext = createContext(null);

function App() {
  const [user, setUser] = useState(userService.getUser());
  const [craftList, setCraftList] = useState([]);
  const [selectedCraft, setSelectedCraft] = useState(null);

  useEffect(() => {
    const getCrafts = async () => {
      try {
        const crafts = await craftService.index();
        if (crafts.error) {
          throw new Error(crafts.error);
        }
        setCraftList(crafts);
      } catch (error) {
        console.log(error);
      }
    };
    getCrafts();
  }, [selectedCraft]);

  const handleViewCraft = (craftItem) => {
    setSelectedCraft(craftItem);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <HeaderSearch />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/crafts"
            element={
              <>
                <Navbar
                  handleViewCraft={handleViewCraft}
                  craftList={craftList}
                />
              </>
            }
          />
          <Route
            path="/crafts/:craftId"
            element={
              <CraftDetail
                selectedCraft={selectedCraft}
                setSelectedCraft={setSelectedCraft}
              />
            }
          />
        </Routes>

        <Footer />
      </AuthedUserContext.Provider>
    </>
  );
}

export default App;
