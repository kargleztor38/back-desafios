class ProductManager {
	constructor () {
		this.products = [];
		this.id = 1;
	};

	addProduct( title, description, price, img, code, stock ) {

		if ( !title || !description || !price || !img || !code || !stock ) {
			console.log(
				'Todos los campos son obligatorios'
			);
		}

		if ( !this.products.some((prod) => prod.code === code) ) {
			const id = this.id ++;
			let newProductAdd ={ id, title, description, price, img, code, stock };

			this.products.push( newProductAdd );
			console.log(`El producto ${ title } fue agregado de manera correcta`);
		} else {
			console.log(`El producto con codigo ${ code } ya fue agregado`);
		}
	}
	
	getProducts() {
		console.log( this.products );
	}

	getProductById( id ) {
		let prodFind = this.products.find( P => P.di === id )

		prodFind ? prodFind : console.log(`El producto que busca con el id: ${ id } no existe`)
	}
}

const prodManager = new ProductManager();