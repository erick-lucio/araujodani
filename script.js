document.getElementById('confirmButton').addEventListener('click', function() {
    const checkedItems = [];
    const itemsContainer = document.getElementById('itemsContainer');
    const items = itemsContainer.getElementsByClassName('item');
    let sumArray = [0, 0, 0, 0];
    let checkedCount = 0;

    for (let item of items) {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const hiddenValue = JSON.parse(item.querySelector('input[type="hidden"]').value);
        if (checkbox.checked) {
            checkedCount++;
            sumArray = sumArray.map((val, index) => val + hiddenValue[index]);
        }
    }

    const totalCheckboxes = items.length;
    const minimumRequiredChecked = Math.ceil(totalCheckboxes * 0.25);

    if (checkedCount >= minimumRequiredChecked) {
        alert('Checked items: ' + JSON.stringify(sumArray));
        console.log('Checked items: ', sumArray);
        displayPercentages(sumArray);
    } else {
        alert('You need to check at least 25% of the items.');
    }
});


function displayPercentages(sumArray) {
    const absoluteSumArray = sumArray.map(num => num < 0 ? 0 : num);
    const totalSum = absoluteSumArray.reduce((acc, val) => acc + val, 0);
    const percentages = absoluteSumArray.map(value => (value / totalSum * 100).toFixed(2));
    const temperamentNames = ['Colérico', 'Sanguíneo', 'Fleumático', 'Melancólico'];

    let resultMessage = 'Temperament Percentages:\n';
    percentages.forEach((percentage, index) => {
        resultMessage += `${temperamentNames[index]}: ${percentage}%\n`;
    });

    alert(resultMessage);
    console.log(resultMessage);
}