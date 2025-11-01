const deleteProductButtonElements = document.querySelectorAll('.product-item .btn-delete');

async function deleteProduct(event) {
    const buttonElement = event.target.closest('.btn-delete');
    
    if (!buttonElement) {
        console.error('Button element not found');
        return;
    }
    
    const productId = buttonElement.dataset.productid;
    const csrfToken = buttonElement.dataset.csrf;
    
    console.log('Deleting product:', productId);

    try {
        const response = await fetch('/admin/products/' + productId + '?_csrf=' + csrfToken, {
            method: 'DELETE'
        });

        if (!response.ok) {
            alert('Something went wrong!');
            console.error('Delete failed:', response.status);
            return;
        }

        // Remove the list item that contains the product card
        const listItem = buttonElement.closest('li');
        if (listItem) {
            listItem.remove();
        } else {
            buttonElement.closest('.product-item').remove();
        }
        
        console.log('Product deleted successfully');
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product: ' + error.message);
    }
} 

console.log('Found', deleteProductButtonElements.length, 'delete buttons');

for (const deleteProductButtonElement of deleteProductButtonElements) {
    deleteProductButtonElement.addEventListener('click', deleteProduct);
}