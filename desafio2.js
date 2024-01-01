import { promises as fs } from 'fs'

class ProductManager {
	constructor () {
		this.path = "./products.json"
		this.products = []
	}
	static id = 0;
	addProduct = async ( title, description, img, code, stock, price ) => {
		if ( !title || !description || !img || !code || !stock || !price ) {
			return console.log("Todos los campos son obligatorios");
		}

		const resp = await this.readProduct()

		if ( !resp.some(p => p.code === code) ) {			
			ProductManager.id++
			const newProduct = {
				id: ProductManager.id,
				title,
				description, 
				img, 
				code, 
				stock, 
				price
			}	
			this.products.push(newProduct)
			await fs.writeFile(this.path, JSON.stringify(this.products, null, 2))
			console.log(`Productos ${ title } agregados correctamente`);
		} else {
			console.log(`El producto con el codigo ${ code } ya a sido agregado`);
		}
	}

	readProduct = async () => {	
		const resp = await fs.readFile(this.path, 'utf-8')
		const respJSON = JSON.parse(resp)
		return respJSON	
	}

	getProduct = async () => {
		const resp1 = await this.readProduct()
		return console.log(resp1)
	}

	getProductById = async (id) => {
		const resp2 = await this.readProduct()
		const productFind = resp2.find(prod => prod.id === id)
		return productFind ? console.log(productFind) : console.log(`El producto con id:(${ id }) no existe`);
	}

	updateProducts = async ({ id, ...products }) => {
		const listProduct = await this.readProduct();
		const index = listProduct.findIndex(prod => prod.id === id)

		if ( index !== -1 ) {
			listProduct[index] = { id, ...products }
			await fs.writeFile(this.path, JSON.stringify(listProduct, null, 2))
			console.log(listProduct[index]);
			return listProduct[index]
		} else {
			console.log('Producto no encontrado');
		}
	}

	deleteProductById = async (id) => {
		const resp3 = await this.readProduct()
		const validation = resp3.some(findId => findId.id === id)
		if (validation !== true) {
			return console.log(`El producto con id:(${ id }) no existe`);
		}
		const index = resp3.findIndex(prod => prod.id === id)

		if ( index !== -1 ) {
			resp3.splice(index, 1)
			await fs.writeFile(this.path, JSON.stringify(resp3, null, 2))
		} else {
			console.log('Producto no encontrado');
		}
		
		const prodDelete = await this.readProduct()
		console.log(prodDelete);
	}
}
const instanceProducts = new ProductManager
// instanceProducts.addProduct('title1', 'description1', 'url', 'jk7873', 10, 35)
// instanceProducts.addProduct('title2', 'description2', 'url', 'yuNs93', 10, 25)
// instanceProducts.addProduct('title3', 'description3', 'url', 'gt78jsx', 10, 65)
// instanceProducts.addProduct('title4', 'description4', 'url', 'ur43kla', 10, 45)
// instanceProducts.getProduct()
// instanceProducts.getProductById()
// instanceProducts.updateProducts()
// instanceProducts.deleteProductById()
