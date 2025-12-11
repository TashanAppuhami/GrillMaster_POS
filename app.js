const menu = [
    { id: 1, name: "Crispy Chicken Burger", price: 5.99, image: "Assets/images/FriedChickenBurgers.jpg", description: "A delicious crispy chicken burger with fresh lettuce and cheese." },
    { id: 2, name: "Spicy Chicken Sandwich", price: 6.49, image: "Assets/images/Spicy CB.jpg", description: "A spicy chicken sandwich with a kick, served with pickles and mayo." },
    { id: 3, name: "Grilled Chicken Burger", price: 5.49, image: "Assets/images/FriedChickenBurgers.jpg", description: "A juicy grilled chicken burger topped with lettuce, tomato, and mayo." },
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


function displayBurgers(menu) {

    return `
    <div class="card col-2 m-3 p-3">
            <img src="${menu.image}" alt="">
            <header class="text-center font-monospace fw-bold">${menu.name}</header>
            <p class="text-center"> <br>${menu.description}</p>
            <p class="price-tag">$${menu.price}</p>
            <div class="mb-3">
                <input type="button" class="fixed-button btn-min" id="" value="-" onclick="removeFromCart(${menu.Id})">
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

function addToCart(id,name,price) {

    console.log("Id : "+id)
    console.log("Name : "+name)
    console.log("Price : "+price)

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

    // document.querySelector('.empty-bill').innerHTML = ``;
    let container = document.getElementById('billItems');

    container.innerText = "";

    newOrder.forEach(element => {
        container.innerHTML += `
        <div class="bill-item details">
            <span class= "bill-item-name">${element.Name}</span>
            <span class= "bill-item-price">$${(element.Price).toFixed(2)}</span>
        </div>
        <div class ="bill-item-qty">
            Qty ${element.Qty}
        </div>
        
    `;

    });

    updateTotal(price);
}

function removeFromCart(id){

}

function updateTotal(price) {
    const totalElement = document.getElementById('total');
    const total = parseFloat(totalElement.innerHTML) || 0;
    totalElement.innerHTML = `${(total + price).toFixed(2)}`;
}

//  check an item before added to the array newOrder
function checkItem(id) {

    if (newOrder.length==0) {
        return -1;

    }else{
        for (let i = 0; i < newOrder.length; i++) {
            if (newOrder[i].Id === id) {
                return i;
            }
        }
        return -1;
    }
}









