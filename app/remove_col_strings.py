import pandas as pd

# Function to remove "_sum" suffix from column names, remove empty columns, and rename the first column
def process_csv(csv_file):
    # Read CSV file into a DataFrame
    df = pd.read_csv(csv_file)
    
    # Remove "_sum" suffix from column names
    df.columns = df.columns.str.replace('_sum', '')
    
    # Rename the first column to "iso3"
    df.rename(columns={df.columns[0]: 'iso3'}, inplace=True)
    
    # Drop empty columns
    df = df.dropna(axis=1, how='all')
    
    # Write DataFrame back to the same CSV file
    df.to_csv(csv_file, index=False)

# Path to the CSV file
csv_file_path = '/Users/lucabattistella/Downloads/burned/joined.csv'

# Process the CSV file
process_csv(csv_file_path)
