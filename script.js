function calculateHealth() {

    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const activity = parseFloat(document.getElementById("activity").value);
    const goal = document.getElementById("goal").value; // lose / maintain / gain

    // Basic Validation
    if (!height || !weight || !age || !gender || !activity || !goal) {
        alert("Please complete all fields.");
        return;
    }

    if (height < 50 || height > 250 || weight < 20 || weight > 300 || age < 5 || age > 120) {
        alert("Please enter realistic values.");
        return;
    }

    // BMI
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    const bmiRounded = bmi.toFixed(2);

    let category, bmiColor, healthScore;

    if (bmi < 18.5) {
        category = "Underweight";
        bmiColor = "#3498db";
        healthScore = 60;
    } else if (bmi < 24.9) {
        category = "Normal";
        bmiColor = "#2ecc71";
        healthScore = 90;
    } else if (bmi < 29.9) {
        category = "Overweight";
        bmiColor = "#f39c12";
        healthScore = 70;
    } else {
        category = "Obese";
        bmiColor = "#e74c3c";
        healthScore = 40;
    }

    // BMR (Mifflin-St Jeor)
    let bmr = gender === "male"
        ? (10 * weight) + (6.25 * height) - (5 * age) + 5
        : (10 * weight) + (6.25 * height) - (5 * age) - 161;

    const maintenanceCalories = Math.round(bmr * activity);

    let targetCalories;
    if (goal === "lose") {
        targetCalories = maintenanceCalories - 500;
    } else if (goal === "gain") {
        targetCalories = maintenanceCalories + 500;
    } else {
        targetCalories = maintenanceCalories;
    }

    // Extra Recommendations
    const protein = Math.round(weight * 1.6); // grams
    const water = Math.round(weight * 35); // ml

    document.getElementById("result").innerHTML = `
        <div style="padding:20px;border-radius:12px;background:#f8f9fa;">
            <h3>Advanced Health Report</h3>

            <p><strong>BMI:</strong> 
                <span style="color:${bmiColor};font-weight:bold;">
                    ${bmiRounded}
                </span>
            </p>

            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Health Score:</strong> ${healthScore}/100</p>

            <hr>

            <p><strong>Maintenance Calories:</strong> ${maintenanceCalories} kcal/day</p>
            <p><strong>Target Calories (${goal}):</strong> ${targetCalories} kcal/day</p>

            <hr>

            <p><strong>Recommended Protein:</strong> ${protein} g/day</p>
            <p><strong>Recommended Water Intake:</strong> ${water} ml/day</p>

            <small style="color:gray;">
                This tool provides general fitness guidance. Consult a medical professional for personalized advice.
            </small>
        </div>
    `;
}
