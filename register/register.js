// Import templates from Templates.js
import { participantTemplate, successTemplate } from './Templates.js';

// Initialize participant count
let participantCount = 1;

// Get references to DOM elements
const addParticipantButton = document.querySelector('#add-participant');
const registrationForm = document.querySelector('#registration-form');
const summarySection = document.querySelector('#summary');
const summaryMessage = document.querySelector('#summary-message');
const resetButton = document.querySelector('#reset-form');

// Add Participant Functionality
addParticipantButton.addEventListener('click', addParticipant);

function addParticipant() {
    // Increment participant count
    participantCount++;
    
    // Create new participant HTML using template
    const newParticipantHTML = participantTemplate(participantCount);
    
    // Insert the new participant before the "Add Participant" button
    addParticipantButton.insertAdjacentHTML('beforebegin', newParticipantHTML);
}

// Submit Form Functionality
registrationForm.addEventListener('submit', submitForm);

function submitForm(event) {
    // Prevent default form submission (page reload)
    event.preventDefault();
    
    // Get adult name from form
    const adultName = document.querySelector('#adult-name').value;
    
    // Calculate total fees
    const feeTotal = totalFees();
    
    // Create info object for success message
    const info = {
        adultName: adultName,
        numParticipants: participantCount,
        feeTotal: feeTotal
    };
    
    // Hide form and show summary
    registrationForm.classList.add('hide');
    summarySection.classList.remove('hide');
    
    // Display success message
    summaryMessage.textContent = successTemplate(info);
}

// Calculate total fees function
function totalFees() {
    // Select all elements with id starting with "fee"
    let feeElements = document.querySelectorAll("[id^=fee]");
    
    // Convert NodeList to Array using spread operator
    feeElements = [...feeElements];
    
    // Sum up all the fees using reduce
    const total = feeElements.reduce((sum, element) => {
        return sum + Number(element.value);
    }, 0);
    
    return total;
}

// Reset form functionality (bonus feature)
resetButton.addEventListener('click', resetForm);

function resetForm() {
    // Hide summary and show form
    summarySection.classList.add('hide');
    registrationForm.classList.remove('hide');
    
    // Reset the form
    registrationForm.reset();
    
    // Remove extra participants (keep only participant 1)
    const participants = document.querySelectorAll('.participants section');
    participants.forEach((participant, index) => {
        if (index > 0) {
            participant.remove();
        }
    });
    
    // Reset participant count
    participantCount = 1;
}