//Load vehicle section of the form
function loadVehicleSection(parent) {

    //Create elements
    vehicleDiv = document.createElement("div");
    vehicleContainer = document.createElement("div");

    //Set up vehicleDiv and add header text
    vehicleDiv.classList.add("form-element");
    vehicleText = document.createElement("p");
    vehicleText.classList.add("form-header");
    vehicleText.textContent = "Vehicles";
    vehicleDiv.appendChild(vehicleText);

    //Set up vechicleContainer
}

//Load a part of the housing section
function loadHousingInputSection(parent, sectionName, labelText, inputType, inputName, units) {

    //Create all elements
    sectionDiv = document.createElement("div");
    sectionLabel = document.createElement("label");
    sectionInput = document.createElement("input")
    sectionUnits = document.createElement("select");

    //Set up div
    sectionDiv.classList.add("form-heating-div");
    sectionDiv.id = `${sectionName}-div`;

    //Set up label
    sectionLabel.classList.add(`${sectionName}-label`);
    sectionLabel.id = `${sectionName}-label`;
    sectionLabel.textContent = labelText;
    sectionLabel.setAttribute("for", sectionInput);

    //Set up input
    sectionInput.classList.add("form-input");
    sectionInput.id = `${sectionName}-input`;
    sectionInput.setAttribute("type", inputType);
    sectionInput.setAttribute("name", inputName);

    //Set up units
    sectionUnits.classList.add("form-units-select");
    sectionUnits.id = `${sectionName}-units-select`;
    units.forEach(element => {
        option = document.createElement("option");
        option.setAttribute("value", element);
        option.textContent = element;
        sectionUnits.appendChild(option);
    });

    //Append children
    sectionDiv.appendChild(sectionLabel);
    sectionDiv.appendChild(sectionInput);
    sectionDiv.appendChild(sectionUnits);
    parent.appendChild(sectionDiv)

}


//Load housing section for form
function loadHousingSection(parent) {
    
    //Create and get all elements
    housingDiv = document.createElement("div");
    housingDiv.classList.add("housing-div");

    housingText = document.createElement("p");
    housingText.classList.add("form-header");
    housingText.textContent = "Housing";

    //Append children to housing div
    housingDiv.appendChild(housingText);
    loadHousingInputSection(housingDiv, "natural-gas", "Natural Gas:", "number", "natural-gas-amount", ["L", "kWh"]);
    loadHousingInputSection(housingDiv, "heating-oil", "Heating Oil:", "number", "heating-oil-amount", ["L", 'kWh']);
    loadHousingInputSection(housingDiv, "propane", "Propane:", "number", "propane-amount", ["L", "kWh"]);
    loadHousingInputSection(housingDiv, "procoalpane", "Coal:", "number", "coal-amount", ["kg", "kWh"]);

    //Append housing div to form
    parent.appendChild(housingDiv);
}

//Load the form
function loadForm() {
    contentDiv = document.getElementsByClassName("form-content")[0];
    formElement = document.createElement("form");
    formElement.classList.add("form-element");

    contentDiv.innerHTML = "";
    loadHousingSection(formElement);
    contentDiv.appendChild(formElement);
}

//Load get started box
function loadGetStarted() {
    contentDiv = document.getElementsByClassName("form-content")[0];
    startText = document.createElement("p");
    startText.textContent = "Let's begin!";
    startText.classList.add("form-start-text");

    startButton = document.createElement("button");
    startButton.textContent = "Start";
    startButton.classList.add("form-start-button")
    startButton.addEventListener("click", ()=>{
        loadForm();
    })

    contentDiv.innerHTML = "";
    contentDiv.appendChild(startText);
    contentDiv.appendChild(startButton);
}

// Main function. Executes once forms.html loads
function main() {
    console.log("Executing main function!");
    loadGetStarted();
}

main();