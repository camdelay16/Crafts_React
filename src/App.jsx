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
import CraftForm from "./components/Craft/CraftForm";
import SignUp from "./components/User/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import SignIn from "./components/User/SignIn";
import CraftReviewForm from "./components/Craft/CraftReviewForm";

export const AuthedUserContext = createContext(null);

function App() {
  const [user, setUser] = useState(userService.getUser());
  const [craftList, setCraftList] = useState([]);
  const [searchCraft, setSearchCraft] = useState([]);
  const [selectedCraft, setSelectedCraft] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(null);
  const [toggle, setToggle] = useState(false);

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
  }, [selectedCraft, toggle]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setToggle((prevToggle) => !prevToggle);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [toggle]);

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

  const handleSignout = () => {
    userService.signout();
    setUser(null);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <Header
          setToggle={setToggle}
          handleSignout={handleSignout}
        />
        <Routes>
          {user ? (
            <>
              <Route
                path="/"
                element={<Dashboard handleSignout={handleSignout} />}
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
                    setToggle={setToggle}
                  />
                }
              />

              <Route
                path="/crafts/craftform"
                element={
                  <CraftForm
                    selectedCraft={selectedCraft}
                    setSelectedCraft={setSelectedCraft}
                    craftList={craftList}
                    setCraftList={setCraftList}
                    setToggle={setToggle}
                  />
                }
              />
              <Route
                path="/crafts/:craftId"
                element={
                  <CraftDetail
                    selectedCraft={selectedCraft}
                    setSelectedCraft={setSelectedCraft}
                    setCraftList={setCraftList}
                    craftList={craftList}
                  />
                }
              />
              <Route
                path="/crafts/review"
                element={
                  <CraftReviewForm
                    selectedCraft={selectedCraft}
                    setSelectedCraft={setSelectedCraft}
                    setCraftList={setCraftList}
                    craftList={craftList}
                  />
                }
              />
            </>
          ) : (
            <Route
              path="/"
              element={<Home />}
            />
          )}
          <Route
            path="/crafts"
            element={
              <>
                <Navbar
                  handleViewCraft={handleViewCraft}
                  craftList={craftList}
                  setCraftList={setCraftList}
                />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <SignUp
                user={user}
                setUser={setUser}
                setToggle={setToggle}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <SignIn
                user={user}
                setUser={setUser}
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
