import "./style.css";
import { fetchData } from "./api";

const url_api = "http://localhost:3000/products";

const create_form = document.getElementById('active_modal')
const modal = document.getElementById('modal')
const close_modal = document.getElementById('close_modal')
const close_modal_edit = document.getElementById('close_modal_edit')
const form_create = document.getElementById('form_create')
const form_edit = document.getElementById('form_edit')

create_form.addEventListener('click', () => {
    modal.classList.remove('modal_off')
    form_create.classList.remove('view_off_form')
});

close_modal_edit.addEventListener('click', () => {
    form_edit.classList.remove('view_off_form')
    modal.classList.add('modal_off')
})

// Method PUT / PATCH
const updateProduct = async (id) => {
    try {
        const response = await fetch(`${url_api}/${id}`);
        if (!response.ok) {
            console.error("No se pudo obtener el producto para editar");
            return;
        }
        const product = await response.json();

        // Abrir modal editar
        modal.classList.remove('modal_off');
        form_edit.classList.remove('view_off_form');

        // Llenar formulario con datos
        document.getElementById('edit_name').value = product.name || '';
        document.getElementById('edit_precio').value = product.price || '';
        document.getElementById('edit_stock').value = product.stock || '';
        document.getElementById('edit_category').value = product.category || '';
        document.getElementById('edit_description').value = product.description || '';
        document.getElementById('edit_status').value = product.status ? '0' : '1';

        // Guardar id para luego usarlo en submit
        form_edit.dataset.productId = id;

    } catch (error) {
        console.error("Error al obtener el producto para edición:", error);
    }
};

// Ahora el event listener para enviar el formulario y actualizar
form_edit.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = form_edit.dataset.productId;
    if (!id) {
        alert("ID del producto no encontrado.");
        return;
    }

    // Obtener valores del formulario
    const name = document.getElementById("edit_name").value;
    const price = document.getElementById("edit_precio").value;
    const stock = document.getElementById("edit_stock").value;
    const category = document.getElementById("edit_category").value;
    const status = document.getElementById("edit_status").value;
    const description = document.getElementById("edit_description").value;

    if (!name || !price || !stock || !category || status === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const updatedProduct = {
        name,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        category,
        description,
        status: status === "0" ? true : false,
        image_url: `https://example.com/img/${name}`
    };

    try {
        const response = await fetch(`${url_api}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct),
        });

        if (response.ok) {
            console.log(`Producto con ID ${id} actualizado.`);
            modal.classList.add('modal_off');
            form_edit.reset();
            viewProducts(); // Refrescar tabla
        } else {
            alert("Error al actualizar el producto.");
        }
    } catch (error) {
        console.error("Error al actualizar:", error);
    }
});

// Method Delete
const deleteProduct = async (id) => {
    const response = await fetchData(`${url_api}/${id}`, 'DELETE');
    if (response !== null) {
        console.log(`✅ Producto con ID ${id} eliminado`);
        const tb = document.getElementById("tb"); // Tbody
        viewProducts(); // Actualiza la tabla
    } else {
        console.error(`❌ No se pudo eliminar el producto con ID ${id}`);
    }
};

// Ver productos
const viewProducts = async () => {
    const products = await fetchData(url_api);
    const tb = document.getElementById("tb"); // Tbody

    tb.innerHTML = "";
    products.forEach((p, i) => {
        const tr = document.createElement("tr"); // Trow
        i % 2 === 0 ? tr.classList.add("td_dark") : tr.classList.add("td_white");
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>$${p.price}</td>
            <td>${p.category}</td>
            <td>${p.stock}</td>
            <td >
                <div class="${p.status ? 'td_status_true' : 'td_status_false'}">
                    ${p.status ? 'Disponible' : 'No disponible'}
                </div>
            </td>
            <td id="box_btn_action">
                <button class="edit-btn btn_action" data-id="${p.id}">
                    Editar
                </button>
                <button class="delete-btn btn_action" data-id="${p.id}">
                    Eliminar
                </button>
            </td>
        `;
        tb.appendChild(tr);
    });


    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            updateProduct(id)
        });
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            deleteProduct(id)
        });
    });

};

// -------------- formulario --------------

// Método para capturar el formulario y crear el producto
document.getElementById("form_create").addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    // Captura los valores del formulario
    const name = document.getElementById("name").value;
    const price = document.getElementById("precio").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;
    const status = document.getElementById("status").value;
    const description = document.getElementById("description").value;

    // Validación básica de los campos
    if (!name || !price || !stock || !category || status === "") {
        alert("Por favor, completa todos los campos.");
        return; // Detiene la ejecución si hay algún campo vacío
    }

    // Crea el objeto producto a partir de los valores del formulario
    const producto = {
        name,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        category,
        description,
        status: status === "0" ? true : false, // 0 = Disponible, 1 = No Disponible
        image_url: `https://example.com/img/${name}`
    };

    // Llama a la función para crear el producto
    await addProduct(producto);
});

// Función que se encarga de enviar el producto al servidor
const addProduct = async (product) => {
    try {
        const response = await fetch("http://localhost:3000/products", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(`✅ Producto creado con ID: ${jsonResponse.id}`);
            form_create.classList.add('view_off_form'); // ocultar formulario creación
            modal.classList.add('modal_off');           // ocultar modal
            viewProducts(); // Por ejemplo, recargar la tabla

            form_create.reset();  // limpiar formulario
        } else {
            console.error("❌ No se pudo crear el producto.");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
};


document.addEventListener("DOMContentLoaded", viewProducts());
