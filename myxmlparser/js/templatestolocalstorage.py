import os
import json

# Directory path
directory = "K:/Quality/08600 - Release of Products/Certification of Processes/Templates/Templates_json"

# Output file path
output_file = "templates.json"

# List to store the contents of each file
file_contents = []
combined_data = {}

# Iterate over each file in the directory
for filename in os.listdir(directory):
    pid = filename[:-5]
    file_path = os.path.join(directory, filename)
    if os.path.isfile(file_path):
        with open(file_path, "r") as file:
            combined_data[pid] = json.load(file)
print(combined_data)

# Write the combined data to the output file
with open(output_file, "w") as file:
    json.dump(combined_data, file)

