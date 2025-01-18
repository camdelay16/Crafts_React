import { useState, useEffect, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/HeaderSearch/Header";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import CraftDetail from "./components/Craft/CraftDetail";
import Footer from "./components/Footer/Footer";
import * as craftService from "./services/craftService";
import * as userService from "./services/userService";
import Search from "./components/Search/Search";

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
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/search"
            element={
              <Search
                craftList={craftList}
                searchCrafts={searchCrafts}
                searchText={searchText}
                setSearchText={setSearchText}
                clearSearch={clearSearch}
                searchCraft={searchCraft}
                setSearchCraft={setSearchCraft}
                handleViewCraft={handleViewCraft}
              />
            }
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
            path="/crafts/craftform"
            element={
              <CraftDetail
                selectedCraft={selectedCraft}
                setSelectedCraft={setSelectedCraft}
              />
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
