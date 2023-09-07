import Nav from 'react-bootstrap/Nav';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Component } from "react";
import { Badge } from "reactstrap";
import { BsCart } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { PiShoppingCartLight } from 'react-icons/pi';
import { PiShoppingCartFill } from 'react-icons/pi';
import { Table } from "reactstrap";
import "../src/Navi.css";

export default class Navi extends Component {

    state = {
        toplam: 0,
    }

    componentDidUpdate(prevProps) {
        // props.cart değiştiğinde çalışması gereken bir koşul ekleyin
        if (this.props.cart !== prevProps.cart) {
            // toplamı hesaplamak için reduce kullanın
            const total = this.props.cart.reduce((acc, crt) => {
                return acc + crt.quantity * crt.product.unitPrice;
            }, 0);

            // setState'i bu toplam değeriyle çağırın
            this.setState({ toplam: total });
        }
    }

    renderHead() {
        return (
            <div>
                <h3 style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "70px", background: "gold" }}><BsCart className="m-2" /> Alışveriş Sepetim</h3>
            </div>
        )
    }

    renderCart() {
        return (
            <div>
                <Table style={{ width: "600px", textAlign: "center" }}>
                    <thead>
                        <tr className='trth'>
                            <th>Adet</th>
                            <th>Ürün</th>
                            <th>Ürün İsmi</th>
                            <th>Fiyat</th>
                            <th>A*F</th>
                            <th>Kaldır</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.cart.map(cartItem => (
                                <tr key={cartItem.product.id}>
                                    <td> <Badge color="success" style={{ marginRight: "5px", textAlign: "center" }}>{cartItem.quantity}</Badge> </td>
                                    <td>
                                        <img
                                            style={{ width: "45px", height: "45px" }}
                                            alt="Sample"
                                            src="https://picsum.photos/200/350"
                                        /></td>
                                    <td>{cartItem.product.productName}</td>
                                    <td>{cartItem.product.unitPrice} TL</td>
                                    <td>{cartItem.quantity * cartItem.product.unitPrice}</td>
                                    <td className='dng' onClick={() => this.props.getOnRemoveButton(cartItem.product)}><GrClose /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th style={{ border: "none" }}>TOPLAM</th>
                            <th style={{ border: "none" }} >{this.state.toplam}</th>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        )
    }

    renderEmptyCart() {
        return (
            <div style={{ backgroundColor: "lightgray", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "70px" }}>
                <h3>Sepet Boş</h3>
            </div>
        )
    }

    render() {

        return (
            <Nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", marginTop: "25px" }}>
                <div className='col-2'>
                    <Nav.Link>
                        E-Ticaret Sitesi
                    </Nav.Link>
                </div>

                <div className='col-10' style={{ display: "flex", justifyContent: "space-between" }}>
                    <InputGroup style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div className='col-8'>
                            <Form.Control placeholder={this.props.currentCategory.length > 0 ? this.props.currentCategory : "Teknoloji,Ev Aletleri,Sağlıklı Yaşam ve daha fazlası..."} aria-label="Text input with dropdown button" style={{ borderRadius: "15px" }} />
                        </div>

                        <div className='col-2'>
                            <DropdownButton
                                variant="outline-secondary"
                                title={<Dropdown.Item href="#">{this.props.cart.length > 0 ? <PiShoppingCartFill /> : <PiShoppingCartLight />}
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {this.props.cart.length}
                                    </span></Dropdown.Item>}
                                id="input-group-dropdown-2"
                                align="end"
                            >
                                {this.renderHead()}
                                {this.props.cart.length > 0 ? this.renderCart() : this.renderEmptyCart()}
                            </DropdownButton>
                        </div>
                    </InputGroup>
                </div>
            </Nav>
        );
    }

}


