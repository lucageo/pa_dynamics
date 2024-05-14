import pandas as pd
import os

def remove_empty_columns(csv_dir):
    # Get a list of all CSV files in the directory
    csv_files = [f for f in os.listdir(csv_dir) if f.endswith('.csv')]

    # Iterate over each CSV file and remove empty columns
    for file_name in csv_files:
        file_path = os.path.join(csv_dir, file_name)
        df = pd.read_csv(file_path)
        # Remove empty columns
        df = df.dropna(axis=1, how='all')
        # Write the modified DataFrame back to the CSV file
        df.to_csv(file_path, index=False)

# Example usage
csv_directory = '/Users/lucabattistella/Downloads/fires2'
remove_empty_columns(csv_directory)


