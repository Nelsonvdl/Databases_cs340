/*
Functionality for site
In the end the add and delete rows will call SQL queries to the database
*/

//icons
var iconsPlus = document.createElement('i');
iconsPlus.setAttribute("class", "fas fa-plus");


//var iconsMinus = document.createElement('i');
//iconsMinus.setAttribute("class", "fas fa-minus");


//var iconsChart = document.createElement('i');
//iconsChart.setAttribute("class", "fa fa-table");

function deleteRow(btn){
    btn.closest('tr').remove();
    //put query in future
}

function addRowStar () {

    var myTable = document.getElementById('starTable');
    var name = document.getElementsByClassName('starName')
    var type = document.getElementsByClassName('starType')
    var temp = document.getElementsByClassName('starTemp')
    var starHSFK =document.getElementsByClassName('starHSFK')

    var iconsMinus = document.createElement('i');
    iconsMinus.setAttribute("class", "fas fa-minus");
    var iconsChart = document.createElement('i');
    iconsChart.setAttribute("class", "fa fa-table");

    //adding to table
    var currentIndex = myTable.rows.length;
    var currentRow = myTable.insertRow(-1);

    var td1 = document.createElement('td');
    var td1Text = document.createTextNode("testID" + currentIndex);
    td1.appendChild(td1Text);

    var td2 = document.createElement('td');
    var td2Text = document.createTextNode(name[0].value);
    td2.appendChild(td2Text);

    var td3 = document.createElement('td');
    var td3Text = document.createTextNode(type[0].value);
    td3.appendChild(td3Text);

    var td4 = document.createElement('td');
    var td4Text = document.createTextNode(temp[0].value);
    td4.appendChild(td4Text);

    var td5 = document.createElement('td');
    var td5Text = document.createTextNode(starHSFK[0].value);
    td5.appendChild(td5Text);

    var td6 = document.createElement('td');
    var td6Button= document.createElement('button');
    td6Button.setAttribute('type', "button");
    td6Button.setAttribute('id', "delete-item-button");
    td6Button.setAttribute('onclick', "deleteRow(this);");

    td6Button.appendChild(iconsMinus)
    td6Button.appendChild(iconsChart)
    td6.appendChild(td6Button);

    currentRow.appendChild(td1)
    currentRow.appendChild(td2);
    currentRow.appendChild(td3);
    currentRow.appendChild(td4);
    currentRow.appendChild(td5);
    currentRow.appendChild(td6);

    //clearing values
    name[0].value = '';
    type[0].value = '';
    type[0].value = '';
    temp[0].value = '';
    starHSFK[0].value = '';
    
}

function addRowGal () {
    var myTable = document.getElementById('galTable');
    var name = document.getElementsByClassName('galName')

    var iconsMinus = document.createElement('i');
    iconsMinus.setAttribute("class", "fas fa-minus");
    var iconsChart = document.createElement('i');
    iconsChart.setAttribute("class", "fa fa-table");

    //adding to table
    var currentIndex = myTable.rows.length;
    var currentRow = myTable.insertRow(-1);

    var td1 = document.createElement('td');
    var td1Text = document.createTextNode("testID" + currentIndex);
    td1.appendChild(td1Text);

    var td2 = document.createElement('td');
    var td2Text = document.createTextNode(name[0].value);
    td2.appendChild(td2Text);

    var td6 = document.createElement('td');
    var td6Button= document.createElement('button');
    td6Button.setAttribute('type', "button");
    td6Button.setAttribute('id', "delete-item-button");
    td6Button.setAttribute('onclick', "deleteRow(this);");

    td6Button.appendChild(iconsMinus)
    td6Button.appendChild(iconsChart)
    td6.appendChild(td6Button);

    currentRow.appendChild(td1)
    currentRow.appendChild(td2);
    currentRow.appendChild(td6);

    //clearing values
    name[0].value = '';
}

function addRowEPS (argument) {
    var myTable = document.getElementById('EPSTable');
    var starFK = document.getElementsByClassName('starFK')
    var planetFK = document.getElementsByClassName('planetFK')

    var iconsMinus = document.createElement('i');
    iconsMinus.setAttribute("class", "fas fa-minus");
    var iconsChart = document.createElement('i');
    iconsChart.setAttribute("class", "fa fa-table");

    //adding to table
    var currentIndex = myTable.rows.length;
    var currentRow = myTable.insertRow(-1);

    var td1 = document.createElement('td');
    var td1Text = document.createTextNode(starFK[0].value);
    td1.appendChild(td1Text);

    var td2 = document.createElement('td');
    var td2Text = document.createTextNode(planetFK[0].value);
    td2.appendChild(td2Text);

    var td6 = document.createElement('td');
    var td6Button= document.createElement('button');
    td6Button.setAttribute('type', "button");
    td6Button.setAttribute('id', "delete-item-button");
    td6Button.setAttribute('onclick', "deleteRow(this);");

    td6Button.appendChild(iconsMinus)
    td6Button.appendChild(iconsChart)
    td6.appendChild(td6Button);

    currentRow.appendChild(td1)
    currentRow.appendChild(td2);
    currentRow.appendChild(td6);

    //clearing values
    starFK[0].value = '';
    planetFK[0].value = '';

}

function addRowHS (argument) {
    var myTable = document.getElementById('HSTable');
    var name = document.getElementsByClassName('HSname')
    var starFK = document.getElementsByClassName('starFK')
    var galFK = document.getElementsByClassName('galFK')

    var iconsMinus = document.createElement('i');
    iconsMinus.setAttribute("class", "fas fa-minus");
    var iconsChart = document.createElement('i');
    iconsChart.setAttribute("class", "fa fa-table");

    //adding to table
    var currentIndex = myTable.rows.length;
    var currentRow = myTable.insertRow(-1);

    var td1 = document.createElement('td');
    var td1Text = document.createTextNode("testID" + currentIndex);
    td1.appendChild(td1Text);

    var td2 = document.createElement('td');
    var td2Text = document.createTextNode(name[0].value);
    td2.appendChild(td2Text);

    var td3 = document.createElement('td');
    var td3Text = document.createTextNode(starFK[0].value);
    td3.appendChild(td3Text);

    var td4 = document.createElement('td');
    var td4Text = document.createTextNode(galFK[0].value);
    td4.appendChild(td4Text);

    var td6 = document.createElement('td');
    var td6Button= document.createElement('button');
    td6Button.setAttribute('type', "button");
    td6Button.setAttribute('id', "delete-item-button");
    td6Button.setAttribute('onclick', "deleteRow(this);");

    td6Button.appendChild(iconsMinus)
    td6Button.appendChild(iconsChart)
    td6.appendChild(td6Button);

    currentRow.appendChild(td1)
    currentRow.appendChild(td2);
    currentRow.appendChild(td3);
    currentRow.appendChild(td4);
    currentRow.appendChild(td6);

    //clearing values
    name[0].value = '';
    starFK[0].value = '';
    galFK[0].value = '';
}

function addRowPlanet (argument) {
    var myTable = document.getElementById('planetTable');
    var name = document.getElementsByClassName('planetName')
    var HSFK = document.getElementsByClassName('HSFK')
    var numStars = document.getElementsByClassName('numStars')
    var mass =document.getElementsByClassName('mass')
    var orbitalPeriod =document.getElementsByClassName('orbitalPeriod')
    var discovery = document.getElementsByClassName('discovery')
    var radius = document.getElementsByClassName('radius')

    var iconsMinus = document.createElement('i');
    iconsMinus.setAttribute("class", "fas fa-minus");
    var iconsChart = document.createElement('i');
    iconsChart.setAttribute("class", "fa fa-table");

    //adding to table
    var currentIndex = myTable.rows.length;
    var currentRow = myTable.insertRow(-1);

    var td1 = document.createElement('td');
    var td1Text = document.createTextNode("testID" + currentIndex);
    td1.appendChild(td1Text);

    var td2 = document.createElement('td');
    var td2Text = document.createTextNode(name[0].value);
    td2.appendChild(td2Text);

    var td3 = document.createElement('td');
    var td3Text = document.createTextNode(HSFK[0].value);
    td3.appendChild(td3Text);

    var td4 = document.createElement('td');
    var td4Text = document.createTextNode(numStars[0].value);
    td4.appendChild(td4Text);

    var td5 = document.createElement('td');
    var td5Text = document.createTextNode(mass[0].value);
    td5.appendChild(td5Text);

    var td7 = document.createElement('td');
    var td7Text = document.createTextNode(orbitalPeriod[0].value);
    td7.appendChild(td7Text);

    var td8 = document.createElement('td');
    var td8Text = document.createTextNode(discovery[0].value);
    td8.appendChild(td8Text);

    var td9 = document.createElement('td');
    var td9Text = document.createTextNode(radius[0].value);
    td9.appendChild(td9Text);

    var td6 = document.createElement('td');
    var td6Button= document.createElement('button');
    td6Button.setAttribute('type', "button");
    td6Button.setAttribute('id', "delete-item-button");
    td6Button.setAttribute('onclick', "deleteRow(this);");

    td6Button.appendChild(iconsMinus)
    td6Button.appendChild(iconsChart)
    td6.appendChild(td6Button);

    currentRow.appendChild(td1)
    currentRow.appendChild(td2);
    currentRow.appendChild(td3);
    currentRow.appendChild(td4);
    currentRow.appendChild(td5);
    currentRow.appendChild(td7);
    currentRow.appendChild(td8);
    currentRow.appendChild(td9);
    currentRow.appendChild(td6);

    //clearing values
    name[0].value = '';
    HSFK[0].value = '';
    numStars[0].value = '';
    mass[0].value = '';
    orbitalPeriod[0].value = '';
    discovery[0].value = '';
    radius[0].value = '';
    
}
    


