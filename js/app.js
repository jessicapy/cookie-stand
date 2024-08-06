'use strict';


const hours=['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];
function Location(locationName,
  minClientPerHour,
  maxClientPerHour,
  agvCookiePerSale,
  cookieEachHour,
  address,
  contactinfo,
  hoursopen
) {
  this.locationName = locationName;
  this.minClientPerHour = minClientPerHour;
  this.maxClientPerHour = maxClientPerHour;
  this.agvCookiePerSale = agvCookiePerSale;
  this.cookieEachHour = cookieEachHour;
  this.address = address;
  this.contactinfo = contactinfo;
  this.hoursopen = hoursopen;
}

Location.prototype.estimate = function () {
  this.cookieEachHour = estimateSale(this);
};

const seattle = new Location('Seattle', 23, 65, 6.3, [], '2901 3rd avenue #300, Seattle, WA 98121', '123-456-789', '6am - 7 pm');
const tokyo = new Location('Tokyo', 3, 24, 1.2, [], '1 Chome 1-2 Oshiage, Sumida City, Tokyo 131-8634', '222-222-2222', '6am - 7pm');
const dubai = new Location('Dubai', 11, 38, 3.7, [], '1 Sheikh Mohammed bin Rashid Blvd - Dubai', '333-333-3333', '6am - 7 pm');
const paris = new Location('Paris', 20, 38, 2.3, [], 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris', '444-444-4444', '6am - 7 pm');
const lima = new Location('Lima', 2, 16, 4.6, [], 'Ca.Gral. Borgoño cuadra 8, Miraflores 15074', '555-555-5555', '6am - 7 pm');

const stores=[seattle,tokyo,dubai,paris, lima];

function random(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}

function estimateSale(store){
  const sale=[];
  for(let i=0;i<hours.length;i++){
    const numCustomers=random(store.minClientPerHour,store.maxClientPerHour);
    const hoursSale=Math.ceil(numCustomers*store.agvCookiePerSale);
    sale.push(hoursSale);
  }
  return sale;
}

seattle.estimate();
tokyo.estimate();
dubai.estimate();
paris.estimate();
lima.estimate();


function render(store){
  const tr = document.createElement('tr');
  const tdName =document.createElement('td');
  tdName.textContent = store.locationName;
  tr.appendChild(tdName);
  let total=0;
  for(let i=0;i<hours.length;i++){
    const td = document.createElement('td');
    td.textContent = store.cookieEachHour[i];
    tr.appendChild(td);
    total += store.cookieEachHour[i];
  }
  const td = document.createElement('td');
  td.textContent = total;
  tr.appendChild(td);
  return tr;
}

function renderIndex(store){

  const fill=document.getElementById('fill');
  const location=document.createElement('section');
  location.classList.add('location');
  fill.appendChild(location);
  const title=document.createElement('h2');
  title.textContent=store.locationName;
  location.appendChild(title);
  const workInfo=document.createElement('p');
  workInfo.textContent= `Hours Open: ${store.hoursopen}`;
  location.appendChild(workInfo);
  const telfInfo=document.createElement('p');
  telfInfo.textContent= `Contact Info: ${store.contactinfo}`;
  location.appendChild(telfInfo);
  const addressInfo=document.createElement('p');
  addressInfo.textContent= `Location: ${store.address}`;
  location.appendChild(addressInfo);

}

function runSales(){
  const root =document.getElementById('root');
  const table = document.createElement('table');
  const trHeader = document.createElement('tr');
  const thName =document.createElement('th');
  thName.textContent = 'Locations';
  trHeader.appendChild(thName);
  for(let i=0;i<hours.length;i++){
    const th = document.createElement('th');
    th.textContent = hours[i];
    trHeader.appendChild(th);
  }
  const thTotal = document.createElement('th');
  thTotal.textContent = 'Location Totals';
  trHeader.appendChild(thTotal);
  table.appendChild(trHeader);
  for(let i =0;i< stores.length;i++){
    stores[i].estimate();
    const tr = render(stores[i]);
    table.appendChild(tr);
  }
  const tfoot = document.createElement('tfoot');
  tfoot.id = 'resumen';
  table.appendChild(tfoot);
  if (root) {
    root.appendChild(table);
  }
  renderTotales();
  
}
runSales();

function renderTotales() {
  const tfoot = document.getElementById('resumen');
  const row = document.createElement('tr');
  const nameCell = document.createElement('th');
  nameCell.textContent = 'Hourly Totals for All Locations';
  row.appendChild(nameCell);

  let totalDailyCookies = 0;
  const totalesHora = new Array(hours.length).fill(0);

  for (let i = 0; i < stores.length; i++) {
    const store = stores[i];
    for (let j = 0; j < hours.length; j++) {
      totalesHora[j] += store.cookieEachHour[j];
      totalDailyCookies += store.cookieEachHour[j];
    }
  }

  for (let i = 0; i < totalesHora.length; i++) {
    const cell = document.createElement('td');
    cell.textContent = totalesHora[i];
    row.appendChild(cell);
  }

  const totalDailyCell = document.createElement('td');
  totalDailyCell.textContent = totalDailyCookies;
  row.appendChild(totalDailyCell);

  tfoot.appendChild(row);
}

function run(){
  for(let i =0;i< stores.length; i++){
    stores[i].estimate();
    renderIndex(stores[i]);
  }
}


function deleteTable(){
  const salesTable = document.getElementById("root");
  salesTable.textContent = "";
}

const newStoreForm = document.getElementById('newStore');

newStoreForm.addEventListener('submit',
    function (event){
        event.preventDefault();
        const locationName = event.target.locationName.value;
        const minCustomersPerHour = parseInt(event.target.minCustomersPerHour.value);
        const maxCustomersPerHour = parseInt(event.target.maxCustomersPerHour.value);
        const avgCookiesPerSale = parseInt(event.target.avgCookiesPerSale.value);

        const newLocation = new Location(locationName, '', '', '', [], minCustomersPerHour, maxCustomersPerHour, avgCookiesPerSale)
        newLocation.estimate(this);
        stores.push(newLocation);
        deleteTable();
        runSales();
    }
);