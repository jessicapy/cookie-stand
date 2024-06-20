const seattle = {
    name: 'Seattle',
    address: '2901 3rd avenue #300, Seattle',
    openHour: '6am',
    closingHour: '7pm',
    cookiesPerHour: [], //empty array
    maxCustomerPerHour: 50,
    estimate: function () {
        this.cookiesPerHour.push(generateRandomNumber(1, 1000))
    }
}

function generateRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}