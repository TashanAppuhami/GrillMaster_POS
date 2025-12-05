const menu = [
    { name: "Crispy Chicken Burger", price: 5.99, image: "Assets/images/FriedChickenBurgers.jpg", description: "A delicious crispy chicken burger with fresh lettuce and cheese." },
    { name: "Spicy Chicken Sandwich", price: 6.49, image: "Assets/images/Spicy CB.jpg", description: "A spicy chicken sandwich with a kick, served with pickles and mayo." },
    { name: "Grilled Chicken Burger", price: 5.49, image: "Assets/images/FriedChickenBurgers.jpg", description: "A juicy grilled chicken burger topped with lettuce, tomato, and mayo." },
    { name: "Cajun Chicken Burger", price: 6.99, image: "Assets/images/shrimp.jpg", description: "A flavorful Cajun chicken burger with spicy seasoning and fresh toppings." },
    { name: "Vegie Burger", price: 4.99, image: "Assets/images/vegie.jpg", description: "A tasty veggie burger made with a patty blend of fresh vegetables and spices." },
    
    { name: "Chicken Caesar Wrap", price: 5.99, image: "Assets/images/caesarWrap.jpg", description: "A classic chicken Caesar wrap with grilled chicken, romaine lettuce, and Caesar dressing." },
    { name: "Grilled Chicken Wrap", price: 5.49, image: "Assets/images/grilledWrap.jpg", description: "A healthy grilled chicken wrap with fresh veggies and a light dressing." },
    { name: "Chicken Wrap", price: 4.99, image: "Assets/images/chickenWrap.jpg", description: "A simple chicken wrap with tender chicken, lettuce, and mayo." },
    { name: "Crispy Chicken Wrap", price: 6.49, image: "Assets/images/crispyChickenWrap.jpg", description: "A crispy chicken wrap with crunchy chicken tenders and fresh veggies." },
    { name: "Cheese Chicken Wrap", price: 6.99, image: "Assets/images/cheeseChickenWrap.jpg", description: "A cheesy chicken wrap loaded with melted cheese and tender chicken." },

    { name: "French Fries", price: 2.99, image: "Assets/images/fries.jpg", description: "Crispy golden french fries, perfect as a side." },
    { name: "Onion Rings", price: 3.49, image: "Assets/images/onionRings.jpg", description: "Crunchy onion rings battered to perfection." },
    { name: "Coleslaw", price: 2.49, image: "Assets/images/coleslaw.jpg", description: "Fresh and tangy coleslaw made with shredded cabbage and carrots." },
    
    { name: "Iced Milo", price: 2.99, image: "Assets/images/milo.jpg", description: "Refreshing iced Milo drink, perfect for any time of the day." },
    { name: "Coke", price: 1.99, image: "Assets/images/coke.jpg", description: "Chilled Coca-Cola to quench your thirst." },
    { name: "Sprite", price: 1.99, image: "Assets/images/sprite.jpg", description: "Cool and crisp Sprite, a lemon-lime soda." },
    { name: "Coke Zero", price: 1.99, image: "Assets/images/cokezero.jpg", description: "Coke Zero with zero sugar and full flavor."},
    { name: "Fanta", price: 1.99, image: "Assets/images/fanta.jpg", description: "Fanta, a fruity and refreshing orange soda."}
]


function displayBurgers(menu) {

    return `
    <div class="card col-2 m-3 p-3">
            <img src="${menu.image}" alt="">
            <header class="text-center font-monospace fw-bold">${menu.name}</header>
            <p class="text-center"> <br>${menu.description}</p>
            <footer class="text-center fw-bold">$${menu.price}</footer>
            <input type="button" class="fixed-button" id="" value="+" onclick="addToCart('${menu.name}', ${menu.price})">
    </div>
        
        `;
}

function renderFood(containerId, food) {
    const container = document.getElementById(containerId);
    container.innerHTML = food.map(displayBurgers).join('');
}

window.onload = function () {
    renderFood('burger', menu.slice(0, 5));
    renderFood('wraps', menu.slice(5,10));
    renderFood('sides', menu.slice(10,13));
    renderFood('beverages', menu.slice(13));
}

function addToCart(name , price){
    const container = document.querySelector('.bill-items');
    container.innerHTML += `
    <div class="bill-item d-flex justify-content-between align-items-center mb-3">
        <span class="item-name">${name}</span>
        
        <span class="item-price">$${price.toFixed(2)}</span>
    </div>
    `;
    updateTotal(price);
}

function updateTotal(price) {
    const totalElement = document.getElementById('total');
    const total = parseFloat(totalElement.innerHTML) || 0;
    totalElement.innerHTML =`$${(total + price).toFixed(2)}`;
}