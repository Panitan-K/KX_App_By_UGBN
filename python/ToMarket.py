from flask import Flask, jsonify
from flask_cors import CORS
import json
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def read_company_data(filename="./python/company_data.json"):
    try:
        with open(filename, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []

def simulate_investment_changes(companies, quarters=2):
    company_simulations = []

    for company in companies:
        name = company["Company Name"]  # Remove newline
        total_invest = float(company["Total Invest"])
        est_risk = float(company["EstRisk"])
        est_roi = float(company["EstROI"])

        investments = [total_invest]
        for q in range(quarters - 1):  # Simulate up to the specified quarter
            change = np.random.uniform(est_roi - (est_risk * 1.5), est_roi * 0.8 + est_risk)
            total_invest = total_invest+(total_invest * change /100)
            investments.append(round(total_invest, 2))  # Round to two decimal places

        company_simulations.append({
            "Company": name,
            "Evaluation": round(investments[-1], 2)  # Round to two decimal places
        })

    return company_simulations

def simulate_multiple_quarters(companies, num_quarters):
    simulations = {}
    prev_simulations = simulate_investment_changes(companies, quarters=1)
    simulations["Q1"] = prev_simulations

    for q in range(2, num_quarters + 1):
        current_simulations = simulate_investment_changes(companies, quarters=q)
        simulations[f"Q{q}"] = current_simulations

    return simulations

def save_simulated_data_to_file(simulated_data, filename="./python/TESTRUN.json"):
    with open(filename, 'w') as file:
        json.dump(simulated_data, file, indent=4)

@app.route('/api/investment-data', methods=['GET'])
def get_investment_data():
    try:
        with open("TESTRUN.json", 'r') as file:
            simulated_data = file.read()
        return jsonify(simulated_data)
    except FileNotFoundError:
        return jsonify({"error": "Simulated data not found"}), 404

if __name__ == "__main__":
    # Precompute the simulation data upon server start
    company_data = read_company_data()
    
    # Specify the number of quarters
    num_quarters = 16
    
    # Simulate data for all quarters
    simulated_data = simulate_multiple_quarters(company_data, num_quarters)
    
    # Convert to desired data structure and round evaluation values
    formatted_data = {}
    for key, value in simulated_data.items():
        formatted_data[key] = [{"Company": company["Company"], "Evaluation": round(company["Evaluation"], 2)} for company in value]
    
    save_simulated_data_to_file(formatted_data)
    
    app.run(debug=True)
