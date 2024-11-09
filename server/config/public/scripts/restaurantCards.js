async function deleteRestaurantCard(event) {
    const buttonClicked = event.target;
    const cardToDelete = buttonClicked.closest('.restaurant');
    const restaurantId = cardToDelete.getAttribute('data-id'); 

  
    try {
        const response = await fetch(`/api/restaurants/${restaurantId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            cardToDelete.remove();
        } else {
            console.error('Failed to delete the restaurant');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function attachDeleteFunctionality() {
    document.querySelectorAll('.delete-button').forEach(button => {
        button.removeEventListener('click', deleteRestaurantCard); 
        button.addEventListener('click', deleteRestaurantCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    attachDeleteFunctionality();
});


