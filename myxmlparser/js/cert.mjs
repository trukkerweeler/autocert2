// javascript file for the index.html page
// import { getLocalStorage, setLocalStorage } from './utils.js';


// check to see if the templates are in localstorage, if not copy templates.json to localstorage
if (localStorage.getItem('templates') === null) {
    // console.log('templates not in localstorage');
    fetch('../templates.json')
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        localStorage.setItem('templates', JSON.stringify(data));
    })
    .catch(error => console.error(error));
}

// Get the templates from localstorage
const templates = JSON.parse(localStorage.getItem('templates'));

// get the header element
const h2element = document.getElementById('pn')

// get current date and timeand assign to date element
const date = document.querySelector('#date');
const now = new Date();
date.textContent = now.toLocaleDateString();

// disable the change button
const change = document.querySelector('#changepn');
change.disabled = true;

// create otherpartnumbers list
const otherpartnumberslist = [];

// Check to see if specs are in localstorage, if not copy specs.json to localstorage
if (localStorage.getItem('specs') === null) {
    // console.log('specs not in localstorage');
    fetch('specs.json')
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        localStorage.setItem('specs', JSON.stringify(data));
    })
    .catch(error => console.error(error));
}

// // build the specs form from the specs.json file
// const specs = JSON.parse(localStorage.getItem('specs'));
// // console.log(specs);
// const specform = document.getElementById('specform');
// for (const [key, value] of Object.entries(specs)) {
//     // console.log(key, value);
//     // const div = document.createElement('div');
//     const label = document.createElement('label');
//     label.setAttribute('for', key);
//     label.textContent = value;
//     const input = document.createElement('input');
//     input.setAttribute('type', 'checkbox');
//     input.setAttribute('name', key);
//     input.setAttribute('id', key);
//     input.setAttribute('value', key);
//     input.setAttribute('key', key);
//     input.checked = false;
//     // div.appendChild(label);
//     // div.appendChild(input);
//     specform.appendChild(input);
//     specform.appendChild(label);
// }


// // submit button for specs form
// const submit = document.createElement('button');
// submit.setAttribute('type', 'submit');
// submit.textContent = 'Save';
// submit.setAttribute('id', 'dialog-save');
// specform.appendChild(submit);

// Return table row from object
const btn = document.querySelector('#btn');
function createHtmlFromArr(object) {
    const tr = document.createElement('tr');
    const job1suffix1 = object['JOB1'] + "-" + object['SUFFIX1'];
    const part3 = object['PART3'];
    let serialnumber1 = object['SERIALNUMBER1'];
    serialnumber1 = serialnumber1.replace('PO:', '').trim();
    const part1 = object['PART1'];
    let quantity1 = object['QUANTITY1'];
    // change to positive number
    if (quantity1 < 0) {
        quantity1 = quantity1 * -1;
    }


    const arr = [job1suffix1, part3, serialnumber1, part1, quantity1];
    // console.log(arr);
    arr.forEach(element => {
        // console.log(element);
        const td = document.createElement('td');
        td.textContent = element;
        tr.appendChild(td);
    });

    return tr;
}

function createListItem(partno) {
    const li = document.createElement('li');
    li.textContent = partno;
    return li;
}

function createOptionItem(partno) {
    const option = document.createElement('option');
    option.textContent = partno;
    option.setAttribute('value', partno);
    return option;
}

function createTable(pns, spec, spectype)
{
    // console.log(pns);
    // console.log(spec);
    switch (spectype) {
        case 'chemspec':
            myheader = 'Chemical Treatment';
            break;
        case 'weldspec':
            myheader = 'Welding';
            break;
        case 'heatspec':
            myheader = 'Heat Treatment';
            break;
        default:
            myheader = 'Specifications';
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    thead.innerHTML = `<h2>${myheader}</h2>`;
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = 'Part Number';
    tr.appendChild(th);
    thead.appendChild(tr);
    table.appendChild(thead);
    table.appendChild(tbody);

    process_index = 1;
    pns.forEach(element => {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        td2.textContent = process_index;
        tr.appendChild(td2);
        
        td.textContent = element;
        tr.appendChild(td);

        // Add another td for the write in spec
        td3.textContent = '--------------';
        tr.appendChild(td3);
        
        tbody.appendChild(tr);
        process_index++;
    });
    tr.textContent = spec;
    tbody.appendChild(tr);

    return table;
}
    

btn.addEventListener('click', () => {
    change.disabled = false;
    const woid = document.querySelector('#woid').value;
    let otherpartnumbers = document.getElementById('otherpartnumbers');
    // const url = `http://localhost:8080/${woid}.xml`;
    const file = `${woid}.xml`;

    columnNames = ['WO', 'Part Id', 'Trace Id', 'Component', 'Qty'];
    const table = document.getElementById('data');
    const thead = document.createElement('thead');
    thead.innerHTML = '<h2>Components</h2>';
    const tr = document.createElement('tr');
    columnNames.forEach(element => {
        const th = document.createElement('th');
        th.textContent = element;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);

    // fetch the xml file
    fetch(file)
    .then(response => response.text())
    .then(xmlString => {
        // console.log(xmlString);
        const xmlDocument = new DOMParser().parseFromString(xmlString, 'text/xml');
        // console.log(xmlDocument);    
        
        // get the header
        const header = xmlDocument.getElementsByTagName('ReportHeader');
        // console.log(header);
        for (let i = 0; i < header.length; i++) {
            const field = header[i];
            const name = field.getAttribute('Name');
            const formattedValue = field.getElementsByTagName('FormattedValue')[1].textContent.trim();
            // console.log(name, formattedValue);

            const headerelement = document.getElementById('header');
            // h1element.textContent = 'Part number: ' + formattedValue;
            h2element.textContent = formattedValue;
            // headerelement.appendChild(h2element);
        }

        // get the details
        const details = xmlDocument.getElementsByTagName('Details');
        const data = document.getElementById('data');
        for (let i = 0; i < details.length; i++) {
            const detail = details[i];
            const section = detail.getElementsByTagName('Section')[0];
            const fields = section.getElementsByTagName('Field');
            const myrow = document.createElement('tr');
            // data.appendChild(document.createElement('tr'));

            lineobject = {};
            for (let j = 0; j < fields.length; j++) {
                const field = fields[j];
                const name = field.getAttribute('Name');
                const formattedValue = field.getElementsByTagName('FormattedValue')[0].textContent.trim();
                lineobject[name] = formattedValue;
            // console.log(name, fieldName, formattedValue, value);

    }
    // Exclude MS, NAS, RTV, standard parts, Metals
    let std = lineobject['PART3'];
    if (!std.startsWith('MS') && !std.startsWith('NAS') && !std.includes('RTV') && !std.includes('S61') && !std.includes('STANDARD')) {
        data.appendChild(createHtmlFromArr(lineobject));
    }
    // add the part number to the other part numbers list
    if (lineobject['PART1'] != '' && !otherpartnumberslist.includes(lineobject['PART1'])) {
    otherpartnumberslist.push(lineobject['PART1']);
    otherpartnumbers.appendChild(createOptionItem(lineobject['PART1']));
    // set the h2element to the selected part number on click
    const submitpnchange = document.getElementById('submitpnchange');
    submitpnchange.addEventListener('click', () => {
        h2element.textContent = document.getElementById('otherpartnumbers').value;
        // close the modal
        const changepndialog = document.getElementById('changepndialog');
        changepndialog.close();
    }
    );
    }

    }
})
.catch(error => console.error(error));
}
);

// // Add event listener to the dialog button
// const dialogBtn = document.getElementById('editspecs');
// dialogBtn.addEventListener('click', () => {
//     // console.log('clicked');
//     const dialog = document.querySelector('dialog');
//     dialog.showModal();
// });

// Add event listener to the dialog close button
const dialogCloseBtn = document.getElementById('dialog-close');
dialogCloseBtn.addEventListener('click', () => {
    // console.log('clicked');
    const dialog = document.querySelector('dialog');
    dialog.close();
});

// // Add event listener to the dialog save button
// const dialogSaveBtn = document.getElementById('dialog-save');
// dialogSaveBtn.addEventListener('click', (event) => {
//     event.preventDefault();
//     // console.log('save-clicked');
//     // save the data to local storage
//     const specform = document.getElementById('specform');
//     const formData = new FormData(specform);
//     // console.log(formData);
//     const data = {};
//     const chosenspecs = document.getElementById('chosenspecs');
//     chosenspecs.innerHTML = '<ul>';

//     for (const [key, checked] of formData.entries()) {
//         data[key] = checked;
//         // console.log(key, checked);
//         // use the key to get the value from the specs object
//         const specs = JSON.parse(localStorage.getItem('specs'));
//         const value = specs[key];
//         chosenspecs.innerHTML += `<li>${value}</li>`;
//     }
//     chosenspecs.innerHTML += '</ul>';

//     // console.log(data);
//     const woid = document.querySelector('#woid').value;
//     localStorage.setItem(woid, JSON.stringify(data));
//     // close the dialog

//     const dialog = document.querySelector('dialog');
//     dialog.close();
// });

// Add event listener to the change button
const changeBtn = document.getElementById('changepn');
changeBtn.addEventListener('click', () => {
    // console.log('clicked');
    const dialog = document.querySelector('#changepndialog');
    dialog.showModal();
});

// Add event listener to the buildspecs button
const buildspecsBtn = document.getElementById('buildspecs');
buildspecsBtn.addEventListener('click', async () => {
    // get the part number from the h2 element
    const pn = h2element.textContent;

    // Split, get the first element, and remove the block of spaces
    let basepn = pn.split(' ')[0].replace(/\s/g, '');
    console.log(basepn);

    // get the specs from the templates object
    const specs = templates[basepn];
    console.log(specs);
    const chemspec = specs['chemspec'];
    console.log(chemspec);
    const weldspec = specs['weldspec'];
    const heatspec = specs['heatspec'];
    const lotinfo = specs['lot'];
    const chempn = specs['chem'];
    const weldpn = specs['weld'];
    const heatpn = specs['heat'];

    if (chemspec != undefined) {
        const chemtable = createTable(chempn, chemspec, "chemspec");
        const chemspecdiv = document.getElementById('specifications');
        // chemspecdiv.innerHTML = '';
        chemspecdiv.appendChild(chemtable);
    }
    if (weldspec != undefined) {
        const weldtable = createTable(weldpn, weldspec, "weldspec");
        const weldspecdiv = document.getElementById('specifications');
        // weldspecdiv.innerHTML = '';
        weldspecdiv.appendChild(weldtable);
    }
    if (heatspec != undefined) {
        const heattable = createTable(heatpn, heatspec, "heatspec");
        const heatspecdiv = document.getElementById('specifications');
        // heatspecdiv.innerHTML = '';
        heatspecdiv.appendChild(heattable);
    }


    
});
