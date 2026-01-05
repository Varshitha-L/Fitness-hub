function calculateHealth() {
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let activity = document.getElementById("activity").value;

    if (!height || !weight || !age) {
        alert("Please fill all fields");
        return;
    }
    let heightM = height / 100;
    let bmi = (weight / (heightM * heightM)).toFixed(2);

    let category = "";
    let diet = "";

    if (bmi < 18.5) {
        category = "Underweight";
        diet = "High-calorie diet with proteins, nuts, milk, rice.";
    } else if (bmi < 25) {
        category = "Normal";
        diet = "Balanced diet with fruits, vegetables, proteins.";
    } else if (bmi < 30) {
        category = "Overweight";
        diet = "Low-carb, high-protein diet with more vegetables.";
    } else {
        category = "Obese";
        diet = "Strict calorie control, low sugar, more fiber foods.";
    }

    // BMR Calculation
    let bmr;
    if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let calories = Math.round(bmr * activity);

    document.getElementById("result").innerHTML = `
        <h3>Results</h3>
        <p><strong>BMI:</strong> ${bmi}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Daily Calories:</strong> ${calories} kcal</p>
        <p><strong>Diet Plan:</strong> ${diet}</p>
        <small>This is general guidance, not medical advice.</small>
    `;
}


