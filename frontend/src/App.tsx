import React, { useState, useEffect } from "react";

import "./global.css";
import "./app.css";
import "./main.css";

import Sidebar from "./components/Sidebar";
import User from "./components/User";
import api from "./services/api";

import { Dev } from "./interfaces/devs";

const App: React.FC = () => {
  const [devs, setDevs] = useState<Dev[]>([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  function onAfterSave(dev: Dev) {
    setDevs(prevState => [...prevState, dev]);
  }

  return (
    <div id="app">
      <div className="background" />
      <div className="background-round" />
      <Sidebar onAfterSave={onAfterSave} />
      <main>
        <ul>
          {devs?.map(dev => (
            <User key={dev._id} data={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
