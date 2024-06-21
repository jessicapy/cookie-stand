'use strict';

const seattle = {
    locationName: 'Seattle',
    minClientPerHour: 23,
    maxClientPerHour: 65,
    avgCookiesPerSale: 6.3,
    cookiesPerHour: [], //empty array
    /*address: '2901 3rd avenue #300, Seattle',
    openHour: '6am',
    closingHour: '7pm',*/
    cookiesPerHour: [], //empty array
    
    estimate: function () {
        //this.cookiesPerHour.push(generateRandomNumber(1, 1000))
        this.cookiesPerHour=estimateSale(this);
    }
};

const hours=['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', ];
const stores=[seattle,tokyo,dubai,paris,lima];

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function estimateSale(store) {
    const sale=[];
    for(let i=0;i<hours.length;i++){
        const numCustomers=generateRandomNumber(store.minClientPerHour,store.maxClientPerHour);
        const hoursSale=Math.ceil(numCustomers*store.avgCookiesPerSale);
        sale.push(hoursSale);
    }
    return sale;
}

function render(store){
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

    for(leti=0;i<hours.length;i++){
        let total +=store.cookiesPerHour[i];
        const litsItems=document.createElement('li');
        litsItems.textContent=hours[i]+': '+store.cookiesPerHour[i]+' cookies';
        list.appendChild(litsItems);
    }
    const totalItems=document.createElement('il');
    totalItems.textContent='total '+total+ ' cookies';
    list.appendChild(totalItems);
}

function runApplication(){
    for (let i=0;i<stores.length;i++){
        stores[i].estimate();
    }
}

runApplication();


/*function generateRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}*/

