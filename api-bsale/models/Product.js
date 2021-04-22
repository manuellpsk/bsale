//Esta clase permite modelar la entidad (product) de la base datos
class Product {
    constructor(id, name, url_image, price, discount, category) {
        this.id = id;
        this.name = name;
        this.url_image = url_image;
        this.price = price;
        this.discount = discount;
        this.category = category;
    }
}

module.exports = Product;