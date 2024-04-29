import os
from docx import Document
import json

directory = r'K:\Quality\08600 - Release of Products\Certification of Processes\Templates'

for filename in os.listdir(directory):
    # if filename.endswith('.doc') and '..' in filename:
    if filename.endswith('.doc'):
        print(filename)
        doc_path = os.path.join(directory, filename)
        doc = Document(doc_path)
        
        # Extract the contents of the document
        contents = []
        for paragraph in doc.paragraphs:
            contents.append(paragraph.text)
        
        # Create a JSON file with the contents
        json_filename = filename.replace('..doc', '.json')
        json_path = os.path.join(directory, json_filename)
        with open(json_path, 'w') as json_file:
            json.dump(contents, json_file)


print('Done')
