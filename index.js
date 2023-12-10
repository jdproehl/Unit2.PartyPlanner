const COHORT = "2309-FTB-ET-WEB-PT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

// Create an empty array for 'addPartyDetails', which will store the applications state.
const state = {
    parties: [],
}

// Create a variable called 'partyList' with the id 'parties' to be used as a container for displaying the party details.
const partyList = document.querySelector("#parties");

// Select the HTML form element with the id "addPartyDetails" and assign it to the variable addPartyDetailsForm. This form is used for adding new party details.
const addPartyDetailsForm = document.querySelector("#addPartyDetails");
addPartyDetailsForm.addEventListener("submit", addParty);

// Sync the state with the API, then render.
async function render() {
    await getParties();
    renderParties();    
}
render();

// Update the state with parties from the API
async function getParties() {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      state.parties = json.data;

    } catch (error) {
      console.error(error);
    }
}  

// Render parties from state
function renderParties() {
    if (!state.parties.length) {
        partyList.innerHTML = "<li>No Parties</li>";
        return;
    }

    const partyCards = state.parties.map((party) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <h2>${party.name}</h2>
        <h2>${party.date}</h2>
        <h2>${party.time}</h2>
        <h2>${party.location}</h2>
        <img src="${party.imageUrl}" alt="${party.name}" />
        <p>${party.description}</p>
      `;
      return li;
    });

    partyList.replaceChildren(...partyCards);

}

// Ask the API to create a new party based on the form data
async function addParty(event) {
    event.preventdefault();

  try {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: addPartyDetailsForm.name.value,
            dates: addPartyDetailsForm.dates.value,
         // times: addPartyDetailsForm.times.value,
            times: "2021-09-30T00:00:000Z",
            locations: addPartyDetailsForm.locations.value,
            imageUrl: addPartyDetailsForm.imageUrl.value,
            description: addPartyDetailsForm.description.value,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to create Party!");
    }

    render();
   } catch (error) {
     console.error.apply(error);
   }
} 