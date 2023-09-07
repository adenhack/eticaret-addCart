import { Component } from "react";
import Navi from "./Navi.js";
import { Container, Row, Col } from "reactstrap";
import Category from "./Category.js";
import Product from "./Product.js";

export default class App extends Component {
  state = {
    CategoryTitle: "Category",
    productTitle: "Product",
    category: [],
    products: [],
    currentCategory: "",
    cart: [],
  }

  getCategory = (category) => {
    this.setState({ currentCategory: category.categoryName })
    this.componentDidMount(category.id);
  }

  componentDidMount(categoryId) {
    (
      () => {
        fetch("http://localhost:3000/categories")
          .then(response => response.json())
          .then(data => this.setState({ category: data }))
      }
    )();

    (() => {
      let url = "http://localhost:3000/products";

      if (categoryId) {
        url += "?categoryId=" + categoryId;
      }
      fetch(url)
        .then(response => response.json())
        .then(data => this.setState({ products: data }))
    })();
  }


  getClickButton = (product) => {
    // cart'ı kopyalıyor 
    let sepet = [...this.state.cart];

    let addItem = sepet.find(c => c.product.id === product.id);

    if (addItem) {
      addItem.quantity += 1;
    } else {
      sepet.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: sepet })
  }

  getOnRemoveButton = (product) => {
    let removeItem = this.state.cart.filter(c => c.product.id !== product.id);
    this.setState({ cart: removeItem });
  }

  render() {
    return (
      <div className="App">
        <Container>

          <Row>
            <Col>
              <Navi currentCategory={this.state.currentCategory}  getOnRemoveButton={this.getOnRemoveButton} cart={this.state.cart} />
            </Col>
          </Row>

          <Row className="d-flex justify-content-center">
            <Col style={{ display: "flex", justifyContent: "center" }}><Category getCategory={this.getCategory} category={this.state.category} /></Col>
            <Col style={{ display: "flex", justifyContent: "center" }}><Product getClickButton={this.getClickButton} products={this.state.products} /></Col>
          </Row>

        </Container>
      </div>
    );
  }
}

