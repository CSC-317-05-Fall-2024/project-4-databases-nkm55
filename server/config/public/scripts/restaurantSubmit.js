const handleSubmit = async (event) => {
    event.preventDefault(); 

    const restaurantName = document.getElementById('restaurant-name').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const address = document.getElementById('address').value;
    const photoURL = document.getElementById('photo-url').value;

    const newRestaurant = {
        name: restaurantName,
        phone: phoneNumber,
        address: address,
        photo: photoURL || 'default_image_url.jpg' 
    };

    try {
        const response = await fetch('/api/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRestaurant), 
        });

        if (response.ok) {
            window.location.href = '/restaurants';
        } else {
            console.error('Failed to create a new restaurant');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('new-restaurant-form');
    form.addEventListener('submit', handleSubmit);
});










