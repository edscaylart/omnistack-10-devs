import React from "react";

// import { Container } from './styles';
import "./styles.css";
import { Dev } from "../../interfaces/devs";

interface UserProps {
  data: Dev;
}

const User: React.FC<UserProps> = ({ data }) => {
  return (
    <li className="dev-item">
      <header>
        <img src={data.avatar_url} alt="" />
        <div className="user-info">
          <strong>{data.name}</strong>
          <p>{data.bio}</p>
        </div>
      </header>
      <div className="wrap">
        <ul className="tags">
          {data.techs.map(tech => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
        </ul>
      </div>
      <a href={`https://github.com/${data.github_username}`} target="blank">
        Acessar perfil no Github
      </a>
    </li>
  );
};

export default User;
