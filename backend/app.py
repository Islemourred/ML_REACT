from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import pandas as pd
from starlette.middleware.cors import CORSMiddleware

import os
ruleset = pd.read_csv('rules/rules_app_filtered.csv')
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    path = "rules.csv"
    rules = pd.read_csv(path)
    print("CSV Loaded Successfully")
except Exception as e:
    print(f"Error loading CSV: {e}")

# # Define request model
# class FormData(BaseModel):
#     region: str
#     soil_type: str
#     crop: str
#     fertilizer_used: str
#     irrigation_used: str
#     weather_condition: str
#     rainfall_category: str
#     temperature_category: str
#     harvest_time_category: str
#     yield_category: str


# def get_union_of_matching_consequents(antecedents, rules_df, top_n=5):
#     print(antecedents)
#     """
#     Returns a union of unique consequent items from the rules that best match the given antecedents.
#     """
#     antecedents_set = frozenset(antecedents)
#     rules_df['antecedents_set'] = rules_df['antecedents'].apply(lambda x: frozenset(eval(x)))

#     # Find matching rules
#     matched_rules = rules_df[rules_df['antecedents_set'].apply(lambda x: antecedents_set.issubset(x))]

#     if matched_rules.empty:
#         return ['No matching rules found']

#     # Select unique consequents by confidence
#     matched_rules['consequents_set'] = matched_rules['consequents'].apply(lambda x: frozenset(eval(x)))
#     unique_rules = matched_rules.sort_values(by='confidence', ascending=False).drop_duplicates(subset='consequents_set')

#     top_rules = unique_rules.head(top_n)
#     consequents_union = set()

#     for consequents_set in top_rules['consequents_set']:
#         consequents_union.update(consequents_set)

#     return list(consequents_union)









# @app.post("/recommend/")
# async def recommend(form_data: FormData):
#     try:
#         # Create antecedents list from the form data
#         antecedents = [
#             form_data.region,
#             form_data.soil_type,
#             form_data.crop,
#             form_data.fertilizer_used,
#             form_data.irrigation_used,
#             form_data.weather_condition,
#             form_data.rainfall_category,
#             form_data.temperature_category,
#             form_data.harvest_time_category,
#             form_data.yield_category
#         ]
#         print(antecedents)
#         # Get recommendations using the custom function
#         recommendations = get_union_of_matching_consequents(antecedents, rules, top_n=5)

#         return {"recommended_crops": recommendations}

#     except Exception as e:
#         print(f"Error: {e}")
#         raise HTTPException(status_code=500, detail=str(e))










def preprocess_input(raw_input):
    # Expanded mapping for standardization
    mapping = {
        "Rainfall": {
            "Low": "Rainfall_Category_Low",
            "Medium": "Rainfall_Category_Medium",
            "High": "Rainfall_Category_High",
            "Very High": "Rainfall_Category_Very High"
        },
        "Temperature": {
            "Hot": "Temperature_Category_Hot",
            "Warm": "Temperature_Category_Warm",
            "Mild": "Temperature_Category_Mild"
        },
        "Irrigation": {
            "Yes": "Irrigation_Used",
            "No": "Irrigation_Not_Used"
        },
        "Fertilizer": {
            "Yes": "Fertilizer_Used",
            "No": "Fertilizer_Not_Used"
        },
        "Region": {
            "North": "Region_North",
            "South": "Region_South",
            "West": "Region_West",
            "East": "Region_East"
        },
        "Soil Type": {
            "Chalky": "Soil_Type_Chalky",
            "Loam": "Soil_Type_Loam",
            "Peaty": "Soil_Type_Peaty",
            "Sandy": "Soil_Type_Sandy",
            "Silt": "Soil_Type_Silt"
        },
        "Crop": {
            "Wheat": "Crop_Wheat",
            "Corn": "Crop_Corn",
            "Rice": "Crop_Rice",
            "Barley": "Crop_Barley",
            "Soybean": "Crop_Soybean"
        },
        "Weather": {
            "Sunny": "Weather_Sunny",
            "Rainy": "Weather_Rainy",
            "Cloudy": "Weather_Cloudy",
            "Stormy": "Weather_Stormy"
        }
    }
    
    standardized_input = {}
    for key, value in raw_input.items():
        if key in mapping:
            standardized_value = mapping[key].get(value, value)
            standardized_input[key.replace(" ", "_")] = standardized_value
        else:
            standardized_input[key] = value
    return standardized_input


@app.post("/recommend")
def recommend(input_data: dict):
    try:
        # Check if the input is empty
        if not input_data or input_data == []:
            return {"message": "Input is empty. Please provide valid input data for recommendations."}

        ppdata = preprocess_input(input_data)
        
        # Step 1: Convert user input to a frozenset format for comparison
        user_input = frozenset(ppdata.values())

        # Step 2: Match rules where antecedents are a superset of the user input
        matched_rules = ruleset[ruleset['antecedents'].apply(lambda x: eval(x).issuperset(user_input))]

        # Step 3: Identify the rule with the highest confidence
        if matched_rules.empty:
            return {"message": "No matching rules found.", "rules": [], "user_input": list(user_input)}

        top_rule = matched_rules.sort_values(by='confidence', ascending=False).iloc[0]

        # Step 4: Extract and return the expected yield
        expected_yield = list(eval(top_rule['consequents']))[0]  # Extract first consequent
        confidence = top_rule['confidence']

        return {
            "expected_yield": expected_yield,
            "confidence": confidence,
            "rules": matched_rules.to_dict(orient='records')
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
