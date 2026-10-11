function calculateHealth() {
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const activity = parseFloat(document.getElementById("activity").value);
    const goal = document.getElementById("goal").value;
    const waist = parseFloat(document.getElementById("waist").value);

    if (isNaN(height) || isNaN(weight) || isNaN(age) || !gender || isNaN(activity) || !goal) {
        alert("Please complete all fields.");
        return;
    }

    // BMI
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    const bmiRounded = bmi.toFixed(2);

    let category, color;
    if (bmi < 18.5) { category = "Underweight"; color = "#3498db"; }
    else if (bmi < 24.9) { category = "Normal"; color = "#2ecc71"; }
    else if (bmi < 29.9) { category = "Overweight"; color = "#f39c12"; }
    else { category = "Obese"; color = "#e74c3c"; }

    // BMR
    let bmr = gender === "male"
        ? (10 * weight) + (6.25 * height) - (5 * age) + 5
        : (10 * weight) + (6.25 * height) - (5 * age) - 161;

    const maintenance = Math.round(bmr * activity);
    let targetCalories = maintenance;
    if (goal === "lose") targetCalories -= 500;
    if (goal === "gain") targetCalories += 500;

    // Macros
    const proteinG = Math.round((targetCalories * 0.30) / 4);
    const carbsG = Math.round((targetCalories * 0.40) / 4);
    const fatG = Math.round((targetCalories * 0.30) / 9);

    const minWeight = (18.5 * heightM * heightM).toFixed(1);
    const maxWeight = (24.9 * heightM * heightM).toFixed(1);

    // Body Fat Estimate
    let bodyFat = "N/A";
    if (!isNaN(waist)) {
        if (gender === "male") {
            bodyFat = (86.010 * Math.log10(waist - 70) - 70.041 * Math.log10(height) + 36.76).toFixed(1);
        } else {
            bodyFat = (163.205 * Math.log10(waist + 36) - 97.684 * Math.log10(height) - 78.387).toFixed(1);
        }
    }

    // Per Meal
    const perMeal = Math.round(targetCalories / 3);

    // Save History
    const record = { date: new Date().toLocaleDateString(), weight, bmi: bmiRounded };
    let history = JSON.parse(localStorage.getItem("healthHistory")) || [];
    history.push(record);
    localStorage.setItem("healthHistory", JSON.stringify(history));

    // Output
    document.getElementById("result").innerHTML = `
        <div class="report-box">
            <h2>Complete Health Report</h2>
            <p><strong>BMI:</strong> <span style="color:${color};font-weight:bold;">${bmiRounded}</span></p>
            <div class="progress-bar"><div style="width:${Math.min(bmi*3,100)}%;background:${color};"></div></div>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Ideal Weight Range:</strong> ${minWeight} kg – ${maxWeight} kg</p>
            <p><strong>Estimated Body Fat:</strong> ${bodyFat}%</p>
            <hr>
            <p><strong>Maintenance Calories:</strong> ${maintenance} kcal</p>
            <p><strong>Target Calories (${goal}):</strong> ${targetCalories} kcal</p>
            <p><strong>Per Meal (3 meals):</strong> ${perMeal} kcal</p>
            <hr>
            <h4>Macro Breakdown</h4>
            <p>Protein: ${proteinG} g/day</p>
            <p>Carbs: ${carbsG} g/day</p>
            <p>Fats: ${fatG} g/day</p>
            <small class="note">This tool provides general fitness guidance, not medical advice.</small>
        </div>
    `;
}
