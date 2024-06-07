import json

def get_company_data():
    companies = []

    while True:
        print("\nEnter company data:")
        name = input("Company Name: ")
        total_invest = input("Total Invest: ")
        est_risk = input("EstRisk: ")
        est_roi = input("EstROI: ")

        company = {
            "Company Name": name,
            "Total Invest": total_invest,
            "EstRisk": est_risk,
            "EstROI": est_roi
        }

        companies.append(company)

        another = input("Do you want to add another company? (yes/no): ").strip().lower()
        if another != 'yes':
            break

    return companies

def save_to_json(data, filename="company_data.json"):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)
        print(f"\nData saved to {filename}")

def main():
    company_data = get_company_data()
    save_to_json(company_data)

if __name__ == "__main__":
    main()
