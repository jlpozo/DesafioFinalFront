import Card from 'react-bootstrap/Card';
import AddCart from './addCart';


import { useNavigate } from 'react-router-dom';

const formatPrice = (valor) => valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const MyCard = ({id, img, marca, price, desc}) => {
    const producto = { id, img, marca, price, desc}
    const navigate = useNavigate();

    const irAProducto = (e) => {
        e.preventDefault();
        console.log("ID de la producto:", id); // Añade este log
        navigate(`/product/${id}`);
    };

    return (
        <>

            <Card style={{ width: "18rem", marginInline:"20px" }}>
                <Card.Img variant="top" src={img} onClick={irAProducto}/>
                <Card.Body>
                    <Card.Title>{marca}</Card.Title>
                    <Card.Subtitle>Descripcion:</Card.Subtitle>
                    <Card.Text><small>{desc}</small></Card.Text>
                    <Card.Subtitle>Precio: ${formatPrice(price)}</Card.Subtitle>
                    <AddCart producto={producto}/>

                </Card.Body>
            </Card>

        </>
    );
};


export default MyCard;