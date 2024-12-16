import React, { useState } from 'react';
import axios from 'axios';
import { Combobox } from './ui/Combobox';

function App() {
  const regions = ["NULL","West", "South", "North"];
  const soilTypes = ["NULL","Sandy", "Clay", "Loam", "Silt"];
  const crops = ["NULL","Cotton", "Rice", "Barley", "Soybean", "Wheat"];
  const fertilizerOptions = ["NULL","YES", "NO"];
  const irrigationOptions = ["NULL","YES", "NO"];
  const weatherConditions = ["NULL","Cloudy", "Rainy", "Sunny"];
  const rainfallCategories = ["NULL","Moderate Rainfall", "Low Rainfall"];
  const temperatureCategories = ["NULL","Moderate Temp", "Low Temp", "High Temp"];
  const harvestTimeCategories = ["NULL","Medium Harvest", "Short Harvest"];
  const yieldCategories = ["NULL","High", "Very High", "Low", "Medium"];

  const [formData, setFormData] = useState({
    region: "NULL",
    soil_type: "NULL",
    crop: "NULL",
    fertilizer_used: "NULL",
    irrigation_used: "NULL",
    weather_condition: "NULL",
    rainfall_category: "NULL",
    temperature_category: "NULL",
    harvest_time_category: "NULL",
    yield_category: "NULL"
  });

  const [recommendations, setRecommendations] = useState(["Fertilizer_Used", "Irrigation_Used"]);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/recommend/', formData);

      setRecommendations(response.data.recommended_crops);
      console.log(response.data.recommended_crops);
      setShowOverlay(true);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Agricultural Data Form</h2>
      <form onSubmit={handleSubmit}>
        <Combobox
          options={regions}
          value={formData.region}
          onChange={(value) => handleChange('region', value)}
          label="Region"
        />
        <Combobox
          options={soilTypes}
          value={formData.soil_type}
          onChange={(value) => handleChange('soil_type', value)}
          label="Soil Type"
        />
        <Combobox
          options={crops}
          value={formData.crop}
          onChange={(value) => handleChange('crop', value)}
          label="Crop"
        />
        <Combobox
          options={fertilizerOptions}
          value={formData.fertilizer_used}
          onChange={(value) => handleChange('fertilizer_used', value)}
          label="Fertilizer Used"
        />
        <Combobox
          options={irrigationOptions}
          value={formData.irrigation_used}
          onChange={(value) => handleChange('irrigation_used', value)}
          label="Irrigation Used"
        />
        <Combobox
          options={weatherConditions}
          value={formData.weather_condition}
          onChange={(value) => handleChange('weather_condition', value)}
          label="Weather Condition"
        />
        <Combobox
          options={rainfallCategories}
          value={formData.rainfall_category}
          onChange={(value) => handleChange('rainfall_category', value)}
          label="Rainfall Category"
        />
        <Combobox
          options={temperatureCategories}
          value={formData.temperature_category}
          onChange={(value) => handleChange('temperature_category', value)}
          label="Temperature Category"
        />
        <Combobox
          options={harvestTimeCategories}
          value={formData.harvest_time_category}
          onChange={(value) => handleChange('harvest_time_category', value)}
          label="Harvest Time Category"
        />
        <Combobox
          options={yieldCategories}
          value={formData.yield_category}
          onChange={(value) => handleChange('yield_category', value)}
          label="Yield Category"
        />
        <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </form>

      {showOverlay && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center ">
          <div className="bg-white p-8 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Recommended Crops</h3>
            <ul>
              {recommendations?.length > 0 ? (
                recommendations.map((crop, index) => (
                  <li key={index} className="text-lg">{crop}</li>
                ))
              ) : (
                <li>No recommendations available.</li>
              )}
            </ul>
            <button
              onClick={closeOverlay}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
