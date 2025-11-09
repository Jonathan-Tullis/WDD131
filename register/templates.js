// Template for new participant section
export function participantTemplate(count) {
    return `
        <section class="participant${count}">
            <p>Participant ${count}</p>
            
            <div class="form-group">
                <label for="fname${count}">First Name *</label>
                <input type="text" id="fname${count}" name="fname${count}" required>
            </div>
            
            <div class="form-group">
                <label for="lname${count}">Last Name *</label>
                <input type="text" id="lname${count}" name="lname${count}" required>
            </div>
            
            <div class="form-group">
                <label for="age${count}">Age *</label>
                <input type="number" id="age${count}" name="age${count}" min="5" max="18" required>
            </div>
            
            <div class="form-group">
                <label>Gender *</label>
                <div class="radio-group">
                    <label>
                        <input type="radio" name="gender${count}" value="male" required>
                        <span>Male</span>
                    </label>
                    <label>
                        <input type="radio" name="gender${count}" value="female" required>
                        <span>Female</span>
                    </label>
                </div>
            </div>
            
            <div class="form-group">
                <label for="fee${count}">Registration Fee *</label>
                <input type="number" id="fee${count}" name="fee${count}" value="0" min="0" required>
            </div>
        </section>
    `;
}

// Template for success message
export function successTemplate(info) {
    return `Thank you ${info.adultName} for registering. You have registered ${info.numParticipants} participant(s) and owe $${info.feeTotal} in Fees.`;
}