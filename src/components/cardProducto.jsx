import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
//import AddCart from './addCart';

import { useNavigate } from 'react-router-dom';

const MyCard = ({id, img, marca, price, descripcion}) => {
    const producto = { id, img, marca, price, descripcion}
    const navigate = useNavigate();

    const irAProducto = (e) => {
        e.preventDefault();
        console.log("ID de la producto:", id); // Añade este log
        navigate(`/producto/${id}`);
    };

    return (
        <>

            <Card style={{ width: "18rem", marginInline:"20px" }}>
                <Card.Img variant="top" src={img} />
                <Card.Body>
                    <Card.Title>{marca}</Card.Title>
                    <Card.Subtitle>Descripcion:</Card.Subtitle>
                    <Card.Text>{descripcion.toString()}</Card.Text>
                    <Card.Subtitle>Precio: ${price}</Card.Subtitle>
        
                    <ButtonGroup className='me-2'>
                        <Button className="btn btn-dark mt-3 rounded-pill" variant="primary" onClick={irAProducto}>
                            Agregar al carro
                        </Button>
                        {/*<AddCart pizza={pizza}/>*/}
                    </ButtonGroup>
                </Card.Body>
            </Card>

        </>
    );
};


export default MyCard;