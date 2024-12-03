const SHEET_ID = '1EjqNC7CM_2-FxAuYh0OGTIp4VTGVFRXIFY8T6I6bDQc';
const API_KEY = 'AIzaSyBRmm-_ZTADYwqjdYdMO4xPAxE75LdPNmo';
const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Stores?key=${API_KEY}`;

async function fetchStoreData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const rows = data.values || [];
        // console.log(rows)
        return rows.slice(1).map(row => ({
            category: row[1]?.trim(),
            state: row[3]?.trim(),
            city: row[4]?.trim(),
            name: row[2]?.trim(),
            address: row[8]?.trim(),
            phone: row[10]?.trim(),
        }));
    } catch (error) {
        console.error('Error fetching store data:', error);
        return [];
    }
}

async function populateFilters() {
    const stores = await fetchStoreData();
    
    const categories = [...new Set(stores.map(store => store.category))];
    const categoryDropdown = document.getElementById('category');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
        // console.log(eachCategory);
    });

    categoryDropdown.addEventListener('change', () => {
        resetPage();
        const selectedCategory = categoryDropdown.value;

        if (selectedCategory) {
            populateStateDropdown(stores, selectedCategory);
        }
    });

    document.getElementById('state').addEventListener('change', () => {
        const selectedCategory = categoryDropdown.value;
        const selectedState = document.getElementById('state').value;

        resetDropdown('city');

        if (selectedState) {
            populateCityDropdown(stores, selectedCategory, selectedState);
        }
    });
}

function resetPage() {
    resetDropdown('state');
    resetDropdown('city');
    document.getElementById('storeList').innerHTML = '';
}

function resetDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = `<option value="">Select ${dropdownId.charAt(0).toUpperCase() + dropdownId.slice(1)}</option>`;
    dropdown.disabled = true;
}

function populateStateDropdown(stores, category) {
    const states = [...new Set(stores.filter(store => store.category === category).map(store => store.state))];
    const stateDropdown = document.getElementById('state');
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateDropdown.appendChild(option);
    });
    stateDropdown.disabled = false;
}

function populateCityDropdown(stores, category, state) {
    const cities = [...new Set(stores.filter(store => store.category === category && store.state === state).map(store => store.city))];
    const cityDropdown = document.getElementById('city');
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        cityDropdown.appendChild(option);
    });
    cityDropdown.disabled = false;
}

function renderStores(stores) {
const storeList = document.getElementById('storeList');
if (stores.length === 0) {
storeList.innerHTML = '<div class="store-card">No stores found</div>';
return;
}

storeList.innerHTML = stores.map(store => `
<div class="store-card">
    <div class="store-name">${store.name}</div>
    <div class="store-address">${store.address}</div>
    ${store.phone ? `
        <div class="store-phone">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                <path id="Path_241969" data-name="Path 241969" d="M339.18,2836.342a2.037,2.037,0,0,1,3.267-.128l.225.272c.659.807,1.318,1.608,1.571,1.856a.753.753,0,0,1,.113.921l-1.387,2.317a5.93,5.93,0,0,0,.364.513,12.57,12.57,0,0,0,1.017,1.14,14.281,14.281,0,0,0,2.033,1.7l2.276-1.366a.751.751,0,0,1,.875.076l2.2,1.856a2.053,2.053,0,0,1-.133,3.238,5.23,5.23,0,0,1-5.787.355,23,23,0,0,1-4.235-3.276,18.788,18.788,0,0,1-2.851-3.676A5.282,5.282,0,0,1,339.18,2836.342Zm2.1.83a.531.531,0,0,0-.872.045,3.787,3.787,0,0,0-.389,4.151,17.431,17.431,0,0,0,2.622,3.381,21.611,21.611,0,0,0,3.954,3.049,3.722,3.722,0,0,0,4.122-.294.54.54,0,0,0,.035-.853l-1.783-1.509-2.205,1.321a.745.745,0,0,1-.761.007,13.858,13.858,0,0,1-2.722-2.174,13.553,13.553,0,0,1-1.141-1.275,5.2,5.2,0,0,1-.737-1.2.76.76,0,0,1,.056-.664l1.313-2.189c-.352-.408-.82-.981-1.253-1.5C341.439,2837.361,341.358,2837.27,341.281,2837.172Z" transform="translate(-337.832 -2835.304)" fill="#000"></path>
            </svg>
            <a href="tel:${store.phone}" class="store-phone-link">${store.phone}</a>
        </div>
        <button class="call-button" onclick="window.location.href='tel:${store.phone}'">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                <path id="Path_241969" data-name="Path 241969" d="M339.18,2836.342a2.037,2.037,0,0,1,3.267-.128l.225.272c.659.807,1.318,1.608,1.571,1.856a.753.753,0,0,1,.113.921l-1.387,2.317a5.93,5.93,0,0,0,.364.513,12.57,12.57,0,0,0,1.017,1.14,14.281,14.281,0,0,0,2.033,1.7l2.276-1.366a.751.751,0,0,1,.875.076l2.2,1.856a2.053,2.053,0,0,1-.133,3.238,5.23,5.23,0,0,1-5.787.355,23,23,0,0,1-4.235-3.276,18.788,18.788,0,0,1-2.851-3.676A5.282,5.282,0,0,1,339.18,2836.342Zm2.1.83a.531.531,0,0,0-.872.045,3.787,3.787,0,0,0-.389,4.151,17.431,17.431,0,0,0,2.622,3.381,21.611,21.611,0,0,0,3.954,3.049,3.722,3.722,0,0,0,4.122-.294.54.54,0,0,0,.035-.853l-1.783-1.509-2.205,1.321a.745.745,0,0,1-.761.007,13.858,13.858,0,0,1-2.722-2.174,13.553,13.553,0,0,1-1.141-1.275,5.2,5.2,0,0,1-.737-1.2.76.76,0,0,1,.056-.664l1.313-2.189c-.352-.408-.82-.981-1.253-1.5C341.439,2837.361,341.358,2837.27,341.281,2837.172Z" transform="translate(-337.832 -2835.304)" fill="#fff"></path>
            </svg>
            Call Store
        </button>
    ` : ''}
</div>
`).join('');
}

async function showResults() {
    const category = document.getElementById('category').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const storeList = document.getElementById('storeList');

    if (!category) {
        storeList.innerHTML = `
            <div class="store-card">Please Select a Category</div>
        `;
        storeList.scrollIntoView({ behavior: 'smooth' });
        return;
    }

    const stores = await fetchStoreData();
    const filteredStores = stores.filter(store => {
        return (
            (!category || store.category === category) &&
            (!state || store.state === state) &&
            (!city || store.city === city)
        );
    });

    renderStores(filteredStores);
    storeList.scrollIntoView({ behavior: 'smooth' });
}


document.addEventListener('DOMContentLoaded', () => {
    populateFilters();
    document.getElementById('showResults').addEventListener('click', showResults);
});