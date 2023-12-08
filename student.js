document.getElementById("form1").addEventListener("submit", submitFun1);

var studentDataArr = JSON.parse(localStorage.getItem("studentData")) || [];

function submitFun1(e) {
  e.preventDefault();
  var name = document.querySelector("#name").value;
  var number = document.querySelector("#number").value;
  var city = document.querySelector("#city").value;
  var StuNum = document.querySelector("#StuNum").value;

  var studentObj = {
    name: name,
    number: number,
    city: city,
    StuNum: StuNum,
    date: new Date().toISOString() // Add date when creating student object
  };

  studentDataArr.push(studentObj);
  localStorage.setItem("studentData", JSON.stringify(studentDataArr));
  document.querySelector("#form1").reset();
  alert("Student Added Successfully");

  displayFun();
}

function displayFun() {
  document.querySelector("#tbody").innerHTML = "";
  var count = 1;
  studentDataArr.forEach(function(item) {
    var tr = document.createElement("tr");

    var td1 = document.createElement("td");
    td1.innerHTML = count++;
    var td2 = document.createElement("td");
    td2.innerHTML = item.name;
    var td3 = document.createElement("td");
    td3.innerHTML = item.number;
    var td4 = document.createElement("td");
    td4.innerHTML = item.city;
    var td5 = document.createElement("td");
    td5.innerHTML = item.StuNum;
    var td6 = document.createElement("td"); // Attendance cell

    // Adding date display
    var tdDate = document.createElement("td");
    tdDate.innerHTML = new Date(item.date).toLocaleString(); 

    // Create Present button
    var btnPresent = document.createElement("button");
    btnPresent.innerHTML = "P";
    btnPresent.addEventListener("click", function() {
      td6.innerHTML = "<button>Present</button>";
    });

    // Create Absent button
    var btnAbsent = document.createElement("button");
    btnAbsent.innerHTML = "A";
    btnAbsent.addEventListener("click", function() {
      td6.innerHTML = "<button id='absent'>Absent</button>";
    });

    // Create Delete button
    var btnDelete = document.createElement("button");
    btnDelete.innerHTML = "Delete";
    btnDelete.addEventListener("click", function() {
      // Remove student from array and update local storage
      studentDataArr = studentDataArr.filter(function(student) {
        return student.StuNum !== item.StuNum;
      });
      localStorage.setItem("studentData", JSON.stringify(studentDataArr));
      tr.remove(); // Remove the row from the table
    });

    td6.append(btnPresent, btnAbsent, btnDelete);

    // Append new cells to the row
    tr.append(td1, td2, td3, td4, td5, td6, tdDate); // Now includes tdDate

    document.querySelector("#tbody").append(tr);
  });
}

document.querySelector("#removeAll").addEventListener("click", function() {
  localStorage.clear(); // Clear all local storage
  studentDataArr = []; // Reset the student data array
  displayFun(); // Update display
});

displayFun();