import json
from icecream import ic

# Read the contents of the specs.json file
with open('templates.json', 'r') as file:
    data = json.load(file)

# Extract the unique weld, chem, and paint specs
weld_specs = set()
chem_specs = set()
paint_specs = set()

for item in data:
    itemobject  = data[item]
    ic(itemobject)
    if 'chemspec' in itemobject:
        chemspec = itemobject['chemspec']
        ic(chemspec)
    # for key, value in item.items():
    #     if key == 'weld':
    #         weld_specs.add(value)
    #     elif key == 'chem':
    #         chem_specs.add(value)
    #     elif key == 'paint':
    #         paint_specs.add(value)
    # # go through each item in the object
    # for key, value in item{'weld', 'chem', 'paint'}:
    #     # ic(key, value)
    #     if key == 'weld':
    #         weld_specs.add(value)
    #     elif key == 'chem':
    #         chem_specs.add(value)
    #     elif key == 'paint':
    #         paint_specs.add(value)
#     for key, value in item:
#         if key == 'weld':
#             weld_specs.add(value)
#         elif key == 'chem':
#             chem_specs.add(value)
#         elif key == 'paint':
#             paint_specs.add(value)
#     # icecream the chemspec value
#     # ic(item['chem'])
# #     weld_specs.add(item.get('weld'))
# #     chem_specs.add(item.get('chem'))
# #     paint_specs.add(item.get('paint'))

# Print the unique weld, chem, and paint specs
print("Unique Weld Specs:", weld_specs)
print("Unique Chem Specs:", chem_specs)
print("Unique Paint Specs:", paint_specs)