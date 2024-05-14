import pandas as pd

def lowercase_column_names(csv_file_path):
    # Read the CSV file into a DataFrame
    df = pd.read_csv(csv_file_path)

    # Convert column names to lowercase
    df.columns = df.columns.str.lower()

    # Write the modified DataFrame back to the CSV file
    df.to_csv(csv_file_path, index=False)

    print(f"All column names converted to lowercase in {csv_file_path}")

# Provide the path to your CSV file
csv_file_path = "/Users/lucabattistella/Downloads/burned/joined.csv"
lowercase_column_names(csv_file_path)