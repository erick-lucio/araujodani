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

    const sortedData = percentages.map((percentage, index) => ({ name: temperamentNames[index], percentage }))
    .sort((a, b) => b.percentage - a.percentage);

    const sortedTemperamentNames = sortedData.map(data => data.name);
    const sortedPercentages = sortedData.map(data => data.percentage);

   const ctx = document.getElementById('canvasidresult').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedTemperamentNames,
            datasets: sortedData.map((data, index) => ({
                label: data.name,
                data: [data.percentage],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'][index],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'][index],
                borderWidth: 1,
                barPercentage: 0.5
            }))
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            },
            animation: {
                onComplete: function() {
                    console.log('Animation complete');
                },
                delay: function(context) {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !context.dropped) {
                        delay = context.dataIndex * 300 + context.datasetIndex * 100;
                        context.dropped = true;
                    }
                    return delay;
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}