import pandas as pd

def transform_negative_values(input_file, output_file):
    # Read the CSV file into a DataFrame
    df = pd.read_csv(input_file)

    # Function to transform negative numeric values into their absolute values
    def transform_value(x):
        if pd.notnull(x):
            if isinstance(x, str) and x.startswith('-'):
                try:
                    x = float(x)
                    return abs(x)
                except ValueError:
                    return x
            else:
                return x
        else:
            return x

    # Apply the transformation function to all values in the DataFrame
    df = df.applymap(transform_value)

    # Write the modified DataFrame to a new CSV file
    df.to_csv(output_file, index=False)


# Example usage
input_csv = '/Users/lucabattistella/Downloads/ghsl/api_ghsl_prot_unprot_ts.csv'
output_csv = '/Users/lucabattistella/Downloads/ghsl/api_ghsl_prot_unprot.csv'
transform_negative_values(input_csv, output_csv)
