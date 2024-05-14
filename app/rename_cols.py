import pandas as pd
import os

# Function to rename column "isoa3_id_1" to "iso3" in a CSV file
def rename_column(csv_file):
    # Read CSV file into a DataFrame
    df = pd.read_csv(csv_file)
    
    # Rename column "isoa3_id_1" to "iso3"
    if 'iso3_' in df.columns:
        df.rename(columns={'iso3_': 'iso3'}, inplace=True)
    
    # Write DataFrame back to the same CSV file
    df.to_csv(csv_file, index=False)

# Folder containing CSV files
folder_path = '/Users/lucabattistella/Downloads/fires2'

# Loop through all files in the folder
for file in os.listdir(folder_path):
    if file.endswith('.csv'):
        file_path = os.path.join(folder_path, file)
        rename_column(file_path)
