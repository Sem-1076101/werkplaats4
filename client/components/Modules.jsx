import React, { useState, useEffect } from "react";
import BaseLayout from "./BaseLayout";
import { get_modules } from "../api";

function Modules() {
  const [modules, setModules] = useState(null);

  useEffect(() => {
    getModulesData();
  }, []);

  const getModulesData = () => {
    get_modules()
      .then(modules => {
        console.log(modules)
        setModules(modules);
      })
      .catch(error => {
        console.error("Error fetching modules:", error);
      });
  };

  return (
    <BaseLayout>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Beschikbare modules</h1>
            <div>
              {modules ? (
                modules.map((module, index) => (
                  <div key={index}>
                    <p>{module[1]}</p>
                    <p>{module[2]}</p>
                    <p>{module[3]}</p>
                  </div>
                ))
              ) : (
                <p>Modules nog niet beschikbaar</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default Modules;
