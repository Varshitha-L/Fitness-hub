function calculateHealth() {
    // Get values and convert to numbers
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const activity = parseFloat(document.getElementById("activity").value);

    // Validation
    if (!height || !weight || !age || !gender || !activity) {
        alert("Please fill all fields correctly.");
        return;
    }

    if (height <= 0 || weight <= 0 || age <= 0) {
        alert("Height, weight and age must be positive values.");
        return;
    }

    // BMI Calculation
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    const bmiRounded = bmi.toFixed(2);

    let category = "";
    let diet = "";
    let bmiColor = "";

    if (bmi < 18.5) {
        category = "Underweight";
        bmiColor = "#3498db";
        diet = "Increase calorie intake with healthy fats, dairy, rice, nuts, and protein-rich foods.";
    } 
    else if (bmi < 24.9) {
        category = "Normal Weight";
        bmiColor = "#2ecc71";
        diet = "Maintain balanced meals: lean protein, vegetables, fruits, whole grains.";
    } 
    else if (bmi < 29.9) {
        category = "Overweight";
        bmiColor = "#f39c12";
        diet = "Reduce refined carbs, increase fiber, lean proteins, and daily physical activity.";
    } 
    else {
        category = "Obese";
        bmiColor = "#e74c3c";
        diet = "Follow structured calorie deficit plan, avoid sugary drinks, prioritize fiber and protein.";
    }

    // BMR (Mifflin-St Jeor Equation)
    let bmr;
    if (gender === "male") {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // Daily calorie needs
    const maintenanceCalories = Math.round(bmr * activity);
    const weightLossCalories = Math.round(maintenanceCalories - 500);
    const weightGainCalories = Math.round(maintenanceCalories + 500);

    // Display Result
    document.getElementById("result").innerHTML = `
        <div style="padding:15px; border-radius:10px; background:#f4f6f9;">
            <h3>Health Report</h3>
            <p><strong>BMI:</strong> 
                <span style="color:${bmiColor}; font-weight:bold;">
                    ${bmiRounded}
                </span>
            </p>
            <p><strong>Category:</strong> ${category}</p>
            <hr>
            <p><strong>Maintenance Calories:</strong> ${maintenanceCalories} kcal/day</p>
            <p><strong>For Weight Loss:</strong> ${weightLossCalories} kcal/day</p>
            <p><strong>For Weight Gain:</strong> ${weightGainCalories} kcal/day</p>
            <hr>
            <p><strong>Suggested Diet:</strong> ${diet}</p>
            <small style="color:gray;">
                This is general guidance only. Consult a healthcare professional for medical advice.
            </small>
        </div>
    `;
}
