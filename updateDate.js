// This script involves a workaround to store dates separately without modifying the original student.js

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("form1");
  form.addEventListener("submit", function() {
    // Use a timeout to allow the student data to be first added by student.js
    setTimeout(function() {
      const students = JSON.parse(localStorage.getItem('studentData')) || [];
      const lastStudentAdded = students[students.length - 1];

      if (lastStudentAdded) {
        // Generate the current timestamp
        const timestamp = new Date().toLocaleString();

        // Assuming the lastStudentAdded doesn't already have a date property,
        // we add the timestamp separately in localStorage.
        const dateData = JSON.parse(localStorage.getItem('studentDateData')) || [];
        dateData.push(timestamp);
        localStorage.setItem('studentDateData', JSON.stringify(dateData));

        // Find the last row and update the date cell
        const lastRow = document.querySelector("#tbody tr:last-child");
        const dateCellIndex = 6;
        if (lastRow) {
          if (lastRow.cells.length < dateCellIndex + 1) {
            lastRow.insertCell(dateCellIndex);
          }
          lastRow.cells[dateCellIndex].textContent = timestamp;
        }
      }
    }, 0);
  });
});
