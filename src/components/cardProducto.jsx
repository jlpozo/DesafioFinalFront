import AddCart from './addCart';
import { Row, Col, Card } from "react-bootstrap";


import { useNavigate } from 'react-router-dom';

const formatPrice = (valor) => Math.round(parseFloat(valor || 0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const MyCard = ({id, imagen_url, marca, precio, descripcion}) => {
    const producto = { id, imagen_url, marca, precio, descripcion}
    const navigate = useNavigate();

    const irAProducto = (e) => {
        e.preventDefault();
        console.log("ID de la producto:", id); // Añade este log
        navigate(`/product/${id}`);
    };

    return (
        <>
 <Row xs={1} md={2} lg={3} className="g-4">
            <Card style={{ width: "18rem", marginInline:"20px" }}>
                <Card.Img variant="top" src={imagen_url} onClick={irAProducto}/>
                <Card.Body>
                    <Card.Title>{marca}</Card.Title>
                    <Card.Subtitle>Descripcion:</Card.Subtitle>
                    <Card.Text><small>{descripcion}</small></Card.Text>
                    <Card.Subtitle>Precio: ${formatPrice(precio)}</Card.Subtitle>
                    <AddCart producto={producto}/>

                </Card.Body>
            </Card>
            </Row>
        </>
    );
};


export default MyCard;