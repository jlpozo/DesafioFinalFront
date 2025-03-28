import Card from 'react-bootstrap/Card';
import { Button, ButtonGroup } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

const formatPrice = (valor) => valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const MyCard = ({id, img, marca, price, desc}) => {
    const producto = { id, img, marca, price, desc}
    const navigate = useNavigate();

    const irAProducto = (e) => {
        e.preventDefault();
        console.log("ID de la producto:", id); // Añade este log
        navigate(`/product/${id}`); // Cambiar de nombre para que haga match
    };
    const eliminarProducto = (e) => {
        e.preventDefault();
        console.log("Eliminar producto ID:", id); // Añade este log       
        alert("Producto Eliminado");
    };
    return (
        <>

            <Card style={{ width: "18rem", marginInline:"20px" }}>
                <Card.Img variant="top" src={img}/>
                <Card.Body>
                    <Card.Title>{marca}</Card.Title>
                    <Card.Subtitle>Descripcion:</Card.Subtitle>
                    <Card.Text><small>{desc}</small></Card.Text>
                    <Card.Subtitle>Precio: ${formatPrice(price)}</Card.Subtitle>
                    <ButtonGroup style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
                        <Button style={{marginRight: '5px'}} className="btn btn-danger mt-3 rounded-pill" variant="primary" onClick={eliminarProducto}>
                            Borrar
                        </Button>        
                        <Button style={{marginRight: '5px'}} className="btn btn-success mt-3 rounded-pill" variant="primary" onClick={irAProducto}>
                            Editar
                        </Button>        
                    </ButtonGroup>


                </Card.Body>
            </Card>

        </>
    );
};


export default MyCard;