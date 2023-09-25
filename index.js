document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/PLTeams')
    .then(response => response.json())
    .then(data => {
        // Sort the data based on a numeric property (e.g., position or xGD)
        const sortedData = data.sort((a, b) => b.xGD - a.xGD);

        // Iterate through the sorted data and display each team
        sortedData.forEach(team => displayTeam(team));
    })
})

function displayTeam(data) {
    // Create a new table row for each team
    let row = document.createElement('tr');
    
    // Create DOM elements for each piece of data within the row
    let clubLogoCell = document.createElement('td');
    let clubNameCell = document.createElement('td');
    let clubxGDCell = document.createElement('td');
    let clubPositionCell = document.createElement('td');
    let newPositionCell = document.createElement('td')

    // Set the appropriate properties/textContent
    let clubLogo = document.createElement('img');
    clubLogo.src = data.logo; // Assuming 'logo' is the URL to the image
    let clubName = document.createTextNode(data.teamName);
    let clubxGD = document.createTextNode(data.xGD);
    let clubPosition = document.createTextNode(data.position);
    let newPosition = document.createTextNode(data.id)

    // Append data to the respective table cells
    newPositionCell.appendChild(newPosition)
    clubLogoCell.appendChild(clubLogo);
    clubNameCell.appendChild(clubName);
    clubxGDCell.appendChild(clubxGD);
    clubPositionCell.appendChild(clubPosition);
    

    // Append cells to the row
    row.appendChild(newPositionCell)
    row.appendChild(clubLogoCell);
    row.appendChild(clubNameCell);
    row.appendChild(clubxGDCell);
    row.appendChild(clubPositionCell);

    // Append the row to the table
    let table = document.querySelector('#table');
    table.appendChild(row);
}


