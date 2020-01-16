import React, { useEffect, useState } from "react";

import { Dev } from "../../interfaces/devs";
import api from "../../services/api";
import logo from "../../assets/dev.png";
import "./styles.css";

interface SidebarProps {
  onAfterSave: (dev: Dev) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onAfterSave }) => {
  const [github_username, setGithubUsername] = useState<string>("");
  const [techs, setTechs] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude: lat, longitude: lng } = position.coords;
        setLatitude(lat.toString());
        setLongitude(lng.toString());
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  async function handleSubmitDev(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    const response = await api.post("/devs", {
      github_username,
      techs,
      latitude,
      longitude
    });

    onAfterSave(response.data);

    setGithubUsername("");
    setTechs("");
  }

  return (
    <aside>
      <img src={logo} alt="" />
      <strong>Cadastrar</strong>
      <form>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do Github</label>
          <input
            name="github_username"
            id="github_username"
            required
            value={github_username}
            onChange={e => setGithubUsername(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input
            name="techs"
            id="techs"
            required
            value={techs}
            onChange={e => setTechs(e.target.value)}
          />
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="">Latitude</label>
            <input
              type="number"
              name="latitude"
              id="latitude"
              required
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="">Longitude</label>
            <input
              type="number"
              name="longitude"
              id="longitude"
              required
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" onClick={handleSubmitDev}>
          Salvar
        </button>
      </form>
    </aside>
  );
};

export default Sidebar;
