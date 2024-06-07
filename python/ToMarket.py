import json
import matplotlib.pyplot as plt
import numpy as np

def read_company_data(filename="company_data.json"):
    with open(filename, 'r') as file:
        return json.load(file)

def simulate_investment_changes(companies, quarters=36):
    company_simulations = []

    for company in companies:
        name = company["Company Name"]
        total_invest = float(company["Total Invest"])
        est_risk = float(company["EstRisk"])
        est_roi = float(company["EstROI"])

        investments = [total_invest]
        for _ in range(quarters - 1):
            change = np.random.uniform(est_roi - est_risk*1.2, est_roi*0.8 + est_risk)
            total_invest += change
            investments.append(total_invest)

        company_simulations.append({
            "Company Name": name,
            "Investments": investments
        })

    return company_simulations

def plot_investments_over_time(company_data, quarters=36):
    fig, axs = plt.subplots(2, 2, figsize=(12, 8))
    x_values = range(1, quarters + 1)

    for i in range(4):
        company_simulations = simulate_investment_changes(company_data, quarters)
        ax = axs[i // 2, i % 2]
        for company_simulation in company_simulations:
            name = company_simulation["Company Name"]
            investments = company_simulation["Investments"]
            ax.plot(x_values, investments, label=name)
        ax.set_xlabel('')
        ax.set_ylabel('Total Invest')
        ax.set_title(f'Total Invest Over Time by Company (Simulation {i + 1})')
        ax.legend()
        ax.grid(True)

    plt.tight_layout()
    plt.show()

def main():
    company_data = read_company_data()
    plot_investments_over_time(company_data)

if __name__ == "__main__":
    main()
