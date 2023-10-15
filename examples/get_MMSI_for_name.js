import axios from "axios";
import {load} from 'cheerio';

async function getMMSIsForShipName(shipName) {    
    const response = await axios.get('https://www.itu.int/mmsapp/ShipStation/list');
    const $ = load(response.data);

    // list all forms present in the page
    const forms = $('form');
    console.log(forms)

    // select form with name="form-main"
    const form = $('form[name="form-main"]');
    console.log(form);

    // Submit the ship name
    $('input[name="shipName"]').val(shipName);
    form.submit();

    const mmsis = [];

    // Find all rows in the table
    const rows = $('table tr.odd, table tr.even');

    rows.each((i, row) => {
        const columns = $(row).find('td');

        // Check if the ship name matches
        if ($(columns[1]).text().trim() === shipName) {
            // Extract the MMSI and store it in the array
            const mmsi = $(columns[0]).text().trim();
            mmsis.push(mmsi);
        }
    });

    return mmsis;
}

// Example usage
getMMSIsForShipName('Titanic').then(console.log);
