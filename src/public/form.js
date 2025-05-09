
function generateSectionSelect(parent, selectName, labelText, options) {

    //Create elements
    selectDiv = document.createElement("div");
    select = document.createElement("select");
    label = document.createElement("label");

    //Set up select div
    selectDiv.classList.add("form-select-div");
    selectDiv.id = `${parent.id}-${selectName}-select-div`;
    
    //Set up select
    select.classList.add("form-select");
    select.id = `${parent.id}-${select}-select`;
    select.setAttribute("name", selectName);

    //Set up label
    label.classType = ("form-label");
    label.id = `${parent.id}-${selectName}-label`;
    label.setAttribute("for", select.id);
    label.textContent = labelText;

    //Create options and add tem to select
    options.forEach(element => {
        option = document.createElement("option");
        option.classList.add("form-option");
        option.id = `${select.id}-${element}-option`;
        option.setAttribute("value", element);
        option.textContent = element;
        select.appendChild(option);
    })

    //Add children to selectDiv
    selectDiv.appendChild(label);
    selectDiv.appendChild(select);

    //Return selectDiv
    return selectDiv;
}

function generateSectionInput(parent, inputName, labelText, inputType, units) {

    //Create elements
    sectionDiv = document.createElement("div");
    sectionInputDiv = document.createElement("div");
    sectionLabel = document.createElement("label");
    sectionInput = document.createElement("input");
    sectionUnitSelect = document.createElement("select");

    //Set up sectionDiv
    sectionDiv.classList.add("form-input-section-div");
    sectionDiv.id = `${parent.id}-${inputName}-section-div`;

    //Set up section input div
    sectionInputDiv.classList.add("form-input-input-div");
    sectionInputDiv.classList.add(`${parent.id}-${inputName}-input-div`);

    //Set up sectionInput
    sectionInput.classList.add("form-input");
    sectionInput.id = `${parent.id}-${inputName}-input`;
    sectionInput.setAttribute("name", inputName);
    sectionInput.setAttribute("type", inputType);

    //Set up section label
    sectionLabel.classList.add("form-label");
    sectionLabel.id = `${parent.id}-${inputName}-label`;
    sectionLabel.textContent = labelText;
    sectionLabel.setAttribute("for", sectionInput.id);

    //Set up unit select
    sectionUnitSelect.classList.add("form-select");
    sectionUnitSelect.id = `${parent.id}-${inputName}-unit-select`;
    
    units.forEach(element => {
        option = document.createElement("option");
        option.classList.add("form-option");
        option.id = `${sectionUnitSelect.id}-${element}-option`;
        option.setAttribute("value", element);
        option.textContent = element;
        sectionUnitSelect.appendChild(option);
    })

    //Add children to input div
    sectionInputDiv.appendChild(sectionInput);
    sectionInputDiv.appendChild(sectionUnitSelect);

    //Add children to sectionDiv
    sectionDiv.appendChild(sectionLabel);
    sectionDiv.appendChild(sectionInputDiv);

    //Add child to parent
    return sectionDiv;
}

function generateSectionHeader(parent, headerText, headerIcon, toolTipText) {

    //Create Elements
    headerDiv = document.createElement("div");
    nameSectionDiv = document.createElement("div");
    toolTipDiv = document.createElement("div");
    nameText = document.createElement("name");
    svgIcon = document.createElement("i");
    infoSvgIcon = document.createElement("i");
    infoToolTipText = document.createElement("span");

    //Set up header div
    headerDiv.classList.add("form-header-div");
    headerDiv.id = `${parent.id}-header-div`;

    //Set up svg icon for header
    svgIcon.classList.add("material-icons");
    svgIcon.classList.add("form-header-icon");
    svgIcon.setAttribute("style", "font-size: 30px");
    svgIcon.textContent = headerIcon;
    

    //Set up header text
    nameText.classList.add("form-header-text");
    nameText.id = `${parent.id}-header-text`;
    nameText.textContent = headerText;

    //Set up name section div
    nameSectionDiv.classList.add("form-header-name-section");
    nameSectionDiv.id = `${parent.id}-header-name-section`;
    nameSectionDiv.appendChild(svgIcon);
    nameSectionDiv.appendChild(nameText);

    //Set up tooltip div
    toolTipDiv.classList.add("tooltip");
    toolTipDiv.classList.add("form-tooltip-div");
    toolTipDiv.id = `${parent.id}-header-tooltip-div`;

    //Set up svg icon for tooltip div
    infoSvgIcon.classList.add("material-symbols-rounded");
    infoSvgIcon.textContent = "info";
    infoSvgIcon.setAttribute("style", "color: blue");

    //Set up tooltiptext
    infoToolTipText.classList.add("tooltiptext");
    infoToolTipText.textContent = toolTipText;

    //Add children to tooltip div
    toolTipDiv.appendChild(infoSvgIcon);
    toolTipDiv.appendChild(infoToolTipText);

    //Append childrent to headerDiv
    headerDiv.appendChild(nameSectionDiv);
    headerDiv.appendChild(toolTipDiv);
    
    //Return header div
    return headerDiv;
}

//Load Lifestyle section
function loadLifestyleSection(parent) {

    //Create elements
    lifestyleDiv = document.createElement("div");
    lifestyleContent = document.createElement("div");


    //Set up lifestyleDiv
    lifestyleDiv.classList.add("form-lifestyle-div");
    lifestyleDiv.id = "lifestyle-div";

    //Set up lifestyle header
    lifestyleHeader = generateSectionHeader(lifestyleDiv, "Lifestyle", "directions_walk", "look at that mean mini-maui just tippity-tappity tap tap tap hey WHAT CAN I SAY ANYEAY YOU'RE WELCOME");

    //Set up lifestyle content
    lifestyleContent.classList.add("form-lifestyle-content");
    lifestyleContent.id = "form-lifestyle-content";

    //Create inputs for lifestyle content
    domesticFlightInput = generateSectionInput(lifestyleContent, "domestic-flight-distance","How much have you flown on domestic flights this year?:", "number", ["km"]);
    internationalFlightInput = generateSectionInput(lifestyleContent, "international-flight-distance","How much have you flown on international flights this year?:", "number", ["km"]);
    flightClassInput = generateSectionSelect(lifestyleContent, "flight-class", "What class do you usually fly in?", ["Business", "First Class"]);
    clothingInput = generateSectionInput(lifestyleContent, "clothing-mass", "How much clothing do you buy in a year?:", "number", ["kg"]);
    shippingInput = generateSectionInput(lifestyleContent, "amount-shipped","How many times is something shipped to your house each month?:", "number", ["packages"]);

    //Add children to lifestyle content
    lifestyleContent.appendChild(domesticFlightInput);
    lifestyleContent.appendChild(internationalFlightInput);
    lifestyleContent.appendChild(flightClassInput);
    lifestyleContent.appendChild(clothingInput);
    lifestyleContent.appendChild(shippingInput);

    //Add children to lifestyleDiv
    lifestyleDiv.appendChild(lifestyleHeader);
    lifestyleDiv.appendChild(lifestyleContent);

    //Add children to parent
    parent.appendChild(lifestyleDiv);
}

//Load diet section
function loadDietSection(parent) {

    //Create elements
    dietDiv = document.createElement("div");
    dietContent = document.createElement("div");

    //Set up dietDiv
    dietDiv.classList.add("form-diet-div");
    dietDiv.id = "diet-div";

    //Set up diet header
    dietHeader = generateSectionHeader(dietDiv, "Diet", "lunch_dining", "burgers are based");

    //Set up diet content
    dietContent.classList.add("form-diet-content");
    dietContent.id = "form-diet-content";

    //Create inputs
    beefInput = generateSectionInput(dietContent, "beef-eaten","How much beef do you eat in a month? (kg):", "number", ["kg"]);
    porkInput = generateSectionInput(dietContent, "pork-eaten","How much pork do you eat in a month? (kg):", "number", ["kg"]);
    chickenInput = generateSectionInput(dietContent, "chicken-eaten", "How much chicken do you eat in a month? (kg):", "number", ["kg"]);
    cheeseInput = generateSectionInput(dietContent, "cheese-eaten", "How much cheese do you eat in a month? (g):", "number", ["kg"]);
    milkInput = generateSectionInput(dietContent, "milk-drunk","How much milk do you drink in a month? (L):", "number", ["kg"]);
    
    //Add inputs to diet content
    dietContent.appendChild(beefInput);
    dietContent.appendChild(porkInput);
    dietContent.appendChild(chickenInput);
    dietContent.appendChild(cheeseInput);
    dietContent.appendChild(milkInput);

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

    //Set up water div
    waterDiv.classList.add("form-water-div");
    waterDiv.id = `form-water-div`;

    //Set up water header
    waterHeader = generateSectionHeader(waterDiv, "Water", "shower", "water is kinda wet");

    //Set up water usage input
    waterUsageInput = generateSectionInput(waterDiv, "water-usage", "How much water do you use each month?:", "number", ["m³", "L"])

    //Add children to electricity section
    waterDiv.appendChild(waterHeader);
    waterDiv.appendChild(waterUsageInput);

    //Add children to parent
    parent.appendChild(waterDiv);
}

//Load electricity section
function loadElectricitySection(parent) {
    
    //Create elements
    electricityDiv = document.createElement("div");
    
    //Set up electricity div
    electricityDiv.classList.add("form-electricity-div");
    electricityDiv.id = `form-electricity-div`;

    //Set up electricity header
    electricityHeader = generateSectionHeader(electricityDiv, "Electricity", "bolt", "a shocking charge");

    //Set up electricity usage input
    electricityUsageInput = generateSectionInput(electricityDiv, "electricity-usage", "How much electricity do you use each month?", "number", ["kWh"])

    //Add children to electricity section
    electricityDiv.appendChild(electricityHeader);
    electricityDiv.appendChild(electricityUsageInput);

    //Add children to parent
    parent.appendChild(electricityDiv);
}

//Reload a vehicle's input if type changes
function reloadVehicleInputs(event, vehicleNumber) {

    //Get vehicle input container
    vehicleInputContainer = document.getElementById(`form-vehicle-section-vehicle-${vehicleNumber}-inputs-div`);
    vehicleInputContainer.innerHTML = "";

    if (event.target.value == "Electric") {
        
        //Add electric vehicle inputs
        chargeInput = generateSectionInput(vehicleInputContainer, "charge-amount", "How much do you spend at charging stations each week?:", "number", ["$"]);
        vehicleInputContainer.appendChild(chargeInput);

    } else {
        
        //Add non-electric vehicle inputs
        vehicleEfficiencyInput = generateSectionInput(vehicleInputsDiv, `vehicle-${vehicleNumber}-efficiency`, "What is the vehicle's fuel efficiency?:", "number", ["L/100km"]);
        vehicleDistanceInput = generateSectionInput(vehicleInputsDiv, `vehicle-${vehicleNumber}-distance`, "How far do you drive your vehicle each week?:", "number", ["km"]);
        vehicleInputContainer.appendChild(vehicleEfficiencyInput);
        vehicleInputContainer.appendChild(vehicleDistanceInput);

    }
}

//Load one vehicle
function loadVehicle(vehicleNumber) {
    
    //Create elements
    vehicleDiv = document.createElement("div");
    vehicleName = document.createElement("p");
    vehicleInputsDiv = document.createElement("div");

    //Set up vehicle div
    vehicleDiv.classList.add("form-vehicle-section-vehicle-div");
    vehicleDiv.id = `form-vehicle-section-vehicle-${vehicleNumber}-div`;

    //Set up vehicle name
    vehicleName.classList.add("form-subheading");
    vehicleName.id = `form-vehicle-section-vehicle-${vehicleNumber}-name`;
    vehicleName.textContent = `Vehicle ${vehicleNumber}`;

    //Set up vehicleInputs div
    vehicleInputsDiv.classList.add("form-vehicle-section-inputs-div");
    vehicleInputsDiv.id = `form-vehicle-section-vehicle-${vehicleNumber}-inputs-div`;

    //Set up vehicle type select
    vehicleTypeSelect = generateSectionSelect(vehicleDiv, `vehicle-${vehicleNumber}-type`, `What is the vehicle's type?:`, ["Gas", "Diesel", "Electric"]);

    //Add event listener to vehicle type select
    vehicleTypeSelect.addEventListener("change", (event)=>{
        reloadVehicleInputs(event, vehicleNumber);
    })

    //Set up vehicle inputs
    vehicleEfficiencyInput = generateSectionInput(vehicleInputsDiv, `vehicle-${vehicleNumber}-efficiency`, "What is the vehicle's fuel efficiency?:", "number", ["L/100km"]);
    vehicleDistanceInput = generateSectionInput(vehicleInputsDiv, `vehicle-${vehicleNumber}-distance`, "How far do you drive your vehicle each week?:", "number", ["km"]);

    //Add inputs to vehicleInputsDiv
    vehicleInputsDiv.appendChild(vehicleEfficiencyInput);
    vehicleInputsDiv.appendChild(vehicleDistanceInput);

    //Add children to vehicleDiv
    vehicleDiv.appendChild(vehicleName);
    vehicleDiv.appendChild(vehicleTypeSelect);
    vehicleDiv.appendChild(vehicleInputsDiv);

    //Return vehicle div
    return vehicleDiv;

}

//Load individual vehicle inputs
function loadVehicleInputs(event, parent) {
    
    //Get the parent and clear its innner HTML
    parent.innerHTML = "";

    //Get the number of vehicles to load
    number = event.value;

    //Load each vehicle
    for (let i = 1; i <= number; i++) {
        vehicle = loadVehicle(i);
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
    vehicleText = generateSectionHeader(vehicleDiv, "Vehicle", "directions_car", "vehicles are pogchamp");
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

//Load housing section for form
function loadHousingSection(parent) {
    
    //Create and get all elements
    housingDiv = document.createElement("div");
    housingDiv.classList.add("form-housing-div");
    housingDiv.id = "form-housing-div"

    housingText = generateSectionHeader(housingDiv, "Housing", "home", "an epic house");
    housingDiv.appendChild(housingText);


    //Create inputs
    naturalGasInput = generateSectionInput(housingDiv, "natural-gas-amount", "Natural Gas:", "number", ["L", "kWh"]);
    heatingOilInput = generateSectionInput(housingDiv, "heating-oil-amount", "Heating Oil:", "number", ["L", 'kWh']);
    propaneInput = generateSectionInput(housingDiv, "propane-amount", "Propane:", "number", ["L", "kWh"]);
    coalInput = generateSectionInput(housingDiv, "coalpane-amount", "Coal:", "number", ["kg", "kWh"]);

    //Append inputs to housing div
    housingDiv.appendChild(naturalGasInput);
    housingDiv.appendChild(heatingOilInput);
    housingDiv.appendChild(propaneInput);
    housingDiv.appendChild(coalInput);

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
    loadLifestyleSection(formElement);
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
    loadGetStarted();
}

//Call main function
main();