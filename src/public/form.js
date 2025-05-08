//Load input in diet section
function loadDietInput(parent, labelText, inputName, inputType) {

    //Create elements
    inputDiv = document.createElement("div");
    inputLabel = document.createElement("label");
    input = document.createElement("input");

    //Set up inputDiv
    inputDiv.classList.add("form-diet-content-input-div");
    inputDiv.id = `diet-content-${inputName}-input-div`;

    //Set up input
    input.classList.add("form-input");
    input.id = `diet-${inputName}-input`;
    input.setAttribute("name", inputName);
    input.setAttribute("type", inputType);

    //Set up inputLabel
    inputLabel.classList.add("form-label");
    inputLabel.id = `diet-${inputName}-input-label`;
    inputLabel.setAttribute("for", input.id);
    inputLabel.textContent = labelText;

    //Add children to inputDiv
    inputDiv.appendChild(inputLabel);
    inputDiv.appendChild(input);

    //Add children to parent
    parent.appendChild(inputDiv);
}

//Load diet section
function loadDietSection(parent) {

    //Create elements
    dietDiv = document.createElement("div");
    dietHeader = document.createElement("p");
    dietContent = document.createElement("div");

    //Set up dietDiv
    dietDiv.classList.add("form-diet-div");
    dietDiv.id = "diet-div";

    //Set up diet header
    dietHeader.classList.add("form-header");
    dietHeader.id = "diet-header";
    dietHeader.textContent = "Diet";

    //Set up diet content
    dietContent.classList.add("form-diet-content");
    dietContent.id = "form-diet-content";

    //Add inputs into diet content;
    loadDietInput(dietContent, "How much beef do you eat in a month? (kg):", "beef-eaten", "number");
    loadDietInput(dietContent, "How much pork do you eat in a month? (kg):", "pork-eaten", "number");
    loadDietInput(dietContent, "How much chicken do you eat in a month? (kg):", "chicken-eaten", "number");
    loadDietInput(dietContent, "How much cheese do you eat in a month? (g):", "cheese-eaten", "number");
    loadDietInput(dietContent, "How much milk do you drink in a month? (L):", "milk-drunk", "number");

    //Add children to dietDiv
    dietDiv.appendChild(dietHeader);
    dietDiv.appendChild(dietContent);

    //Add children to parent
    parent.appendChild(dietDiv);
}

//Load water section
function loadWaterSection(parent) {
    //Create elements
    waterDiv = document.createElement("div");
    waterHeader = document.createElement("p");
    waterUsageDiv = document.createElement("div");
    waterUsageLabel = document.createElement("label");
    waterUsageInput = document.createElement("input");

    //Set up electricity div
    waterDiv.classList.add("form-water-div");
    waterDiv.id = `form-water-div`;

    //Set up electricity header
    waterHeader.classList.add("form-header");
    waterHeader.id = `electricity-header`;
    waterHeader.textContent = "Water";

    //Set up electricity usage div
    waterUsageDiv.classList.add("form-water-usage-div");
    waterUsageDiv.id = "water-usage-div";

    //Set up elecricity usage input and label
    waterUsageInput.classList.add("form-input");
    waterUsageInput.id = `water-usage-input`;
    waterUsageInput.setAttribute("name", `water-usage-input`);
    waterUsageInput.setAttribute("type", "number");

    waterUsageLabel.classList.add("form-label");
    waterUsageLabel.id = "water-usage-label";
    waterUsageLabel.setAttribute("for", waterUsageInput.id);
    waterUsageLabel.textContent = "How much water do you use each month? (cubic metres):";

    //Add children to electricity usage div
    waterUsageDiv.appendChild(waterUsageLabel);
    waterUsageDiv.appendChild(waterUsageInput);

    //Add children to electricity section
    waterDiv.appendChild(waterHeader);
    waterDiv.appendChild(waterUsageDiv);

    //Add children to parent
    parent.appendChild(waterDiv);
}

//Load electricity section
function loadElectricitySection(parent) {
    
    //Create elements
    electricityDiv = document.createElement("div");
    electricityHeader = document.createElement("p");
    electricityUsageDiv = document.createElement("div");
    electricityUsageLabel = document.createElement("label");
    electricityUsageInput = document.createElement("input");

    //Set up electricity div
    electricityDiv.classList.add("form-electricity-div");
    electricityDiv.id = `form-electricity-div`;

    //Set up electricity header
    electricityHeader.classList.add("form-header");
    electricityHeader.id = `electricity-header`;
    electricityHeader.textContent = "Electricity";

    //Set up electricity usage div
    electricityUsageDiv.classList.add("form-electricity-usage-div");
    electricityUsageDiv.id = "electricity-usage-div";

    //Set up elecricity usage input and label
    electricityUsageInput.classList.add("form-input");
    electricityUsageInput.id = `electricity-usage-input`;
    electricityUsageInput.setAttribute("name", `electricity-usage-input`);
    electricityUsageInput.setAttribute("type", "number");

    electricityUsageLabel.classList.add("form-label");
    electricityUsageLabel.id = "electricity-usage-label";
    electricityUsageLabel.setAttribute("for", electricityUsageInput.id);
    electricityUsageLabel.textContent = "How much electricty do you use each month? (kWh):";

    //Add children to electricity usage div
    electricityUsageDiv.appendChild(electricityUsageLabel);
    electricityUsageDiv.appendChild(electricityUsageInput);

    //Add children to electricity section
    electricityDiv.appendChild(electricityHeader);
    electricityDiv.appendChild(electricityUsageDiv);

    //Add children to parent
    parent.appendChild(electricityDiv);
}

//Reload a vehicle's input if type changes
function reloadVehicleInputs(vehicleNumber) {
    //Get parent
    parent = document.getElementById(`vehicle-${vehicleNumber}-input-div`);
    type = document.getElementById(`vehicle-${vehicleNumber}-type-select`)
    efficiencyDiv = document.getElementById(`vehicle-${vehicleNumber}-efficiency-div`)
    isElectric = type.value === "electric";

    if (isElectric) {
        if (efficiencyDiv) {
            efficiencyDiv.remove();
        }
    } else {
        if (!efficiencyDiv) {
            //Set up vehicle efficiency input
            vehicleEfficiencyDiv = document.createElement("div");
            vehicleEfficiencyLabel = document.createElement("label");
            vehicleEfficiencyInput = document.createElement("input");
            child = parent.querySelector(`#vehicle-${vehicleNumber}-distance-div`);

            vehicleEfficiencyDiv.classList.add("form-vehicle-efficiency-div");
            vehicleEfficiencyDiv.id = `vehicle-${vehicleNumber}-efficiency-div`;

            vehicleEfficiencyInput.classList.add("form-input");
            vehicleEfficiencyInput.id = `vehicle-${vehicleNumber}-efficiency-input`;
            vehicleEfficiencyInput.setAttribute("type", "number");
            vehicleEfficiencyInput.setAttribute("name", `vehicle-${vehicleNumber}-efficiency-input`);
            
            vehicleEfficiencyLabel.classList.add("form-label");
            vehicleEfficiencyLabel.id = `vehicle-${vehicleNumber}-efficiency-label`;
            vehicleEfficiencyLabel.setAttribute("for", vehicleEfficiencyInput.id);
            vehicleEfficiencyLabel.textContent = "Fuel efficiency (L/100km):";

            vehicleEfficiencyDiv.appendChild(vehicleEfficiencyLabel);
            vehicleEfficiencyDiv.appendChild(vehicleEfficiencyInput);

            parent.insertBefore(vehicleEfficiencyDiv, child);
        }
    }
}

//Load one vehicle
function loadVehicle(vehicleNumber, isElectric) {

    //Create elements
    vehicleDiv = document.createElement("div");
    vehicleInputDiv = document.createElement("div");
    vehicleName = document.createElement("p");
    vehicleTypeDiv = document.createElement("div");
    vehicleEfficiencyDiv = document.createElement("div");
    vehicleDistanceDiv = document.createElement("div");
    vehicleTypeLabel = document.createElement("label");
    vehicleTypeSelect = document.createElement("select");
    vehicleEfficiencyLabel = document.createElement("label");
    vehicleEfficiencyInput = document.createElement("input");
    vehicleDistanceLabel = document.createElement("label");
    vehicleDistanceInput = document.createElement("input");
    vehicleTypeSelectGasOption = document.createElement("option");
    vehicleTypeSelectDieselOption = document.createElement("option");
    vehicleTypeSelectElectricOption = document.createElement("option");

    
    //Set up vehicle div and name
    vehicleDiv.classList.add("form-vehicle-div");
    vehicleDiv.id = `vehicle-${vehicleNumber}-div`;
    vehicleName.classList.add("form-vehicle-header");
    vehicleName.textContent = `Vehicle ${vehicleNumber}`;
    vehicleDiv.appendChild(vehicleName);

    //Set up vehicle input div
    vehicleInputDiv.classList.add("form-vehicle-input-div");
    vehicleInputDiv.id = `vehicle-${vehicleNumber}-input-div`;

    //Set up vehicle type select
    vehicleTypeDiv.classList.add("form-vehicle-type-div");
    vehicleTypeDiv.id = `vehicle-${vehicleNumber}-type-div`;
    
    vehicleTypeSelect.classList.add("form-select");
    vehicleTypeSelect.id = (`vehicle-${vehicleNumber}-type-select`);
    vehicleTypeSelect.setAttribute("name", `vehicle-${vehicleNumber}-type`);
    function handler() {
        reloadVehicleInputs(vehicleNumber);
    }
    
    vehicleTypeSelect.addEventListener("change", handler);
    
    vehicleTypeLabel.classList.add("form-label");
    vehicleTypeLabel.textContent = "Vehicle Type:";
    vehicleTypeLabel.setAttribute("for", vehicleTypeSelect.id);

    vehicleTypeDiv.appendChild(vehicleTypeLabel);
    vehicleTypeDiv.appendChild(vehicleTypeSelect);

    //Set up options for vehicle type select

    vehicleTypeSelectGasOption.classList.add("form-option");
    vehicleTypeSelectGasOption.id = `vehicle-${vehicleNumber}-type-gas-option`;
    vehicleTypeSelectGasOption.setAttribute("value", "gas");
    vehicleTypeSelectGasOption.textContent = "Gas";
    
    vehicleTypeSelectDieselOption.classList.add("form-option");
    vehicleTypeSelectDieselOption.id = `vehicle-${vehicleNumber}-type-diesel-option`;
    vehicleTypeSelectDieselOption.setAttribute("value", "diesel");
    vehicleTypeSelectDieselOption.textContent = "Diesel";
    
    vehicleTypeSelectElectricOption.classList.add("form-option");
    vehicleTypeSelectElectricOption.id = `vehicle-${vehicleNumber}-type-diesel-option`
    vehicleTypeSelectElectricOption.setAttribute("value", "electric");
    vehicleTypeSelectElectricOption.textContent = "Electric";
    
    vehicleTypeSelect.appendChild(vehicleTypeSelectGasOption);
    vehicleTypeSelect.appendChild(vehicleTypeSelectDieselOption);
    vehicleTypeSelect.appendChild(vehicleTypeSelectElectricOption);
    
    //Set up vehicle efficiency input
    vehicleEfficiencyDiv.classList.add("form-vehicle-efficiency-div");
    vehicleEfficiencyDiv.id = `vehicle-${vehicleNumber}-efficiency-div`;

    vehicleEfficiencyInput.classList.add("form-input");
    vehicleEfficiencyInput.id = `vehicle-${vehicleNumber}-efficiency-input`;
    vehicleEfficiencyInput.setAttribute("type", "number");
    vehicleEfficiencyInput.setAttribute("name", `vehicle-${vehicleNumber}-efficiency-input`);
    
    vehicleEfficiencyLabel.classList.add("form-label");
    vehicleEfficiencyLabel.id = `vehicle-${vehicleNumber}-efficiency-label`;
    vehicleEfficiencyLabel.setAttribute("for", vehicleEfficiencyInput.id);
    vehicleEfficiencyLabel.textContent = "Fuel efficiency (L/100km):";

    vehicleEfficiencyDiv.appendChild(vehicleEfficiencyLabel);
    vehicleEfficiencyDiv.appendChild(vehicleEfficiencyInput);

    //Set up vehicle distance input
    vehicleDistanceDiv.classList.add("form-vehicle-distance-div");
    vehicleDistanceDiv.id = `vehicle-${vehicleNumber}-distance-div`;

    vehicleDistanceInput.classList.add("form-input");
    vehicleDistanceInput.id = `vehicle-${vehicleNumber}-distance-input`;
    vehicleDistanceInput.setAttribute("name", `vehicle-${vehicleNumber}-distance-input`);
    vehicleDistanceLabel.classList.add("form-label");
    vehicleDistanceLabel.id = `vehicle-${vehicleNumber}-distance-label`;
    vehicleDistanceLabel.setAttribute("for", vehicleDistanceInput.id);
    vehicleDistanceLabel.textContent = "Distance driven per week (km):";

    vehicleDistanceDiv.appendChild(vehicleDistanceLabel);
    vehicleDistanceDiv.appendChild(vehicleDistanceInput);

    //Append inputs to vehicleInputDiv
    vehicleInputDiv.appendChild(vehicleTypeDiv);
    if(!isElectric) {
        vehicleInputDiv.appendChild(vehicleEfficiencyDiv);
    }
    vehicleInputDiv.appendChild(vehicleDistanceDiv);

    //Append vehicleInputDiv to vehicleDiv
    vehicleDiv.appendChild(vehicleInputDiv);

    return vehicleDiv;
}

//Load individual vehicle inputs
function loadVehicleInputs(event, parent) {
    
    console.log("loading vehicles!");
    //Get the parent and clear its innner HTML
    parent.innerHTML = "";

    //Get the number of vehicles to load
    number = event.value;

    //Load each vehicle
    for (let i = 1; i <= number; i++) {
        vehicle = loadVehicle(i, false);
        parent.append(vehicle);
    }
}

//Load vehicle section of the form
function loadVehicleSection(parent) {

    //Create elements
    vehicleDiv = document.createElement("div");
    vehicleContainer = document.createElement("div");
    vehicleNumberDiv = document.createElement("div");
    vehicleNumberLabel = document.createElement("label");
    vehicleNumberSelection = document.createElement("select");

    //Set up vehicleDiv and add header text
    vehicleDiv.classList.add("form-vehicle-div");
    vehicleText = document.createElement("p");
    vehicleText.classList.add("form-header");
    vehicleText.textContent = "Vehicles";
    vehicleDiv.appendChild(vehicleText);

    //Set up vechicleContainer
    vehicleContainer.classList.add("form-vehicle-container");
    vehicleContainer.id = "vehicle-container";

    //Set up div to hold vehicle number elements
    vehicleNumberDiv.classList.add("form-vehicle-number-div");
    
    //Set up label for vehicle number selection
    vehicleNumberLabel.classList.add("form-label");
    vehicleNumberLabel.textContent = "How many vehicles do you regularly drive?";
    vehicleNumberLabel.setAttribute("for", vehicleNumberSelection.id);

    //Set up element for vehicle number selection
    vehicleNumberSelection.classList.add("form-select");
    vehicleNumberSelection.id = "vehicle-number-select";
    vehicleNumberSelection.setAttribute("name", "number-of-cars");
    vehicleNumberSelection.addEventListener("change", ()=>loadVehicleInputs(vehicleNumberSelection, vehicleContainer));

    //Add options for vehicle number selection
    for (let i = 0; i <= 4; i++) {
        option = document.createElement("option")
        option.id = `vehicle-number-option-${i}`;
        option.setAttribute("value", i);
        option.textContent = i;
        vehicleNumberSelection.appendChild(option)
    }

    //Append children into vehicleNumberDiv
    vehicleNumberDiv.appendChild(vehicleNumberLabel);
    vehicleNumberDiv.appendChild(vehicleNumberSelection);

    //Append chilren into vehicle div
    vehicleDiv.appendChild(vehicleNumberDiv);
    vehicleDiv.appendChild(vehicleContainer);

    //Append vehicleNumberDiv to parent
    parent.appendChild(vehicleDiv)


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
    housingDiv.classList.add("form-housing-div");

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
    loadVehicleSection(formElement);
    loadElectricitySection(formElement);
    loadWaterSection(formElement);
    loadDietSection(formElement);
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