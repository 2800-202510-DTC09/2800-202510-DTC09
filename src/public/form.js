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
    console.log(toolTipText);
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

//Load input for selecting primary flight class for lifestyle section
function loadLifeStyleFlightClassSelectorInput(parent) {

    //Create elements
    classSelectorDiv = document.createElement("div");
    classSelectorLabel = document.createElement("label");
    classSelector = document.createElement("select");
    classSelectorFirstClassOption = document.createElement("option");
    classSelectorBusinessClassOption = document.createElement("option");

    //Set up class selector div
    classSelectorDiv.classList.add("form-lifestyle-content-input-div")
    classSelectorDiv.id = `diet-content-flight-class-selector-div`;

    //Set up class selector
    classSelector.classList.add("form-select")
    classSelector.id = "lifestyle-content-class-selector";
    classSelector.setAttribute("name",`lifestyle-content-class-selector`);
    classSelector.setAttribute("type", "number");

    //Set up class selector label
    classSelectorLabel.classList.add("form-label");
    classSelectorLabel.id = "lifestule-content-class-label";
    classSelectorLabel.setAttribute("for", classSelector.id);
    classSelectorLabel.textContent = "What class do you usually fly?:";

    //Set up class selector options
    classSelectorFirstClassOption.classList.add("form-option");
    classSelectorFirstClassOption.id = "lifestyle-content-class-selector-first-class-option";
    classSelectorFirstClassOption.setAttribute("value", "first-class");
    classSelectorFirstClassOption.textContent = "First Class";

    classSelectorBusinessClassOption.classList.add("form-option");
    classSelectorBusinessClassOption.id = "lifestyle-content-class-selector-business-class-option";
    classSelectorBusinessClassOption.setAttribute("value", "business-class");
    classSelectorBusinessClassOption.textContent = "Business Class";

    classSelector.appendChild(classSelectorBusinessClassOption);
    classSelector.appendChild(classSelectorFirstClassOption);

    //Add children to classSelectorDiv
    classSelectorDiv.appendChild(classSelectorLabel);
    classSelectorDiv.appendChild(classSelector);

    //Add children to parent
    return classSelectorDiv;
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
    flightClassInput = loadLifeStyleFlightClassSelectorInput(lifestyleContent);
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
    vehicleName = document.createElement("p");
    vehicleTypeSelect = document.createElement("select");
    vehicleTypeLabel = document.createElement("label");
    vehicleInputsDiv = document.createElement("div");

    //Set up vehicle div
    vehicleDiv.classList.add("form-vehicle-section-vehicle-div");
    vehicleDiv.id = `form-vehicle-section-vehicle-${vehicleNumber}-div`;

    //Set up vehicleInputs div
    vehicleInputsDiv.classlist.add("form-vehicle-section-inputs-div");
    vehicleInputsDiv.id = `form-vehicle-section-vehicle-${vehicleNumber}-inputs-div`;

    //Set up vehicle type select
    vehicleTypeSelect.classList.add("form-select")
    vehicleTypeSelect.id = `form-vehicle-section-vehicle${vehicleNumber}-type-select`;
    vehicleTypeSelect.name = `vehicle-${vehicleNumber}-type`;

    //Set up options for vehicle type select
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
    console.log("Executing main function!");
    loadGetStarted();
}

main();