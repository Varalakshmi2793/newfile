function addTableField() {
    var tableFieldsDiv = document.getElementById('tableFields');
    var label1=document.createElement('label');
    var lab1=document.createTextNode('columnName:');
    label1.appendChild(lab1);
    tableFieldsDiv.appendChild(label1);
    var newInput = document.createElement('input');
     
    newInput.type = 'text';
    newInput.name = 'columnname[]';
    newInput.required = true;
    tableFieldsDiv.appendChild(newInput);
    var label2=document.createElement('label');
    var newInput2=document.createElement('input'); 
    var lab2=document.createTextNode('columntype:');
    label2.appendChild(lab2);
    tableFieldsDiv.appendChild(label2);
    newInput2.type = 'text';
    newInput2.name = 'columntype[]';
    newInput2.required = true;
    tableFieldsDiv.appendChild(newInput2);
    tableFieldsDiv.appendChild(document.createElement('br'));
}
function createTable() {
    console.log("createTable() function called");
    const tableName = document.getElementById("tableName").value;
    const fields = Array.from(document.querySelectorAll(".field"))
        .map(field => {
            const columnName = field.querySelector(".columnName").value;
            const columnType = field.querySelector(".columnType").value;
            return `${columnName} ${columnType}`;
        })
        .join(", ");

    fetch("/create-table", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ tableName, fields })
    })
    .then(response => {
        if (response.ok) {
            alert("Table created successfully");
            window.location.href = "/"; 
        } else {
            alert("Error creating table");
        }
    })
    .catch(error => {
        console.error("Error creating table:", error);
        alert("Error creating table");
    });
}