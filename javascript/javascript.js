// 0, 1, 0, 0, 0, 1, 15, 100, 1100, 12000, 500

var amount = 0;
var clickValue = 0;
var autoclickers = 0;
var workers = 0;
var restaurants = 0;
var factories = 0;
var production = 0;
var clickPrice = 0;
var autoclickerPrice = 0;
var workerPrice = 0;
var restaurantPrice = 0;
var factoryPrice = 0;
var productionPrice = 0;
var auto = 0;

var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : null,
    database : 'windows_app'
});

let getData = "SELECT * FROM stats"

connection.query(getData, (error, results, fields) => {
    if (error){
        return console.error(error.message);
    }
    results.forEach(function(data){
        amount += parseInt(data.sushis);
        clickValue += parseInt(data.click);
        autoclickers += parseInt(data.autoclickers)
        workers += parseInt(data.workers);
        restaurants += parseInt(data.restaurants);
        factories += parseInt(data.factories);
        production += parseInt(data.production);
        clickPrice += parseInt(data.clickPrice);
        autoclickerPrice += parseInt(data.autoclickerPrice);
        workerPrice += parseInt(data.workerPrice);
        restaurantPrice += parseInt(data.restaurantPrice);
        factoryPrice += parseInt(data.factoryPrice);
        productionPrice += parseInt(data.productionPrice);

        updateText();
    });
});


var sushi = document.getElementById('sushi');
var sushi2 = document.getElementById('sushi-2');
sushi.addEventListener('click', function(){ 
    click(); 
}); 
sushi2.addEventListener('click', function(){ 
    click(); 
}); 
function click(){
    sushi.classList.remove('make-bigger');
    sushi2.classList.remove('make-bigger');

    void sushi.offsetWidth;
    void sushi2.offsetWidth;

    sushi.classList.add('make-bigger');
    sushi2.classList.add('make-bigger');

    amount += clickValue;
    document.getElementById('clicks').innerHTML = amount.toFixed(0);
}
document.getElementsByClassName('btn-shop')[0].addEventListener('click', function(){
    if (amount >= clickPrice) {
        amount -= clickPrice;
        clickValue++;
        clickPrice = 100 * 1.15**clickValue;
        clickPrice = clickPrice.toFixed(0);
        updateText();
    }
});
document.getElementsByClassName('btn-shop')[1].addEventListener('click', function(){
    if (amount >= autoclickerPrice) {
        amount -= autoclickerPrice;
        autoclickers++;
        autoclickerPrice = 15 * 1.15**autoclickers;
        autoclickerPrice = autoclickerPrice.toFixed(0);
        updateText();
    }
});
document.getElementsByClassName('btn-shop')[2].addEventListener('click', function(){ 
    if (amount >= workerPrice) {
        amount -= workerPrice;
        workers++;
        workerPrice = 100 * 1.15**workers;
        workerPrice = workerPrice.toFixed(0);
        updateText();
    }
});
document.getElementsByClassName('btn-shop')[3].addEventListener('click', function(){ 
    if (amount >= restaurantPrice) {
        amount -= restaurantPrice;
        restaurants++;;
        restaurantPrice = 1100 * 1.15**restaurants;
        restaurantPrice = restaurantPrice.toFixed(0);
        updateText();
    }

});
document.getElementsByClassName('btn-shop')[4].addEventListener('click', function(){
    if (amount >= factoryPrice) {
        amount -= factoryPrice;
        factories++;
        factoryPrice = 12000 * 1.15**factories;
        factoryPrice = factoryPrice.toFixed(0);
        updateText();
    }
});
document.getElementsByClassName('btn-shop')[5].addEventListener('click', function(){ 
    if (amount >= productionPrice) {
        amount -= productionPrice;
        productionPrice *= 12.48;
        productionPrice = productionPrice.toFixed(0);
        production++;
        updateText();
    }
});

var perSec;

function startAuto() {
    auto = (autoclickers * 0.010 + workers * 0.10 + restaurants * 0.80 + factories * 4.70) * production;
    amount += auto;

    document.getElementById('clicks').innerHTML = amount.toFixed(0);
    perSec = auto * 10;
    document.getElementById('sPerSec').innerHTML = "SpS: " + perSec.toFixed(1);
    autoSave();

    setTimeout(startAuto, 100);
}

function updateText() {
    document.getElementById('clicks').innerHTML = amount.toFixed(0);
    document.getElementsByClassName('statistics')[0].innerHTML = "Click Value: " + clickValue;
    document.getElementsByClassName('statistics')[1].innerHTML = "Auto Clickers: " + autoclickers;
    document.getElementsByClassName('statistics')[2].innerHTML = "Workers: " + workers;
    document.getElementsByClassName('statistics')[3].innerHTML = "Restaurants: " + restaurants;
    document.getElementsByClassName('statistics')[4].innerHTML = "Factories: " + factories;
    document.getElementsByClassName('statistics')[5].innerHTML = "Production: " + production + "x";
    document.getElementsByClassName('btn-shop')[0].innerHTML = "Click Value" + "<br>" + "Price: " + clickPrice;
    document.getElementsByClassName('btn-shop')[1].innerHTML = "Auto Clicker" + "<br>" + "Price: " + autoclickerPrice;
    document.getElementsByClassName('btn-shop')[2].innerHTML = "Worker" + "<br>" + "Price: " + workerPrice;
    document.getElementsByClassName('btn-shop')[3].innerHTML = "Restaurant" + "<br>" + "Price: " + restaurantPrice;
    document.getElementsByClassName('btn-shop')[4].innerHTML = "Factory" + "<br>" + "Price: " + factoryPrice;
    document.getElementsByClassName('btn-shop')[5].innerHTML = "Production" + "<br>" + "Price: " + productionPrice;
}

document.getElementById('save-btn').addEventListener('click', function() {
    autoSave();
});
document.getElementById('reset-btn').addEventListener('click', function() {
    
    let sql = `UPDATE stats
    SET 
    sushis = ?,
    click = ?,
    autoclickers = ?,
    workers = ?,
    restaurants = ?,
    factories = ?,
    production = ?,
    clickPrice = ?,
    autoclickerPrice = ?,
    workerPrice = ?,
    restaurantPrice = ?,
    factoryPrice = ?,
    productionPrice = ?
    WHERE id = 1`;
    let data = [0, 1, 0, 0, 0, 0, 1, 100, 15, 100, 1100, 12000, 500];


    // execute the UPDATE statement
    connection.query(sql, data, (error, results, fields) => {
        if (error){
            return console.error(error.message);
        }
    });

    window.location.reload();
});

function autoSave(){

    let sql = `UPDATE stats
    SET 
    sushis = ?,
    click = ?,
    autoclickers = ?,
    workers = ?,
    restaurants = ?,
    factories = ?,
    production = ?,
    clickPrice = ?,
    autoclickerPrice = ?,
    workerPrice = ?,
    restaurantPrice = ?,
    factoryPrice = ?,
    productionPrice = ?
    WHERE id = 1`;
    let data = [amount, clickValue, autoclickers, workers, restaurants, factories, production, clickPrice, autoclickerPrice, workerPrice, restaurantPrice, factoryPrice, productionPrice];


    // execute the UPDATE statement
    connection.query(sql, data, (error, results, fields) => {
        if (error){
            return console.error(error.message);
        }
    });
};

function init() { 
    document.getElementById("close-btn").addEventListener("click", function (e) {
        autoSave();
        window.close();
    }); 
}; 

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        init(); 
    }
};

var toggle = false;

document.getElementById('switch-sushi').addEventListener('click', function() {
    if (toggle == false) {
        sushi.style.display = 'none';
        sushi2.style.display = 'block';
    }
    else{
        sushi2.style.display = 'none';
        sushi.style.display = 'block';
    }
    toggle = !toggle;
});

var toggleAC = false;
var tid;

function timer(t) {
    document.getElementById('sushi').click();

    tid = setTimeout(timer, t);
}

document.onkeydown = function (e) {
    if (e.keyCode == 119) {
        toggleAC = !toggleAC;

        console.log(toggleAC);

        if (toggleAC == true) {
            timer(1);
        }
        else{
            clearTimeout(tid);
            tid = 0;
        }
    }
};
