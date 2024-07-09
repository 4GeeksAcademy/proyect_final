import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const Details = () => {
  const { store, actions } = useContext(Context);
  const { category, uid } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let data = null;
      switch (category) {
        case "people":
          data = await actions.getPeople(uid);
          break;
        case "species":
          data = await actions.getSpecies(uid);
          break;
        case "planets":
          data = await actions.getPlanets(uid);
          break;
        default:
          console.error("Invalid category");
      }
      setDetails(data);
    };

    fetchData();
  }, [category, uid, actions]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>{details.name}</h1>
      <ul>
        {Object.entries(details).map(([key, value]) => (
          <li key={key}>
            <strong>{key.replace('_', ' ')}:</strong> {Array.isArray(value) ? value.join(", ") : value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Details;
  