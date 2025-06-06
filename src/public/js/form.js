/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
// Change input background color when updated
function changeInputColor(event) {
    if (event.target.value !== '') {
        if (event.target.classList.contains('form-input-unconfirmed')) {
            event.target.classList.remove('form-input-unconfirmed');
            event.target.classList.add('form-input-confirmed');
        }
    } else if (event.target.classList.contains('form-input-confirmed')) {
        event.target.classList.remove('form-input-confirmed');
        event.target.classList.add('form-input-unconfirmed');
    }
}

function generateSectionSelect(
    parent,
    selectName,
    selectionType,
    labelText,
    options,
    record,
) {
    // Create elements
    selectDiv = document.createElement('div');
    select = document.createElement('select');
    label = document.createElement('label');

    // Set up select div
    selectDiv.classList.add('form-select-div');
    selectDiv.id = `${parent.id}-${selectName}-select-div`;

    // Set up select
    select.classList.add(selectionType);
    select.id = `${parent.id}-${select}-select`;
    select.setAttribute('name', selectName);

    // Set up label
    label.classType = 'form-label';
    label.id = `${parent.id}-${selectName}-label`;
    label.setAttribute('for', select.id);
    label.textContent = labelText;

    // Create options and add tem to select
    options.forEach((element) => {
        option = document.createElement('option');
        option.classList.add('form-option');
        option.id = `${select.id}-${element}-option`;
        option.setAttribute('value', element);
        option.textContent = element;
        select.appendChild(option);
    });

    if (!selectName.includes('vehicle')) {
        select.setAttribute('value', record[selectName])
    }

    // Add children to selectDiv
    selectDiv.appendChild(label);
    selectDiv.appendChild(select);

    // Return selectDiv
    return selectDiv;
}

function generateSectionInput(parent, inputName, labelText, inputType, units, record) {
    // Create elements
    sectionDiv = document.createElement('div');
    sectionInputDiv = document.createElement('div');
    sectionLabel = document.createElement('label');
    sectionInput = document.createElement('input');
    sectionUnitSelect = document.createElement('select');

    // Set up sectionDiv
    sectionDiv.classList.add('form-input-section-div');
    sectionDiv.id = `${parent.id}-${inputName}-section-div`;

    // Set up section input div
    sectionInputDiv.classList.add('form-input-input-div');
    sectionInputDiv.classList.add(`${parent.id}-${inputName}-input-div`);

    // Set up sectionInput
    sectionInput.classList.add('form-input');
    sectionInput.classList.add('form-input-unconfirmed');
    sectionInput.id = `${parent.id}-${inputName}-input`;
    sectionInput.setAttribute('name', inputName);
    sectionInput.setAttribute('type', inputType);
    sectionInput.addEventListener('change', (event) => {
        changeInputColor(event);
    });
    if(!inputName.includes('vehicle')) {
        sectionInput.setAttribute('value', record[inputName]);
    }

    // Set up section label
    sectionLabel.classList.add('form-label');
    sectionLabel.id = `${parent.id}-${inputName}-label`;
    sectionLabel.textContent = labelText;
    sectionLabel.setAttribute('for', sectionInput.id);

    // Set up unit select
    sectionUnitSelect.classList.add('form-select');
    sectionUnitSelect.id = `${parent.id}-${inputName}-unit-select`;
    sectionUnitSelect.setAttribute("name", `${inputName}_unit`);

    units.forEach((element) => {
        option = document.createElement('option');
        option.classList.add('form-option');
        option.id = `${sectionUnitSelect.id}-${element}-option`;
        option.setAttribute('value', element);
        option.textContent = element;
        sectionUnitSelect.appendChild(option);
    });

    // Add children to input div
    sectionInputDiv.appendChild(sectionInput);
    sectionInputDiv.appendChild(sectionUnitSelect);

    // Add children to sectionDiv
    sectionDiv.appendChild(sectionLabel);
    sectionDiv.appendChild(sectionInputDiv);

    // Add child to parent
    return sectionDiv;
}

function generateSectionHeader(parent, headerText, headerIcon, toolTipText) {
    // Create Elements
    headerDiv = document.createElement('div');
    nameSectionDiv = document.createElement('div');
    toolTipDiv = document.createElement('div');
    nameText = document.createElement('name');
    svgIcon = document.createElement('i');
    infoSvgIcon = document.createElement('i');
    infoToolTipText = document.createElement('span');

    // Set up header div
    headerDiv.classList.add('form-header-div');
    headerDiv.id = `${parent.id}-header-div`;

    // Set up svg icon for header
    svgIcon.classList.add('material-icons');
    svgIcon.classList.add('form-header-icon');
    svgIcon.setAttribute('style', 'font-size: 30px');
    svgIcon.textContent = headerIcon;

    // Set up header text
    nameText.classList.add('form-header-text');
    nameText.id = `${parent.id}-header-text`;
    nameText.textContent = headerText;

    // Set up name section div
    nameSectionDiv.classList.add('form-header-name-section');
    nameSectionDiv.id = `${parent.id}-header-name-section`;
    nameSectionDiv.appendChild(svgIcon);
    nameSectionDiv.appendChild(nameText);

    // Set up tooltip div
    toolTipDiv.classList.add('tooltip');
    toolTipDiv.classList.add('form-tooltip-div');
    toolTipDiv.id = `${parent.id}-header-tooltip-div`;

    // Set up svg icon for tooltip div
    infoSvgIcon.classList.add('material-symbols-rounded');
    infoSvgIcon.textContent = 'info';
    infoSvgIcon.setAttribute('style', 'color: blue');

    // Set up tooltiptext
    infoToolTipText.classList.add('tooltiptext');
    infoToolTipText.textContent = toolTipText;

    // Add children to tooltip div
    toolTipDiv.appendChild(infoSvgIcon);
    toolTipDiv.appendChild(infoToolTipText);

    // Append childrent to headerDiv
    headerDiv.appendChild(nameSectionDiv);
    headerDiv.appendChild(toolTipDiv);

    // Return header div
    return headerDiv;
}

// Load Lifestyle section
function loadLifestyleSection(parent, record) {
    // Create elements
    lifestyleDiv = document.createElement('div');
    lifestyleContent = document.createElement('div');

    // Set up lifestyleDiv
    lifestyleDiv.classList.add('form-lifestyle-div');
    lifestyleDiv.id = 'lifestyle-div';

    // Set up lifestyle header
    lifestyleHeader = generateSectionHeader(
        lifestyleDiv,
        'Lifestyle',
        'directions_walk',
        "This section tracks common lifestyle choices and how much they emit. Please pay close attention to the units.",
    );

    // Set up lifestyle content
    lifestyleContent.classList.add('form-lifestyle-content');
    lifestyleContent.id = 'form-lifestyle-content';

    // Create inputs for lifestyle content
    domesticFlightInput = generateSectionInput(
        lifestyleContent,
        'lifestyle_domestic_flights_distance',
        'How much have you flown on domestic flights this month?:',
        'number',
        ['km'],
        record,
    );
    internationalFlightInput = generateSectionInput(
        lifestyleContent,
        'lifestyle_international_flights_distance',
        'How much have you flown on international flights this month?:',
        'number',
        ['km'],
        record,
    );
    flightClassInput = generateSectionSelect(
        lifestyleContent,
        'lifestyle_flights_class',
        'form-select-large',
        'What class do you usually fly in?:',
        ['Business', 'First Class'],
        record,
    );
    clothingInput = generateSectionInput(
        lifestyleContent,
        'lifestyle_clothing_purchased_amount',
        'How much clothing do you buy in a month?:',
        'number',
        ['kg'],
        record,
    );
    shippingInput = generateSectionInput(
        lifestyleContent,
        'lifestyle_shipping_amount',
        'How much is something shipped to your house each month?:',
        'number',
        ['$'],
        record,
    );

    // Add children to lifestyle content
    lifestyleContent.appendChild(domesticFlightInput);
    lifestyleContent.appendChild(internationalFlightInput);
    lifestyleContent.appendChild(flightClassInput);
    lifestyleContent.appendChild(clothingInput);
    lifestyleContent.appendChild(shippingInput);

    // Add children to lifestyleDiv
    lifestyleDiv.appendChild(lifestyleHeader);
    lifestyleDiv.appendChild(lifestyleContent);

    // Add children to parent
    parent.appendChild(lifestyleDiv);
}

// Load diet section
function loadDietSection(parent, record) {
    // Create elements
    dietDiv = document.createElement('div');
    dietContent = document.createElement('div');

    // Set up dietDiv
    dietDiv.classList.add('form-diet-div');
    dietDiv.id = 'diet-div';

    // Set up diet header
    dietHeader = generateSectionHeader(
        dietDiv,
        'Diet',
        'lunch_dining',
        'This section tracks common diet choices and how much they emit. Please pay close attention to the units.',
    );

    // Set up diet content
    dietContent.classList.add('form-diet-content');
    dietContent.id = 'form-diet-content';

    // Create inputs
    beefInput = generateSectionInput(
        dietContent,
        'diet_beef_amount',
        'How much beef do you eat in a month?:',
        'number',
        ['kg'],
        record,
    );
    porkInput = generateSectionInput(
        dietContent,
        'diet_pork_amount',
        'How much pork do you eat in a month?:',
        'number',
        ['kg'],
        record,
    );
    chickenInput = generateSectionInput(
        dietContent,
        'diet_chicken_amount',
        'How much chicken do you eat in a month?:',
        'number',
        ['kg'],
        record,
    );
    cheeseInput = generateSectionInput(
        dietContent,
        'diet_cheese_amount',
        'How much cheese do you eat in a month?:',
        'number',
        ['kg'],
        record,
    );
    milkInput = generateSectionInput(
        dietContent,
        'diet_milk_amount',
        'How much milk do you drink in a month?:',
        'number',
        ['kg'],
        record,
    );

    // Add inputs to diet content
    dietContent.appendChild(beefInput);
    dietContent.appendChild(porkInput);
    dietContent.appendChild(chickenInput);
    dietContent.appendChild(cheeseInput);
    dietContent.appendChild(milkInput);

    // Add children to dietDiv
    dietDiv.appendChild(dietHeader);
    dietDiv.appendChild(dietContent);

    // Add children to parent
    parent.appendChild(dietDiv);
}

// Load water section
function loadWaterSection(parent, record) {
    // Create elements
    waterDiv = document.createElement('div');

    // Set up water div
    waterDiv.classList.add('form-water-div');
    waterDiv.id = `form-water-div`;

    // Set up water header
    waterHeader = generateSectionHeader(
        waterDiv,
        'Water',
        'shower',
        'This section tracks how much water you use each month. This is not used to calculate emissions.',
    );

    // Set up water usage input
    waterUsageInput = generateSectionInput(
        waterDiv,
        'water_amount',
        'How much water do you use each month?:',
        'number',
        ['m³', 'L'],
        record,
    );

    // Add children to electricity section
    waterDiv.appendChild(waterHeader);
    waterDiv.appendChild(waterUsageInput);

    // Add children to parent
    parent.appendChild(waterDiv);
}

// Load electricity section
function loadElectricitySection(parent, record) {
    // Create elements
    electricityDiv = document.createElement('div');

    // Set up electricity div
    electricityDiv.classList.add('form-electricity-div');
    electricityDiv.id = `form-electricity-div`;

    // Set up electricity header
    electricityHeader = generateSectionHeader(
        electricityDiv,
        'Electricity',
        'bolt',
        'This section tracks how much you emit by using electricity. You can find your monthly electricity usage on your energy bill.',
    );

    // Set up electricity usage input
    electricityUsageInput = generateSectionInput(
        electricityDiv,
        'electricity_amount',
        'How much electricity do you use each month?:',
        'number',
        ['kWh'],
        record,
    );

    // Add children to electricity section
    electricityDiv.appendChild(electricityHeader);
    electricityDiv.appendChild(electricityUsageInput);

    // Add children to parent
    parent.appendChild(electricityDiv);
}

// Reload a vehicle's input if type changes
function reloadVehicleInputs(event, vehicleNumber, record) {
    // Get vehicle input container
    vehicleInputContainer = document.getElementById(
        `form-vehicle-section-vehicle-${vehicleNumber}-inputs-div`,
    );
    vehicleInputContainer.innerHTML = '';

    if (event.target.value == 'Electric') {
        // Add electric vehicle inputs
        chargeInput = generateSectionInput(
            vehicleInputContainer,
            `vehicle-${vehicleNumber}-charge-amount`,
            'How much do you spend at charging stations each month?:',
            'number',
            ['$'],
        );

        if (record.vehicle_amount >= vehicleNumber) {
            chargeInput.children[1].children[0].value = record.vehicles[vehicleNumber-1].vehicle_charging;
        } else {
            chargeInput.children[1].children[0].value = 0;
        }

        vehicleInputContainer.appendChild(chargeInput);
    } else {
        // Add non-electric vehicle inputs
        vehicleEfficiencyInput = generateSectionInput(
            vehicleInputsDiv,
            `vehicle-${vehicleNumber}-efficiency`,
            "What is the vehicle's fuel efficiency?:",
            'number',
            ['L/100km'],
        );

        if (record.vehicle_amount >= vehicleNumber) {
            console.log(vehicleEfficiencyInput.children[1])
            vehicleEfficiencyInput.children[1].children[0].value = record.vehicles[vehicleNumber-1].vehicle_fuel_efficiency;
        } else {
            vehicleEfficiencyInput.children[1].children[0].value = 0;
        }

        vehicleDistanceInput = generateSectionInput(
            vehicleInputsDiv,
            `vehicle-${vehicleNumber}-distance`,
            'How far do you drive your vehicle each month?:',
            'number',
            ['km'],
        );

        if (record.vehicle_amount >= vehicleNumber) {
            vehicleDistanceInput.children[1].children[0].value = record.vehicles[vehicleNumber-1].vehicle_distance;
        } else {
            vehicleDistanceInput.children[1].children[0].value = 0;
        }
        vehicleInputContainer.appendChild(vehicleEfficiencyInput);
        vehicleInputContainer.appendChild(vehicleDistanceInput);
    }
}

// Load one vehicle
function loadVehicle(vehicleNumber, record) {
    // Create elements
    vehicleDiv = document.createElement('div');
    vehicleName = document.createElement('p');
    vehicleInputsDiv = document.createElement('div');

    // Set up vehicle div
    vehicleDiv.classList.add('form-vehicle-section-vehicle-div');
    vehicleDiv.id = `form-vehicle-section-vehicle-${vehicleNumber}-div`;

    // Set up vehicle name
    vehicleName.classList.add('form-subheading');
    vehicleName.id = `form-vehicle-section-vehicle-${vehicleNumber}-name`;
    vehicleName.textContent = `Vehicle ${vehicleNumber}`;

    // Set up vehicleInputs div
    vehicleInputsDiv.classList.add('form-vehicle-section-inputs-div');
    vehicleInputsDiv.id = `form-vehicle-section-vehicle-${vehicleNumber}-inputs-div`;

    // Set up vehicle type select
    vehicleTypeSelect = generateSectionSelect(
        vehicleDiv,
        `vehicle-${vehicleNumber}-type`,
        `form-select-large`,
        `What is the vehicle's type?:`,
        ['Gas', 'Diesel', 'Electric'],
    );

    if (record.vehicle_amount >= vehicleNumber) {
        vehicleTypeSelect.children[1].value = record.vehicles[vehicleNumber-1].vehicle_type;
    }

    // Add event listener to vehicle type select
    vehicleTypeSelect.addEventListener('change', (event) => {
        reloadVehicleInputs(event, vehicleNumber, record);
    });

    if (vehicleTypeSelect.children[1].value == 'Electric') {
        // Add electric vehicle inputs
        chargeInput = generateSectionInput(
            vehicleInputsDiv,
            `vehicle-${vehicleNumber}-charge-amount`,
            'How much do you spend at charging stations each month?:',
            'number',
            ['$'],
        );

        if (record.vehicle_amount >= vehicleNumber) {
            chargeInput.children[1].children[0].value = record.vehicles[vehicleNumber-1].vehicle_charging;
        } else {
            chargeInput.children[1].children[0].value = 0;
        }

        vehicleInputsDiv.appendChild(chargeInput);
    } else {
        // Add non-electric vehicle inputs
        vehicleEfficiencyInput = generateSectionInput(
            vehicleInputsDiv,
            `vehicle-${vehicleNumber}-efficiency`,
            "What is the vehicle's fuel efficiency?:",
            'number',
            ['L/100km'],
        );

        if (record.vehicle_amount >= vehicleNumber) {
            vehicleEfficiencyInput.children[1].children[0].value = record.vehicles[vehicleNumber-1].vehicle_fuel_efficiency;
        } else {
            vehicleEfficiencyInput.children[1].children[0].value = 0;
        }

        vehicleDistanceInput = generateSectionInput(
            vehicleInputsDiv,
            `vehicle-${vehicleNumber}-distance`,
            'How far do you drive your vehicle each month?:',
            'number',
            ['km'],
        );

        if (record.vehicle_amount >= vehicleNumber) {
            vehicleDistanceInput.children[1].children[0].value = record.vehicles[vehicleNumber-1].vehicle_distance;
        } else {
            vehicleDistanceInput.children[1].children[0].value = 0;
        }

        vehicleInputsDiv.appendChild(vehicleEfficiencyInput);
        vehicleInputsDiv.appendChild(vehicleDistanceInput);
    }
    // Add children to vehicleDiv
    vehicleDiv.appendChild(vehicleName);
    vehicleDiv.appendChild(vehicleTypeSelect);
    vehicleDiv.appendChild(vehicleInputsDiv);

    // Return vehicle div
    return vehicleDiv;
}

// Load individual vehicle inputs
function loadVehicleInputs(event, parent, record) {
    // Get the parent and clear its innner HTML
    parent.innerHTML = '';

    // Get the number of vehicles to load
    number = event.value;

    // Load each vehicle
    for (let i = 1; i <= number; i++) {
        vehicle = loadVehicle(i, record);
        parent.append(vehicle);
    }
}

// Load vehicle section of the form
function loadVehicleSection(parent, record) {
    // Create elements
    vehicleDiv = document.createElement('div');
    vehicleContainer = document.createElement('div');
    vehicleNumberDiv = document.createElement('div');
    vehicleNumberLabel = document.createElement('label');
    vehicleNumberSelection = document.createElement('select');

    // Set up vehicleDiv and add header text
    vehicleDiv.classList.add('form-vehicle-div');
    vehicleText = generateSectionHeader(
        vehicleDiv,
        'Vehicle',
        'directions_car',
        'This section tracks how you emit by driving your vehicle(s). You can enter information for up to four vehicles.',
    );
    vehicleDiv.appendChild(vehicleText);

    // Set up vechicleContainer
    vehicleContainer.classList.add('form-vehicle-container');
    vehicleContainer.id = 'vehicle-container';

    // Set up div to hold vehicle number elements
    vehicleNumberDiv.classList.add('form-vehicle-number-div');

    // Set up label for vehicle number selection
    vehicleNumberLabel.classList.add('form-label');
    vehicleNumberLabel.textContent =
        'How many vehicles do you regularly drive?:';
    vehicleNumberLabel.setAttribute('for', vehicleNumberSelection.id);
    
    // Set up element for vehicle number selection
    vehicleNumberSelection.classList.add('form-select-large');
    vehicleNumberSelection.id = 'vehicle-number-select';
    vehicleNumberSelection.setAttribute('name', 'vehicle_amount');
    vehicleNumberSelection.addEventListener('change', () =>
        loadVehicleInputs(vehicleNumberSelection, vehicleContainer, record),
    );

    // Add options for vehicle number selection
    for (let i = 0; i <= 4; i++) {
        option = document.createElement('option');
        option.classList.add('form-option');
        option.id = `vehicle-number-option-${i}`;
        option.setAttribute('value', i);
        option.textContent = i;
        vehicleNumberSelection.appendChild(option);
        if (record.vehicle_amount == option.value) {
            option.selected = true;
        }
    }

    // Append children into vehicleNumberDiv
    vehicleNumberDiv.appendChild(vehicleNumberLabel);
    vehicleNumberDiv.appendChild(vehicleNumberSelection);

    // Append chilren into vehicle div
    vehicleDiv.appendChild(vehicleNumberDiv);
    vehicleDiv.appendChild(vehicleContainer);

    // Append vehicleNumberDiv to parent
    parent.appendChild(vehicleDiv);

    loadVehicleInputs(vehicleNumberSelection, vehicleContainer, record);
}

// Load housing section for form
function loadHousingSection(parent, record) {
    // Create and get all elements
    housingDiv = document.createElement('div');
    housingDiv.classList.add('form-housing-div');
    housingDiv.id = 'form-housing-div';

    housingText = generateSectionHeader(
        housingDiv,
        'Housing',
        'home',
        'This section calculates how much you emit by heating your home. For each heating source, you can enter the amount you use or the kWh of power you get from that source.'
    );
    housingDiv.appendChild(housingText);

    // Create inputs
    peopleInHouseInput = generateSectionInput(
        housingDiv,
        'housing_people',
        'How many people live in your house?',
        'number',
        ['people'],
        record,
    )

    naturalGasInput = generateSectionInput(
        housingDiv,
        'housing_natural_gas_amount',
        'How much natural gas do you use to heat your house each month?:',
        'number',
        ['m³', 'kWh'],
        record,
    );
    heatingOilInput = generateSectionInput(
        housingDiv,
        'housing_heating_oil_amount',
        'How much heating oil do you use to heat your house each month?:',
        'number',
        ['L', 'kWh'],
        record,
    );
    propaneInput = generateSectionInput(
        housingDiv,
        'housing_propane_amount',
        'How much propane do you use to heat your house each month?:',
        'number',
        ['L', 'kWh'],
        record,
    );
    coalInput = generateSectionInput(
        housingDiv,
        'housing_coal_amount',
        'How much coal do you use to heat your house each month?:',
        'number',
        ['kg', 'kWh'],
        record,
    );

    // Append inputs to housing div
    housingDiv.appendChild(peopleInHouseInput);
    housingDiv.appendChild(naturalGasInput);
    housingDiv.appendChild(heatingOilInput);
    housingDiv.appendChild(propaneInput);
    housingDiv.appendChild(coalInput);

    // Append housing div to form
    parent.appendChild(housingDiv);
}

// Run instruction when form is saved
function onSave() {
    // Get parent
    let contentDiv = document.getElementsByClassName('form-content')[0];
    contentDiv.innerHTML = '';

    // Create elements
    let card = document.createElement('div');
    let text = document.createElement('p');
    let button = document.createElement('div');
    let checkmark = document.createElement('i');

    // Set up card
    card.classList.add('form-card');
    card.id = 'submitted-card-div';

    // Set up checkmark
    checkmark.classList.add('material-icons');
    checkmark.setAttribute('style', 'font-size: 100px; color: green; margin: auto;');
    checkmark.id = 'submitted-card-checkmark';
    checkmark.textContent = 'check_circle';

    // Set up text
    text.classList.add('form-card-text');
    text.id = 'submitted-card-text';
    text.textContent = 'Your form has been submitted! Press the button to see your results.';

    // Set up button
    button.classList.add('form-button-large');
    button.id = 'submit-card-button';
    button.textContent = 'Continue';
    button.addEventListener('click', () => {
        console.log('Continuing');
    });

    // Add children to card
    card.appendChild(checkmark);
    card.appendChild(text);
    card.appendChild(button);

    // Append card to parent
    contentDiv.appendChild(card);
}

// Load save button
function loadSaveButton(parent, formElement) {
    let saveButtonDiv = document.createElement('div');
    let saveButton = document.createElement('button');

    // Set up saveButtonDiv
    saveButtonDiv.classList.add('form-save-button-div');
    saveButtonDiv.id = 'save-button-div';

    // Set up saveButton
    saveButton.classList.add('form-button');
    saveButton.setAttribute('type', 'submit');
    saveButton.id = 'save-button';
    saveButton.textContent = 'Submit';

    saveButton.addEventListener("click", async (event) => {


    // inputs = document.querySelectorAll("input");
    // jsonObject = {};

    // inputs.forEach((input) => {
    //     jsonObject[input.name] = input.value;
    // })
    // console.log(jsonObject);

    // await fetch("/api/record", {
    //     method: "POST",
    //     headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json"
    //     },
    //     body: JSON.stringify(jsonObject)
    // });    
});
    // Add saveButton to saveButtonDiv
    saveButtonDiv.appendChild(saveButton);

    // Add saveButtonDiv to parent
    parent.appendChild(saveButtonDiv);
}

// Load the form
async function loadForm() {

    contentDiv = document.getElementsByClassName('form-content')[0];
    formElement = document.createElement('form');
    formElement.classList.add('form-element');
    formElement.setAttribute('action', "/api/record/");
     formElement.setAttribute('method', "POST");
    hiddenInput = document.createElement("input");

    try {
    const response = await fetch('/users');
    if (!response.ok) throw new Error('Failed to fetch user data');

    const data = await response.json();
    const recordResponse = await fetch(`/api/record/${data.user.id}`);
    const record = await recordResponse.json()
    if (!data?.user?.username) throw new Error("Username not found in response");

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "user";
    hiddenInput.id = "userID";
    hiddenInput.value = data.user.id;

    formElement.appendChild(hiddenInput);

    contentDiv.innerHTML = '';
    formElement.appendChild(hiddenInput);
    loadHousingSection(formElement, record);
    loadVehicleSection(formElement, record);
    loadElectricitySection(formElement, record);
    loadWaterSection(formElement, record);
    loadDietSection(formElement, record);
    loadLifestyleSection(formElement,record );
    loadSaveButton(formElement);
    contentDiv.appendChild(formElement);
    } catch (error) {
        console.error("Error fetching username:", error);
    }
}

// Load get started box
function loadGetStarted() {
    // Get parent
    contentDiv = document.getElementsByClassName('form-content')[0];

    // Create elements
    card = document.createElement('div');
    text = document.createElement('p');
    button = document.createElement('div');

    // Set up card
    card.classList.add('form-card');
    card.id = 'begin-card-div';

    // Set up text
    text.classList.add('form-card-text');
    text.id = 'begin-card-text';
    text.textContent =
        'This form helps us estimate your carbon emmisions. Press the button to begin filling out the form.';

    // Set up button
    button.classList.add('form-button-large');
    button.id = 'begin-card-button';
    button.textContent = 'Begin';
    button.addEventListener('click', () => {
        loadForm();
        button.removeEventListener('click', arguments.callee);
    });

    // Add children to card
    card.appendChild(text);
    card.appendChild(button);

    // Append card to parent
    contentDiv.appendChild(card);
}

// Main function. Executes once forms.html loads
function main() {
    loadForm();
}

// Call main function
main();
