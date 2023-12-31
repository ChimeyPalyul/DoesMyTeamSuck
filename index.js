let currentTeam;

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/PLTeams')
        .then(response => response.json())
        .then(data => {
            // Sort the data based on a numeric property (e.g., position or xGD)
            const sortedData = data.sort((a, b) => b.xGD - a.xGD);

            // Iterate through the sorted data and display each team
            sortedData.forEach(team => displayTeam(team));
            // editFunction(team)
        })
})

function displayTeam(data) {
    // Create a new table row for each team
    let row = document.createElement('tr');
    row.addEventListener('mouseover', () => {
    row.classList.add('row-with-shadow'); 
    });
    row.addEventListener('mouseout', () => {
    row.classList.remove('row-with-shadow'); 
    });
    row.addEventListener('click',(e) =>{
        additionalDetails(data)
    })

    
    // Create DOM elements for each piece of data within the row
    let clubLogoCell = document.createElement('td');
    let clubNameCell = document.createElement('td');
    let clubxGDCell = document.createElement('td');
    let clubPositionCell = document.createElement('td');
    let editButtonCell = document.createElement('td')
    editButtonCell.className = 'Button'
    let input = document.createElement('input')

    //Patch new xGD to add table functionality
    editButtonCell.addEventListener('click', (e) => {
        e.preventDefault()
        let inputData = input.value
        fetch(`http://localhost:3000/PLTeams/${data.id}`, { 
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ xGD: inputData }) 
    })

        .then(res => res.json())
        .catch(e => console.log(e))
    })

    // Set the appropriate properties/textContent
    let clubLogo = document.createElement('img');
    clubLogo.src = data.logo; // Assuming 'logo' is the URL to the image
    let clubName = document.createTextNode(data.teamName);
    let clubxGD = document.createTextNode(data.xGD);
    let clubPosition = document.createTextNode(data.position);
    let editButton = document.createTextNode("Update")
         


    // Append data to the respective table cells
    clubLogoCell.appendChild(clubLogo);
    clubNameCell.appendChild(clubName);
    clubxGDCell.appendChild(clubxGD);
    clubPositionCell.appendChild(clubPosition);
    editButtonCell.appendChild(editButton)

    // Append cells to the row
    row.appendChild(clubLogoCell);
    row.appendChild(clubNameCell);
    row.appendChild(clubxGDCell);
    row.appendChild(clubPositionCell);
    row.appendChild(input)
    row.appendChild(editButtonCell)
    // Append the row to the table body
    let tableBody = document.querySelector('#table-body');
    tableBody.appendChild(row);

}

function additionalDetails(team){
    let currentTeam = team;
    let aDetails = document.querySelector('#additionalInfo')
    let li = document.createElement('li')
    let title = document.createElement('h2')
    title.textContent = "Additional Details"
    let namE = document.createElement('p')
    let points = document.createElement('p')
    let goalsFour = document.createElement('p')
    let goalsAgainst = document.createElement('p')
    let xGfor = document.createElement('p')
    let xGagainst = document.createElement('p')
    let dmtsBtn = document.createElement('btn')
    let dltBtn = document.createElement('btn')


    namE.textContent = `${currentTeam.teamName}`
    points.textContent = `Points: ${currentTeam.points}`
    goalsFour.textContent = `Goals For: ${currentTeam.goalsFor} `
    goalsAgainst.textContent = `Goals Against: ${currentTeam.goalsAgainst}`
    xGfor.textContent = `Expected Goals: ${currentTeam.xGFor}`
    xGagainst.textContent = `Expected Goals Conceded: ${currentTeam.xGAgainst}`
    dmtsBtn.className = 'Button'
    dmtsBtn.textContent = "Does My Team Suck?!?"
    dltBtn.textContent = "x"
    dltBtn.className = "dltBtn"


    li.append(namE,points,goalsFour,goalsAgainst,xGfor,xGagainst,dmtsBtn,dltBtn)

    dltBtn.addEventListener("click", (e) =>{
        aDetails.innerHTML = ""
        
    })



    dmtsBtn.addEventListener('click', (e) => {
        const qualityQuotient = (team.xGD/team.matches)*100
        if ( qualityQuotient > 100 && currentTeam.teamName === "Manchester City") {
            return alert("Your team is good.Very good.")
            }
        else if ( qualityQuotient > 100) {
        return alert("Watch out Pep! This team is good. Very good.")
        } else if (qualityQuotient <= 100 && qualityQuotient > 50) {
            return alert('Keep this up and you\'ll be playing in Europe next season!')
        } else if (qualityQuotient <= 50 && qualityQuotient > 0) {
            return alert('Comfortably mid-table...not bad, not good')
        } else if (qualityQuotient <= 0 && qualityQuotient > -60) {
            return alert ('You probablyyyyy won\'t be relegated?')
        } return alert('Have fun in the Championship next year.')

    
})
    aDetails.append(li)
}


