import React, { useState } from "react";
import Form from "./components/Form";
import axios from "axios";
import CreativeDesign from "./components/CreativeDesign";

function App() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [formData, setFormData] = useState({
    Region: "NULL",
    "Soil Type": "NULL",
    Crop: "NULL",
    Fertilizer: "NULL",
    Irrigation: "NULL",
    Weather: "NULL",
    Rainfall: "NULL",
    Temperature: "NULL",
    // harvest_time_category: "NULL",
  });
  const [recommendations, setRecommendations] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out fields with "NULL" values
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "NULL")
    );

    console.log("Filtered Data:", filteredData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/recommend/",
        filteredData
      );

      setRecommendations(response.data);
      console.log(response.data);
      setShowOverlay(true);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-1/2 p-8 overflow-auto">
        <Form
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          setShowOverlay={setShowOverlay}
        />
      </div>
      <div className="w-1/2">
        <CreativeDesign
          yield_amount={recommendations.expected_yield}
          message={recommendations.message}
        />
      </div>
    </div>
  );
}

export default App;
