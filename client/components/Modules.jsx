import React, {useState, useEffect} from "react";
import BaseLayout from "./BaseLayout";
import connection from "../api";
import { get_modules } from "../api";

function Modules() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    getModulesData();
  }, []);

  const getModulesData = () => {
    get_modules()
      .then(data => {
        setModules(data);
      })
      .catch(error => {
        console.error("Error fetching modules:", error);
      })
  };


  return (
    <BaseLayout>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Beschikbare modules</h1>
            <ul>
              {modules.map(module => (
                <li key={module.id}>
                  <p>{module.module_name}</p>
                  <p>{module.description}</p>
                  <p>{module.progress_indicator}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default Modules;
