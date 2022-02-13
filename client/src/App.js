import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./containers/Main/Main";
import Nav from "./containers/Nav/Nav";
import Home from "./components/Home/Home";
import CountryDetail from "./components/CountryDetail/CountryDetail";
import AddActivity from "./components/AddActivity/AddActivity";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route
          path="/home"
          element={
            <>
              <Nav />
              <Home />
            </>
          }
        />
        <Route
          path="/country/:id"
          element={
            <>
              <Nav />
              <CountryDetail />
            </>
          }
        />
        <Route
          path="/newActivity"
          element={
            <>
              <Nav />
              <AddActivity />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
