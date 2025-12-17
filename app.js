const menu = [
    { id: 1, name: "Crispy Chicken Burger", price: 5.99, image: "Assets/images/FriedChickenBurgers.jpg", description: "A delicious crispy chicken burger with fresh lettuce and cheese." },
    { id: 2, name: "Spicy Chicken Sandwich", price: 6.49, image: "Assets/images/Spicy CB.jpg", description: "A spicy chicken sandwich with a kick, served with pickles and mayo." },
    { id: 3, name: "Grilled Chicken Burger", price: 5.49, image: "Assets/images/grilled.jpg", description: "A juicy grilled chicken burger topped with lettuce, tomato, and mayo." },
    { id: 4, name: "Cajun Chicken Burger", price: 6.99, image: "Assets/images/shrimp.jpg", description: "A flavorful Cajun chicken burger with spicy seasoning and fresh toppings." },
    { id: 5, name: "Vegie Burger", price: 4.99, image: "Assets/images/vegie.jpg", description: "A tasty veggie burger made with a patty blend of fresh vegetables and spices." },

    { id: 6, name: "Cheese Chicken Wrap", price: 6.49, image: "Assets/images/cheeseChickenWrap.jpg", description: "A cheesy chicken wrap with melted cheese, lettuce, and tomato." },
    { id: 7, name: "Chicken Caesar Wrap", price: 5.99, image: "Assets/images/caesarWrap.jpg", description: "A classic chicken Caesar wrap with grilled chicken, romaine lettuce, and Caesar dressing." },
    { id: 8, name: "Grilled Chicken Wrap", price: 5.49, image: "Assets/images/grilledWrap.jpg", description: "A healthy grilled chicken wrap with fresh veggies and a light dressing." },
    { id: 9, name: "Chicken Wrap", price: 4.99, image: "Assets/images/chickenWrap.jpg", description: "A simple chicken wrap with tender chicken, lettuce, and mayo." },
    { id: 10, name: "Crispy Chicken Wrap", price: 6.49, image: "Assets/images/crispyChickenWrap.jpg", description: "A crispy chicken wrap with crunchy chicken tenders and fresh veggies." },

    { id: 11, name: "French Fries", price: 2.99, image: "Assets/images/frenchFries.jpg", description: "Crispy golden french fries, perfect as a side." },
    { id: 12, name: "Onion Rings", price: 3.49, image: "Assets/images/onionRings.jpg", description: "Crunchy onion rings battered to perfection." },
    { id: 13, name: "Coleslaw", price: 2.49, image: "Assets/images/coleslaw.jpg", description: "Fresh and tangy coleslaw made with shredded cabbage and carrots." },

    { id: 14, name: "Iced Milo", price: 2.99, image: "Assets/images/milo.jpg", description: "Refreshing iced Milo drink, perfect for any time of the day." },
    { id: 15, name: "Coke", price: 1.99, image: "Assets/images/coke.jpg", description: "Chilled Coca-Cola to quench your thirst." },
    { id: 16, name: "Sprite", price: 1.99, image: "Assets/images/sprite.jpg", description: "Cool and crisp Sprite, a lemon-lime soda." },
    { id: 17, name: "Coke Zero", price: 1.99, image: "Assets/images/cokezero.jpg", description: "Coke Zero with zero sugar and full flavor." },
    { id: 18, name: "Fanta", price: 1.99, image: "Assets/images/fanta.jpg", description: "Fanta, a fruity and refreshing orange soda." }
]

const pastOrders = []
const newOrder = []
const customerData = []


function displayBurgers(menu) {

    return `
    <div class="card col-2 m-3 p-3">
            <img src="${menu.image}" alt="">
            <header class="text-center font-monospace fw-bold">${menu.name}</header>
            <p class="text-center"> <br>${menu.description}</p>
            <p class="price-tag">$${menu.price}</p>
            <div class="mb-3">
                <input type="button" class="fixed-button btn-min" id="btnMinus" value="-" onclick="removeFromCart(${menu.id},${menu.price})">
                <input type="button" class="fixed-button btn-plus" id="" value="+" onclick="addToCart(${menu.id},'${menu.name}',${menu.price})">
            </div>
            
    </div>
        
        `;
}

function renderFood(containerId, food) {
    const container = document.getElementById(containerId);
    container.innerHTML = food.map(displayBurgers).join('');
}

window.onload = function () {
    renderFood('burger', menu.slice(0, 5));
    renderFood('wraps', menu.slice(5, 10));
    renderFood('sides', menu.slice(10, 13));
    renderFood('beverages', menu.slice(13));
}

function addToCart(id, name, price) {


    let orderId = checkItem(id);

    if (orderId !== -1) {
        newOrder[orderId].Qty += 1;
        newOrder[orderId].Price = newOrder[orderId].Qty * price;
    } else {
        let newItem =
        {
            Id: id,
            Name: name,
            Qty: 1,
            Price: price
        };
        newOrder.push(newItem);
    }

    loadItems();
    addPrices(price);
}

function removeFromCart(id, price) {

    let index = checkItem(id);

    if (index === -1) {
        alert("This item hasn't been added to the bill yet.");
    } else {
        if (newOrder[index].Qty === 1) {
            popItem(index)
            subtractPrices(price)
        } else {
            newOrder[index].Qty -= 1;
            newOrder[index].Price = newOrder[index].Qty * price;
            loadItems();
            subtractPrices(price)
        }
    }
    console.log(newOrder)
}

function addPrices(price) {
    const totalElement = document.getElementById('total');
    const subTotal = document.getElementById('subtotal');
    const tax = document.getElementById('tax');

    const stotal = parseFloat(subTotal.innerHTML) || 0;

    subTotal.innerHTML = `${(stotal + price).toFixed(2)}`;
    tax.innerHTML = `${((stotal + price) * 0.08).toFixed(2)}`


    totalElement.innerHTML = (parseFloat(subTotal.innerHTML) + parseFloat(tax.innerHTML)).toFixed(2);

}

function subtractPrices(price) {
    const totalElement = document.getElementById('total');
    const subTotal = document.getElementById('subtotal');
    const tax = document.getElementById('tax');

    const stotal = parseFloat(subTotal.innerHTML) || 0;

    subTotal.innerHTML = `${(stotal - price).toFixed(2)}`;
    tax.innerHTML = `${((stotal - price) * 0.08).toFixed(2)}`


    totalElement.innerHTML = (parseFloat(subTotal.innerHTML) + parseFloat(tax.innerHTML)).toFixed(2);

}

//  check an item before added to the array newOrder
function checkItem(id) {

    if (newOrder.length == 0) {
        return -1;

    } else {
        for (let i = 0; i < newOrder.length; i++) {
            if (newOrder[i].Id === id) {
                return i;
            }
        }
        return -1;
    }
}

function loadItems() {

    let container = document.getElementById('billItems');
    container.innerText = "";

    newOrder.forEach(element => {
        container.innerHTML += `
            <div class="bill-item ">
                <span class= "bill-item-name col-6">${element.Name}</span>
                <span class= "bill-item-qty col-2">Qty ${element.Qty}</span>
                <span class= "bill-item-price col-4">$${(element.Price).toFixed(2)}</span>
                <button class="btn-remove" onclick="popItem(checkItem(${element.Id}))"><i class="fa-regular fa-circle-xmark"></i></button>
            </div>                    
        `;
    });
}

function popItem(index) {
    subtractPrices(newOrder[index].Price);    
    newOrder.splice(index, 1)
    loadItems();
}

function checkOutModal() {
    const modal = document.getElementById("checkoutModal");
    modal.style.display = "block";

}

function confirmOrder() {

    let modal = document.getElementById("checkoutModal");
    let customerName = document.getElementById("customerName").value;
    let customerContact = document.getElementById("customerTelephone").value;

    if (newOrder.length === 0) {
        alert("No items in the order to confirm.");
        return;
    }

    if (customerName === "" || customerContact === "") {
        alert("Please fill both Input fields.");
        return;
    }

    const orderDetails = {
        order_id: `B${(pastOrders.length + 1).toString().padStart(4, '0')}`,
        items: [...newOrder],
        subtotal: parseFloat(document.getElementById('subtotal').innerHTML),
        tax: parseFloat(document.getElementById('tax').innerHTML),
        total: parseFloat(document.getElementById('total').innerHTML),
        timestamp: new Date().toISOString()
    };

    Swal.fire({
        icon: "success",
        title: "Order Confirmed!!",
        text: "Your order has been successfully placed!",
    });

    pastOrders.push(orderDetails);

    customerData.push({
        name: customerName,
        contact: customerContact,
        order_id: orderDetails.order_id
    });

    // set the input fiels empty after confirming the order
    document.getElementById("customerName").value = "";
    document.getElementById("customerTelephone").value = "";

    modal.style.display = "none";
    clearBill();
}

function clearBill() {
    if (newOrder.length === 0) {
        alert("No items in the bill to clear.");
        return;
    }
    newOrder.length = 0;
    document.querySelector(`.bill-items`).innerHTML = `<div class="empty-bill">No items added yet. Select items from the menu to add them to your bill.
    </div>`;
    document.getElementById('subtotal').innerHTML = "0.00";
    document.getElementById('tax').innerHTML = "0.00";
    document.getElementById('total').innerHTML = "0.00";
}   