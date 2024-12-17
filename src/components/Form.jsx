import React, { useState } from "react";

import { Combobox } from "./ui/Combobox";

function Form({ onSubmit, formData, setFormData, setShowOverlay }) {
  const regions = ["NULL", "North", "South", "West", "East"];
  const soilTypes = ["NULL", "Chalky", "Loam", "Peaty", "Sandy", "Silt"];
  const crops = ["NULL", "Wheat", "Corn", "Rice", "Barley", "Soybean"];
  const fertilizerOptions = ["NULL", "Yes", "No"];
  const irrigationOptions = ["NULL", "Yes", "No"];
  const weatherConditions = ["NULL", "Cloudy", "Rainy", "Sunny", "Stormy"];
  const rainfallCategories = ["NULL", "Low", "Medium", "High", "Very High"];
  const temperatureCategories = ["NULL", "Mild", "Warm", "Hot"];
  // const harvestTimeCategories = ["NULL", "Short Harvest", "Medium Harvest"];
  const yieldCategories = ["NULL", "Low", "Medium", "High", "Very High"];

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Agricultural Data Form
      </h2>
      <form onSubmit={onSubmit}>
        <Combobox
          options={regions}
          value={formData.region}
          onChange={(value) => handleChange("Region", value)}
          label="Region"
        />
        <Combobox
          options={soilTypes}
          value={formData.soil_type}
          onChange={(value) => handleChange("Soil Type", value)}
          label="Soil Type"
        />
        <Combobox
          options={crops}
          value={formData.crop}
          onChange={(value) => handleChange("Crop", value)}
          label="Crop"
        />
        <Combobox
          options={fertilizerOptions}
          value={formData.fertilizer_used}
          onChange={(value) => handleChange("Fertilizer", value)}
          label="Fertilizer Used"
        />
        <Combobox
          options={irrigationOptions}
          value={formData.irrigation_used}
          onChange={(value) => handleChange("Irrigation", value)}
          label="Irrigation Used"
        />
        <Combobox
          options={weatherConditions}
          value={formData.weather_condition}
          onChange={(value) => handleChange("Weather", value)}
          label="Weather Condition"
        />
        <Combobox
          options={rainfallCategories}
          value={formData.rainfall_category}
          onChange={(value) => handleChange("Rainfall", value)}
          label="Rainfall Category"
        />
        <Combobox
          options={temperatureCategories}
          value={formData.temperature_category}
          onChange={(value) => handleChange("Temperature", value)}
          label="Temperature Category"
        />
        {/* <Combobox
          options={harvestTimeCategories}
          value={formData.harvest_time_category}
          onChange={(value) => handleChange("harvest_time_category", value)}
          label="Harvest Time Category"
        /> */}
        <Combobox
          options={yieldCategories}
          value={formData.yield_category}
          onChange={(value) => handleChange("yield_category", value)}
          label="Yield Category"
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>

      {/* {showOverlay && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center ">
          <div className="bg-white p-8 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Recommended Crops</h3>
            <ul>
              {recommendations.expected_yield}
            </ul>
            <button
              onClick={closeOverlay}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Form;
