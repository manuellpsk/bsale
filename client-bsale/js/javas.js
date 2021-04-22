const URL_API = 'https://apibsale.herokuapp.com'

//Al cargar la pagina consulta a la API las categorias disponibles, para luego colocar en el selectFilterCategory. https://apibsale.herokuapp.com
window.addEventListener('load', () => {

    //Peticion a la API
    fetch(`${URL_API}/categories`).then(res => {
        res.json().then(data => {

            //Los resultados se transforman en etiquetas <option> y se agregan al selectFilterCategory
            const select = document.getElementById("selectFilterCategory");
            data.map(option => {
                const newOption = document.createElement('option');
                newOption.value = option.id;
                newOption.text = option.name;
                newOption.className = 'text-capitalize';
                select.appendChild(newOption);
            });
        });
    }).catch(err => {
        console.log(err);
    })
})

//Metodo para limpia todos los filtros
const clearFilter = () => {
    //Limpia selectFilterCategory
    const selectCategory = document.getElementById("selectFilterCategory");
    selectCategory.getElementsByTagName('option')[0].selected = 'selected';

    //Limpia selectOrdenar
    const selectOrder = document.getElementById("selectOrdenar");
    selectOrder.getElementsByTagName('option')[0].selected = 'selected';

    //Limpia checkBoxDiscount
    document.getElementById("checkBoxDiscount").checked = false;

    //Limipia la busqueda y la lista con los productos mostrados
    document.getElementById('titleBusqueda').innerHTML = '';
    const inputName = document.getElementById('inputName');
    const wrapper = document.getElementById('wrapper');
    while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.lastChild)
    }
    inputName.value = ''
    inputName.focus()
};

//Metodo para el onChange de atributos, si cambia alguno de estos atributos, entonces tengo que refrescar la lista.
const onChangeAttribute = () => {

    //Obtener categoria actual
    const selectCategory = document.getElementById("selectFilterCategory");
    const category = selectCategory.selectedOptions[0].value;

    //Obtener el orden que quiere el usuario
    const selectOrder = document.getElementById("selectOrdenar");
    const order = selectOrder.selectedOptions[0].value;

    //Objeto que se enviara como paramatros a la funcion mostrarLista
    const params = {
        category,
        order
    }

    //Obtener el nombre del producto de la busqueda actual, si no existe, elimino la key del objeto
    const titleBusqueda = document.getElementById('titleBusqueda');
    if (titleBusqueda.textContent) {
        params.nameProduct = titleBusqueda.textContent.substring(16)
    } else {
        delete params['nameProduct']
    }

    //Obtener el valor de checkBoxDiscount, si esta seleccionado, elimino la key del objeto
    const checkBoxDiscount = document.getElementById("checkBoxDiscount");
    if (checkBoxDiscount.checked) {
        params.discount = 1
    } else {
        delete params['discount']
    }
    //Llamo a motrarList y envio como parametro al objeto creado
    mostrarLista(params)
};

//Metodo de evento onClick del boton buscar
const onClickBuscar = (e) => {
    //Evita el comportamiento por defecto
    e.preventDefault()
    e.stopPropagation()

    //El nombre ingresado en el input ahora sera el titulo de la busqueda
    const inputName = document.getElementById('inputName')
    const titleBusqueda = document.getElementById('titleBusqueda')
    if (inputName.value.trim()) {
        titleBusqueda.innerHTML = 'Resultados para ' + inputName.value.trim()
    } else {
        const alerta = document.getElementById("alerta");
        inputName.focus()
        alerta.style.display = "block"
        setTimeout(function () {
            alerta.style.display = "none"
        }, 3000);
        return
    }

    //Ejecuta el metodo encargado de validar y mostrar datos
    onChangeAttribute()
}

//Metodo para mostrar los productos despues de aplicar  un filtro, category: id para filtrar la categoria, order: en que orden van, discount: si esta buscando productos con descuento, nameProduct: nombre del producto.
const mostrarLista = ({ category = 0, order = 0, discount = 0, nameProduct = '' } = {}) => {

    console.log(`Category: ${category} order: ${order} discount: ${discount} name: ${nameProduct}`)
    if ((category + order + discount == 0) && nameProduct.length == 0) {
        clearFilter()
        return;
    }

    //Obtener y limpiar contenedor de la lista de productos
    const wrapper = document.getElementById('wrapper');
    while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.lastChild)
    }

    //Relizar peticion a la API, los parametros indican los filtros de busqueda.
    fetch(`${URL_API}/products/${category}/${order}/${discount}/${nameProduct}`).then(res => {
        res.json().then(data => {

            //Recorre la respuesta de la API y agerga cada producto a la lista.
            data.map(product => {

                //Creando contenedor para el producto <div>.
                const card = document.createElement('div');
                card.className = 'card bg-light';

                //Creando elemento <img> del producto, si no existe url_image, la imagen del producto sera la que se encuentra en './images/notfound.png'
                const image = document.createElement('img');
                image.className = 'card-img-top my-1';
                if (!product.url_image) {
                    product.url_image = './images/notfound.png'
                }
                image.src = product.url_image;

                //Creando etiqueta para el descuento del producto <p>
                const spanDesc = document.createElement('p')
                spanDesc.className = 'fw-bold text-success'
                product.discount != 0 ? spanDesc.textContent = product.discount + '% descuento' : spanDesc.textContent = ' '

                //Creando cuerpo del contenedor, contendra nombre, descuento, y boton buy del product
                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                //Crendo etiqueta para el nombre del producto <p>
                const title = document.createElement('p');
                title.className = 'card-title text-capitalize';
                title.textContent = product.name.toLowerCase();

                //Este contenedor sirve para nivelar horizontalmente el precio y boton de compra
                const flxDiv = document.createElement('div');
                flxDiv.className = 'd-flex justify-content-between align-self-end'
                const price = document.createElement('p');
                price.textContent = product.price;
                const btnBuy = document.createElement('a');
                btnBuy.className = 'btn btn-primary';
                btnBuy.textContent = 'Buy';

                //Agregando los componente con sus respectivos padres.
                flxDiv.appendChild(price)
                flxDiv.appendChild(btnBuy)
                cardBody.appendChild(title)
                cardBody.appendChild(spanDesc)
                cardBody.appendChild(flxDiv)
                card.appendChild(image)
                card.appendChild(cardBody)
                wrapper.appendChild(card)
            })
        });
    }).catch(err => {
        console.log(err);
    });
}