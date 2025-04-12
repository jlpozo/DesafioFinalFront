import Card from 'react-bootstrap/Card';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const formatPrice = (valor) => Math.round(parseFloat(valor || 0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const MyCard = ({id, imagen_url, marca, precio, descripcion, onDelete}) => {
    const producto = { id, imagen_url, marca, precio, descripcion}
    const navigate = useNavigate();
    
    const irAProducto = (e) => {
        e.preventDefault();
        console.log("ID de la producto:", id);
        navigate(`/product/${id}`);
    };
    
    const eliminarProducto = async (e) => {
        e.preventDefault();
        
        // Mostrar confirmación con SweetAlert2
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });
        
        // Si el usuario confirma la eliminación
        if (result.isConfirmed) {
            try {
                // Realizar la llamada a la API para eliminar el producto
                const response = await axios.delete(`${apiUrl}/v1/productos/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                // Mostrar mensaje de éxito
                Swal.fire(
                    '¡Eliminado!',
                    'El producto ha sido eliminado correctamente.',
                    'success'
                );
                
                // Si se proporcionó una función de callback para actualizar la lista de productos
                if (onDelete) {
                    onDelete(id);
                }
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                
                // Mostrar mensaje de error
                let errorMessage = 'No se pudo eliminar el producto.';
                
                if (error.response) {
                    // El servidor respondió con un estado fuera del rango 2xx
                    if (error.response.status === 401) {
                        errorMessage = 'No tienes autorización para eliminar este producto.';
                    } else if (error.response.status === 403) {
                        errorMessage = 'Se requiere ser administrador para eliminar productos.';
                    } else if (error.response.status === 404) {
                        errorMessage = 'El producto no existe o ya ha sido eliminado.';
                    }
                }
                
                Swal.fire(
                    'Error',
                    errorMessage,
                    'error'
                );
            }
        }
    };
    
    return (
        <>
            <Card style={{ width: "18rem", marginInline:"20px" }}>
                <Card.Img variant="top" src={imagen_url}/>
                <Card.Body>
                    <Card.Title>{marca}</Card.Title>
                    <Card.Subtitle>Descripcion:</Card.Subtitle>
                    <Card.Text><small>{descripcion}</small></Card.Text>
                    <Card.Subtitle>Precio: ${formatPrice(precio)}</Card.Subtitle>
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