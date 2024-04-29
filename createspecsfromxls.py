import os
import pandas as pd
import json
import math
import re

def fixpn(pn):
    """Return part numbers and remove the pn prefix with regex"""
    fixedpn = re.sub(r'P.N. ', '', pn)
    fixedpn = fixedpn.strip()
    return fixedpn


directory = r'K:\Quality\08600 - Release of Products\Certification of Processes\Templates'
output_directory = r'K:\Quality\08600 - Release of Products\Certification of Processes\Templates'

for filename in os.listdir(directory):
    insp = {}
    debu = []
    form = []
    mark = []
    lot = []
    chem = []
    heat= []
    weld = []
    paint = []
    psvt = []
    pt = []
    

    if filename.endswith('..xls'):
        print(filename)
        file_path = os.path.join(directory, filename)
        df = pd.read_excel(file_path)
        # # print the rows of the dataframe
        # for row in df:
        #     if row == 'Unnamed: 3':
        #         # print the value for the row key
        #         print(df[row][16])

        # iterate the rows
        section = 'HEADER'
        for index, row in df.iterrows():
            # print(index)
            if row['Unnamed: 3'] == 'PURCHASE ORDER/LOT NUMBERS':
                section = 'LOT'
                print("---PURCHASE ORDER/LOT NUMBERS---")

            if row['Unnamed: 3'] == 'CHEMICAL CONVERSION COATING':
                section = 'CHEM'
                print("---CHEMICAL CONVERSION COATING---")

            if "DEBU" in str(row['Unnamed: 3']):
                section = 'DEBU'
                print("---DEBURRING---")
            
            if "FORM" in str(row['Unnamed: 3']):
                section = 'FORM'
                print("---FORMING---")

            if "MARK" in str(row['Unnamed: 3']):
                section = 'MARK'
                print("---MARKING---")

            if "WELD" in str(row['Unnamed: 3']):
                section = 'WELD'
                print("---WELDING---")

            if row['Unnamed: 3'] == 'HEAT TREAT':
                section = 'HEAT'
                print("---HEAT TREATMENT---")
            
            if row['Unnamed: 3'] == 'PAINT':
                section = 'PAINT'
                print("---PAINT---")

            if row['Unnamed: 3'] == 'PASSIVATION':
                section = 'PASS'
                print("---PASSIVATION---")

            if "PENETRANT" in str(row['Unnamed: 3']):
                section = 'PT'
                print("---PENETRANT---")

            if row[' '] == 'SPECIFICATION:':
                match section:
                    case 'CHEM':
                        insp['chemspec'] = row['Unnamed: 4']
                    case 'DEBU':
                        insp['debuspec'] = row['Unnamed: 4']
                    case 'FORM':
                        insp['formspec'] = row['Unnamed: 4']
                    case 'HEAT':
                        insp['heatspec'] = row['Unnamed: 4']
                    case 'MARK':
                        insp['markspec'] = row['Unnamed: 4']
                    case 'PAINT':
                        insp['paintspec'] = row['Unnamed: 4']
                    case 'PASS':
                        insp['passspec'] = row['Unnamed: 4']
                    case 'PT':
                        insp['ptspec'] = row['Unnamed: 4']
                    case 'WELD':
                        insp['weldspec'] = row['Unnamed: 4']
                    case _:
                        print(row['Unnamed: 4'])                        

            
            match section:
                case 'HEADER':
                    pass
                    # print('HEADER')

                case 'LOT':
                    if str(row['Unnamed: 2']) != 'nan' and row['Unnamed: 2'] != 'PART NUMBER/DESCRIPTION':
                        # print(row['Unnamed: 2'])
                        upn = fixpn(row['Unnamed: 2'])
                        lot.append(upn)

                case 'CHEM':
                    if str(row['Unnamed: 2']) != 'nan' and row['Unnamed: 2'] != 'PART NUMBER/DESCRIPTION':
                        # print(row['Unnamed: 2'])
                        upn = fixpn(row['Unnamed: 2'])
                        if upn not in chem:
                            chem.append(upn)
                
                case 'DEBU':
                    if str(row['Unnamed: 2']) != 'nan' and row['Unnamed: 2'] != 'PART NUMBER/DESCRIPTION':
                        # print(row['Unnamed: 2'])
                        upn = fixpn(row['Unnamed: 2'])
                        if upn not in debu:
                            debu.append(upn)

                case 'FORM':
                    if str(row['Unnamed: 2']) != 'nan' and row['Unnamed: 2'] != 'PART NUMBER/DESCRIPTION':
                        # print(row['Unnamed: 2'])
                        upn = fixpn(row['Unnamed: 2'])
                        if upn not in form:
                            form.append(upn)

                case 'HEAT':
                    if str(row['Unnamed: 2']) != 'nan' and row['Unnamed: 2'] != 'PART NUMBER/DESCRIPTION':
                        # print(row['Unnamed: 2'])
                        upn = fixpn(row['Unnamed: 2'])
                        if upn not in heat:
                            heat.append(upn)

                case 'MARK':
                    if str(row['Unnamed: 2']) != 'nan' and row['Unnamed: 2'] != 'PART NUMBER/DESCRIPTION':
                        # print(row['Unnamed: 2'])
                        upn = fixpn(row['Unnamed: 2'])
                        if upn not in mark:
                            mark.append(upn)
                
                case 'WELD':
                    if str(row['Unnamed: 2']) != 'nan' and row['Unnamed: 2'] != 'PART NUMBER/DESCRIPTION':
                        # print(row['Unnamed: 2'])
                        upn = fixpn(row['Unnamed: 2'])
                        if upn not in weld:
                            weld.append(upn)
                
                case 'PAINT':
                    if str(row['Unnamed: 2']) != 'nan' and row['Unnamed: 2'] != 'PART NUMBER/DESCRIPTION':
                        # print(row['Unnamed: 2'])
                        upn = fixpn(row['Unnamed: 2'])
                        if upn not in paint:
                            paint.append(upn)

                case 'PASS':
                    if str(row['Unnamed: 2']) != 'nan' and row['Unnamed: 2'] != 'PART NUMBER/DESCRIPTION':
                        # print(row['Unnamed: 2'])
                        upn = fixpn(row['Unnamed: 2'])
                        if upn not in psvt:
                            psvt.append(upn)
                
                case 'PT':
                    if str(row['Unnamed: 2']) != 'nan' and row['Unnamed: 2'] != 'PART NUMBER/DESCRIPTION':
                        # print(row['Unnamed: 2'])
                        upn = fixpn(row['Unnamed: 2'])
                        if upn not in pt:
                            pt.append(upn)

                case _:
                    print('DEFAULT')
            
            # pn = fixpn(row['Unnamed: 2'])
                
            
        
        insp['lot'] = lot
        if len(chem) > 0:
            insp['chem'] = chem
        if len(debu) > 0:
            insp['debu'] = debu
        if len(form) > 0:
            insp['form'] = form
        if len(heat) > 0:
            insp['heat'] = heat
        if len(mark) > 0:
            insp['mark'] = mark
        if len(paint) > 0:
            insp['paint'] = paint
        if len(psvt) > 0:
            insp['psvt'] = psvt
        if len(pt) > 0:
            insp['pt'] = pt
        if len(weld) > 0:
            insp['weld'] = weld


        print(insp)

        with open(os.path.join(output_directory, "Templates_json", filename[:-5] + '.json'), 'w') as f:
            json.dump(insp, f, indent=4)
            # print('JSON CREATED')

    # print('---END---')
