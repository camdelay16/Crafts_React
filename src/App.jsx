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
  const [searchCraft, setSearchCraft] = useState([]);
  const [selectedCraft, setSelectedCraft] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(null);

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

  const searchCrafts = () => {
    try {
      if (!searchText.trim()) {
        setSearchCraft(craftList);
        return;
      }
      const filteredCrafts = craftList.filter((craft) =>
        craft.craftName.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchCraft(filteredCrafts);
      console.log("crafts", searchCraft);
    } catch (error) {
      console.error("Error fetching crafts:", error);
      setError("No results found.");
    }
  };

  const clearSearch = () => {
    setSearchText("");
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <HeaderSearch
          craftList={craftList}
          searchCrafts={searchCrafts}
          searchText={searchText}
          setSearchText={setSearchText}
          clearSearch={clearSearch}
        />
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
                  searchCraft={searchCraft}
                  setSearchCraft={setSearchCraft}
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
