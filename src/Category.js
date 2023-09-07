import { Component } from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import "../src/Category.css";

export default class Category extends Component {

    render() {
        return (
            <div className="Category d-flex justify-content-center mb-5 mt-3    " >
                {
                    this.props.category.map((cate) => (
                        <Button className="lgi" onClick={() => this.props.getCategory(cate)} key={cate.id}>
                            {cate.categoryName}
                        </Button>
                    ))
                }
            </div>
        );
    }
}



// import { Component } from "react";
// import { ListGroup, ListGroupItem } from "reactstrap";
// import "../src/Category.css";

// export default class Category extends Component {
//   constructor() {
//     super();
//     this.state = {
//       hoverItemId: null, // Üzerine gelinen öğe kim?
//     };
//   }

//   handleMouseEnter = (id) => {
//     this.setState({ hoverItemId: id });
//   };

//   handleMouseLeave = () => {
//     this.setState({ hoverItemId: null });
//   };

//   getRandomColor = () => {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   render() {
//     return (
//       <div className="Category">
//         <ListGroup className="lgp" style={{ width: "400px", textAlign: "center" }}>
//           {this.props.category.map((cate) => (
//             <ListGroupItem
//               className="lgi"
//               style={{
//                 backgroundColor:
//                   this.state.hoverItemId === cate.id ? this.getRandomColor() : "transparent",
//               }}
//               onMouseEnter={() => this.handleMouseEnter(cate.id)}
//               onMouseLeave={this.handleMouseLeave}
//               onClick={() => this.props.getCategory(cate)}
//               key={cate.id}
//             >
//               {cate.categoryName}
//             </ListGroupItem>
//           ))}
//         </ListGroup>
//       </div>
//     );
//   }
// }
