import React, { useState, useRef, useEffect, FormEvent } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ProductList from "./components/ProductList";
import Product from "./models/Product";
import PrecoDaHora from "precodahora-api";
import options from "./options";
// import logo from "./logo.svg";
//import "./App.css";

function App() {
  let [products, setProducts] = useState<Product[]>([]);
  let productInput = useRef<HTMLInputElement>(null);

  async function searchProducts(event: FormEvent) {
    event.preventDefault();
    const client = new PrecoDaHora();
    //const res = await client.sugestao({ item: productInput.current!.value });

    console.log(productInput.current!.value);

    const response = await fetch(`${options.baseURL}/produtos/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: productInput.current!.value }),
    });

    const responseData = await response.json();
    console.log("Response Data: ", responseData);
    // if (res.data.codigo == 80) {
    //   console.log("Resultado da busca para o produto: ", res.data.resultado);
    // } else {
    //   console.log("Erro: ", res.data);
    // }
    setProducts(
      responseData.result.map((item: any) => {
        const prod = { name: item.descricao, gtin: item.gtin };
        return prod;
      })
    );
  }
  return (
    <div className="App">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Form>
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Produto</Form.Label>
              <Form.Control
                type="text"
                ref={productInput}
                placeholder="Ex.: Biscoito, Azeite, Alvejante..."
              />
              {/* <Form.Text className="text-muted">
                Inform o produto a ser pesquisado.
              </Form.Text> */}
            </Form.Group>
            <Button onClick={searchProducts} variant="primary" type="submit">
              Pesquisar
            </Button>
          </Form>
          <ProductList products={products}></ProductList>
        </div>
      </div>
    </div>
  );
}

export default App;
