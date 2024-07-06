'use strict';

const seattle = {
    locationName: 'Seattle',
    minClientPerHour: 23,
    maxClientPerHour: 65,
    avgCookiesPerSale: 6.3,
    cookiesPerHour: [], //empty array
    
    estimate: function () {
        //this.cookiesPerHour.push(generateRandomNumber(1, 1000))
        //estimate es un metodo que calcula las ventas de esta tienda. 
        this.cookiesPerHour=estimateSale(this); 
        //this hace referencia la objeto donde estas. En este caso Seattle
    }
};

const tokyo = {
    locationName: 'Tokyo',
    minClientPerHour: 3,
    maxClientPerHour: 24,
    avgCookiesPerSale: 1.2,
    cookiesPerHour: [], //empty array
    
    estimate: function () {
        //this.cookiesPerHour.push(generateRandomNumber(1, 1000))
        this.cookiesPerHour=estimateSale(this);
    }
};

const dubai = {
    locationName: 'Dubai',
    minClientPerHour: 11,
    maxClientPerHour: 38,
    avgCookiesPerSale: 3.7,
    cookiesPerHour: [], //empty array
    
    estimate: function () {
        //this.cookiesPerHour.push(generateRandomNumber(1, 1000))
        this.cookiesPerHour=estimateSale(this);
    }
};

const paris = {
    locationName: 'Paris',
    minClientPerHour: 20,
    maxClientPerHour: 38,
    avgCookiesPerSale: 2.3,
    cookiesPerHour: [], //empty array
    
    estimate: function () {
        //this.cookiesPerHour.push(generateRandomNumber(1, 1000))
        this.cookiesPerHour=estimateSale(this);
    }
};

const lima = {
    locationName: 'Lima',
    minClientPerHour: 20,
    maxClientPerHour: 38,
    avgCookiesPerSale: 2.3,
    cookiesPerHour: [], //empty array
    
    estimate: function () {
        //this.cookiesPerHour.push(generateRandomNumber(1, 1000))
        this.cookiesPerHour=estimateSale(this);
    }
};

const hours=['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', ];
const stores=[seattle,tokyo,dubai,paris,lima];

function generateRandomNumber(min, max) {
    return Math.floor(Math.random()*(max-min))+min;
}


function estimateSale(store) { //store representa una de las tiendas
    const sale=[];
    for(let i=0;i<hours.length;i++){
        const numCustomers=generateRandomNumber(store.minClientPerHour,store.maxClientPerHour);
        const hoursSale=Math.ceil(numCustomers*store.avgCookiesPerSale);
        sale.push(hoursSale);
    }
    return sale;
}

function render(store){  //muestra la lista de cada tienda
    let total=0;
    const root=document.getElementById('root');
    const location=document.createElement('section');
    location.classList.add('location');
    root.appendChild(location);
    const tittle=document.createElement('h2');
    tittle.textContent=store.locationName;
    location.appendChild(tittle);
    const list=document.createElement('ul');
    location.appendChild(list);

    for(let i=0;i<hours.length;i++){
        total += store.cookiesPerHour[i]; //Total va a calcular el total de galletas vendidas de 6am a 7pm
        const litsItems=document.createElement('li');
        litsItems.textContent=hours[i]+': '+store.cookiesPerHour[i]+' cookies';
        list.appendChild(litsItems); //indica donde va a localizarse los elementos creados. Ex: listsItems
    }
    const totalItems=document.createElement('li');
    totalItems.textContent='total '+total+ ' cookies';
    list.appendChild(totalItems);
}

function runApplication(){ //esta funcion es la que une todas las funciones de arriba
    for (let i=0;i<stores.length;i++){
        stores[i].estimate();
        render(stores[i]);
    }
}

runApplication(); // esto ejecuta la funcion runApplication


//cookiesPerHour: [], //empty array
    /*address: '2901 3rd avenue #300, Seattle',
    openHour: '6am',
    closingHour: '7pm',*/
/*function generateRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}*/

