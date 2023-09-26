



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

    // Set the appropriate properties/textContent
    let clubLogo = document.createElement('img');
    clubLogo.src = data.logo; // Assuming 'logo' is the URL to the image
    let clubName = document.createTextNode(data.teamName);
    let clubxGD = document.createTextNode(data.xGD);
    let clubPosition = document.createTextNode(data.position);

    // Append data to the respective table cells
    clubLogoCell.appendChild(clubLogo);
    clubNameCell.appendChild(clubName);
    clubxGDCell.appendChild(clubxGD);
    clubPositionCell.appendChild(clubPosition);

    // Append cells to the row
    row.appendChild(clubLogoCell);
    row.appendChild(clubNameCell);
    row.appendChild(clubxGDCell);
    row.appendChild(clubPositionCell);

    // Append the row to the table body
    let tableBody = document.querySelector('#table-body');
    tableBody.appendChild(row);

    clubLogo.addEventListener('click',(e) =>{
        additionalDetails(data)
    })
}

function additionalDetails(team){
    let currentTeam = team;
    let aDetails = document.querySelector('#additionalInfo')
    let title = document.createElement('h2')
    title.textContent = "Additional Details"
    let namE = document.createElement('p')
    let points = document.createElement('p')
    let goalsFour = document.createElement('p')
    let goalsAgainst = document.createElement('p')
    let xGfor = document.createElement('p')
    let xGagainst = document.createElement('p')
    let dmtsBtn = document.createElement('btn')

    namE.textContent = `${currentTeam.teamName}`
    points.textContent = `Points: ${currentTeam.points}`
    goalsFour.textContent = `Goals For: ${currentTeam.goalsFor} `
    goalsAgainst.textContent = `Goals Against: ${currentTeam.goalsAgainst}`
    xGfor.textContent = `Expected Goals: ${currentTeam.xGFor}`
    xGagainst.textContent = `Expected Goals Conceded: ${currentTeam.xGAgainst}`
    dmtsBtn.textContent = "Does My Team Suck?!?"
    dmtsBtn.addEventListener('click', (e) => {
        alert("I am not sure yet, my slow ass developers are still working on other aspects of the website!")
    })
    aDetails.append(namE,points,goalsFour,goalsAgainst,xGfor,xGagainst,dmtsBtn)

}


