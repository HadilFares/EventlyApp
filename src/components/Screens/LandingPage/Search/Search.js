import React, { useEffect } from "react";
import "./Search.css";
import axios from "axios";
import { variables } from "../../../../variables";
import { useState } from "react";
const Search = () => {
  const [categories, setCategories] = useState([]);

  const Types = [
    { label: "Foire", value: "Foire" },
    { label: "Salons", value: "Salons" },
    { label: "Expositions", value: "Expositions" },
  ];

  const location = [
    { label: "Ariana", value: "Ariana" },
    { label: "Bizerte", value: "Bizerte" },
    { label: "Béja", value: "Beja" },
    { label: "Gabès", value: " Gabes" },
    { label: "Gafsa", value: " Gafsa" },
    { label: "Jendouba", value: "Jendouba" },
    { label: "Ben Arous", value: "Ben Arous" },
    { label: "Kairouan", value: "Kairouan" },
    { label: "Kasserine", value: "Kasserine" },
    { label: "Kébili", value: "Kebili" },
    { label: "Kef", value: "Kasserine" },
    { label: "Kef", value: "Kef" },
    { label: "Mahdia", value: "Mahdia" },
    { label: "Manouba", value: "Manouba" },
    { label: "Médenine", value: "Medenine" },
    { label: "Monastir", value: "Monastir" },
    { label: "Nabeul", value: "Nabeul" },
    { label: "Sfax", value: "Sfax" },
    { label: "Sidi Bouzid", value: "Sidi Bouzid" },
    { label: "Siliana", value: "Siliana" },
    { label: "Sousse", value: "Sousse" },
    { label: "Tataouine", value: "Tataouine" },
    { label: "Tozeur", value: "Tozeur" },
    { label: "Tunis", value: "Tunis" },
    { label: "Tozeur", value: "Tozeur" },
    { label: "Zaghouan", value: "Zaghouan" },
  ];
  const config = {
    headers: {
      "access-control-allow-origin": "*",
      Accept: "application/json",
      "Content-type": "application/json",
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const GetCategories = async () => {
    try {
      const result = await axios.get(
        variables.API_URL + "Category/GetAllNamesCategories",
        config
      );
      setCategories(result.data.reverse());
      console.log("categoriesselect", categories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetCategories();
  }, []);

  return (
    <div className="search-container">
      <input
        className="input-Search"
        id="startDate"
        name="StartDate"
        type="date"
        placeholder="Search Date"
        required
      />

      <select
        className="input-Search"
        id="categorySearch"
        name="categorySearch"
        style={{ height: "35px" }}
      >
        <option value="">Select a category</option>

        {categories.map((option) => (
          <option key={option.value} value={option}>
            {option}
          </option>
        ))}

        {/* Add more options as needed */}
      </select>

      <select
        className="input-Search"
        id="categorySearch"
        name="categorySearch"
        style={{ height: "35px" }}
      >
        <option value="">Select a goverment</option>

        {location.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}

        {/* Add more options as needed */}
      </select>

      <button
        type="submit"
        style={{ marginBottom: "14px", height: "auto", padding: "10px 24px" }}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
