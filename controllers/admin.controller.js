function getProducts(req, res) {
    res.render('admin/products/all-products');
}
function getNewproduct(req, res) {
    res.render('admin/products/new-product');


}

function createNewProduct(req, res){
    
    
    res.redirect('/admin/products');

}


module.exports = {
    getProducts: getProducts,
    getNewproduct: getNewproduct,
    createNewProduct: createNewProduct
};