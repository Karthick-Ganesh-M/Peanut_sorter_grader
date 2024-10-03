document.addEventListener('DOMContentLoaded', function() {
    const shiftData = [
        {
            shift: 'Shift 1',
            rows: [
                { id: 1, inQuantity: 100, outcomes: 98, wastage: 2 },
                { id: 2, inQuantity: 120, outcomes: 112, wastage: 8 },
                { id: 3, inQuantity: 140, outcomes: 135, wastage: 5 },
                { id: 4, inQuantity: 90, outcomes: 84, wastage:6 }
            ]
        },
        {
            shift: 'Shift 2',
            rows: [
                { id: 1, inQuantity: 120, outcomes: 115, wastage: 5 },
                { id: 2, inQuantity: 130, outcomes: 122, wastage: 8 },
                { id: 3, inQuantity: 145, outcomes: 141, wastage: 4 },
                { id: 4, inQuantity: 100, outcomes: 95, wastage: 5 }
            ]
        },
        {
            shift: 'Shift 3',
            rows: [
                { id: 1, inQuantity: 90, outcomes: 85, wastage: 5 },
                { id: 2, inQuantity: 100, outcomes: 92, wastage: 8 },
                { id: 3, inQuantity: 130, outcomes: 126, wastage: 4 },
                { id: 4, inQuantity: 145, outcomes: 139, wastage: 6 },
            ]
        }
    ];

    const shiftSelect = document.querySelector('#shiftSelect');

    function updateDataForSelectedShift() {
        const selectedShiftIndex = shiftSelect.value - 1;
        const selectedShift = shiftData[selectedShiftIndex];

        if (selectedShift) {
            updateTable(selectedShift.rows);
            updateSummary(selectedShift.rows);
            updateBarChart(selectedShift.rows);
            updateLineCharts(selectedShift.rows);
        } else {
            console.error('Shift data not found for selected shift index:', selectedShiftIndex);
        }
    }

    shiftSelect.addEventListener('change', updateDataForSelectedShift);

    function updateTable(rows) {
        const shiftTableBody = document.querySelector('#shiftTable tbody');
        shiftTableBody.innerHTML = '';

        rows.forEach(row => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${row.id}</td>
                <td>${row.inQuantity}</td>
                <td>${row.outcomes}</td>
                <td>${row.wastage}</td>
            `;
            shiftTableBody.appendChild(newRow);
        });
    }

    function updateSummary(rows) {
        const totalInQuantity = rows.reduce((total, row) => total + row.inQuantity, 0);
        const totalOutcomes = rows.reduce((total, row) => total + row.outcomes, 0);
        const totalWastage = rows.reduce((total, row) => total + row.wastage, 0);

        const summaryContent = document.querySelector('#summaryContent');
        summaryContent.innerHTML = `
            <p><strong>Total In Quantity:</strong> ${totalInQuantity} KG</p>
            <p><strong>Total Wastage:</strong> ${totalWastage} KG</p>
            <p><strong>Total Outcomes:</strong> ${totalOutcomes} KG</p>
            <p><strong>Market Price :</strong> Rs.180 per KG</p>
            <p><strong>Predicted Oil :</strong> 350-450ml per KG</p>
        `;
    }

    function updateBarChart(rows) {
        const labels = rows.map(row => `Row ${row.id}`);
        const inQuantities = rows.map(row => row.inQuantity);
        const outcomes = rows.map(row => row.outcomes);
        const wastages = rows.map(row => row.wastage);

        const ctx = document.getElementById('barChart').getContext('2d');

        if (window.myBarChart) {
            window.myBarChart.destroy();
        }

        window.myBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'In Quantity',
                        data: inQuantities,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)' // Blue
                    },
                    {
                        label: 'Outcomes',
                        data: outcomes,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)' // Green
                    },
                    {
                        label: 'Wastage',
                        data: wastages,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)' // Red
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function updateLineCharts(rows) {
        const labels = rows.map(row => `Row ${row.id}`);
        const outcomes = rows.map(row => row.outcomes);
        const inQuantities = rows.map(row => row.inQuantity);
        const wastages = rows.map(row => row.wastage);

        const ctx = document.getElementById('lineChart').getContext('2d');

        if (window.myLineChart) {
            window.myLineChart.destroy();
        }

        window.myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Outcomes',
                        data: outcomes,
                        borderColor: 'rgba(255, 206, 86, 1)', // Yellow
                        backgroundColor: 'rgba(255, 206, 86, 0.2)'
                        // Red with opacity
                    },
                    {
                        label: 'In Quantity',                       
                        data: inQuantities,
                        borderColor: 'rgba(54, 162, 235, 1)', // Blue
                        backgroundColor: 'rgba(54, 162, 235, 0.2)' // Blue with opacity
                    },
                    {
                        label: 'Wastage',
                        data: wastages, // Yellow with opacity
                        borderColor: 'rgba(255, 99, 132, 1)', // Red
                        backgroundColor: 'rgba(255, 99, 132, 0.2)' 
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    updateDataForSelectedShift(); // Initial update for default selected shift (Shift 1)
});

function toggleLogoutMenu() {
    const logoutMenu = document.getElementById('logoutMenu');
    logoutMenu.style.display = (logoutMenu.style.display === 'block') ? 'none' : 'block';
}

document.addEventListener('click', function(event) {
    const userIcon = document.querySelector('.user-profile');
    const logoutMenu = document.getElementById('logoutMenu');
    
    if (!userIcon.contains(event.target) && logoutMenu.style.display === 'block') {
        logoutMenu.style.display = 'none';
    }
});

function toggleNavMenu() {
    var navMenu = document.getElementById("navMenu");
    navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
}
