const fs = require("fs");

class ProductManager {
	constructor() {
		this.path = './products.json'
	}

	addProduct(title, description, price, img, code, stock) {
		if (!title || !description || !price || !img || !code || !stock) {
			return console.log("Todos los campos son obligatorios");
		}

		const added = async () => {
			try {
				const resp = await fs.promises.readFile( this.path, "utf-8" );
				const arrayResp = JSON.parse(resp);
				if (!arrayResp.some(prod => prod.code === code)) {
					let id = id++;
					console.log(id);
					const newProductAdd = {
						id,
						title,
						description,
						price,
						img,
						code,
						stock
					};
					arrayResp.push(newProductAdd);
				} else {
					return console.log(`El producto con codigo ${code} ya fue agregado`);
				}
				await fs.promises.writeFile( this.path, JSON.stringify(arrayResp, null, 2), "utf-8" );
				console.log(`El producto ${title} fue agregado de manera correcta`);
			} catch (error) {
				console.log(error);
			}
		};
		added();
	}

	getProducts() {
		const readProduct = async () => {
			try {
				const resp = await fs.promises.readFile(this.path, 'utf-8')
				console.log(resp)
			} catch (error) {
				console.log(error);
			}
		}
		readProduct();
	}

	getProductById(id) {
		const getItem = async () => {
			try {
				const resp = await fs.promises.readFile(this.path, 'utf-8')
				const arrayResp = JSON.parse(resp);
				const prodFind = arrayResp.find(prod => prod.id === id)
				if (prodFind) {
					return console.log(prodFind)
				} else {
					console.log(`El producto que busca con el id: ${id} no existe`)
				}
			} catch (error) {
				console.log(error);
			}
		}
		getItem();
	}

	deleteProduct(id) {
		const deleteItem = async () => {
			const item = await fs.promises.readFile(this.path, 'utf-8')
			const arrayResp = JSON.parse(item);
			const filterProd = arrayResp.filter(pd => pd.id !== id)
			await fs.promises.writeFile(this.path, filterProd)
			item = await fs.promises.readFile(this.path, 'utf-8')
			console.log(item);
		}
		deleteItem()
	}
}

const prodManager = new ProductManager();

