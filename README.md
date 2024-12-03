# Store-Locator-Marmeto

A fully functional Store Locator web page built using **HTML**, **CSS**, and **JavaScript**. The project integrates Google Maps API to display store locations and fetches store data dynamically from **Google Sheets**.

## Features

- Interactive Google Map with pins marking store locations.
- Fetches store information dynamically from Google Sheets.
- Search functionality to find stores by name or location.
- Responsive design for optimal viewing on all devices.
- Custom styling for maps and UI.

---

## Installation

### Prerequisites
- A Google Sheets file with store data.

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/store-locator.git
   cd store-locator
   ```

2. **Set Up Google Cloud**:
   - [Enable the Google Sheets API].
   - Create a Google API key and restrict it to your use case.

3. **Set Up Google Sheets**:
   - Create a Google Sheet with the following headers:
     ```
     Store Name | State | City | Address | Latitude | Longitude
     ```
   - Publish the Google Sheet to the web:
     - Go to **File > Share > Publish to Web**.
   - Copy the Google Sheet's **Sheet ID** (found in the URL after `/d/`).

4. **Configure the Project**:
   - Open the `Script.js` file (or create one if it doesn't exist).
   - Add your Google API key and Google Sheet ID:
     ```javascript
     const GOOGLE_API_KEY = 'your-google-api-key';
     const SHEET_ID = 'your-google-sheet-id';
     const SHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${GOOGLE_API_KEY}`;
     ```

5. **Run the Project**:
   - Open the `index.html` file in your browser.

---

## Folder Structure

```
store-locator/
├── index.html      # Main HTML file
├── css/
│   └── styles.css  # Custom styles
├── js/
│   ├── scripts.js      # Core JavaScript logic
                        # API key and Sheet ID configuration
├── README.md       # Project documentation
```

---

## Usage

1. Open the Store Locator in your browser.
2. Use the Dropdown to find stores by name or location.

---

## Dependencies

- **Google Sheets API**: For fetching store data.

---

## Contributing

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

### Notes:
- Replace placeholders (`your-google-api-key`, `your-google-sheet-id`, etc.) with actual values before sharing the project.
- Add additional instructions for setting up any dependencies if needed.
