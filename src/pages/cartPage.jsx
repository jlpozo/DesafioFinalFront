import React, { useState } from 'react';
import '../App.css';
import { useContext } from "react";
import { Table, Button, Modal } from 'react-bootstrap';
import Increment from '../components/increment';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const formatPrice = (valor) => Math.round(parseFloat(valor || 0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function Cart() {
    const { cart, total, setCart, setTotal } = useContext(CartContext);
    const { token, user } = useContext(UserContext);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    if (!cart || cart.length === 0) return <div className="text-center p-5">Tu carrito está vacío...</div>;

    const handleShowConfirmModal = () => setShowConfirmModal(true);
    const handleCloseConfirmModal = () => setShowConfirmModal(false);

    const procesarCompra = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Preparar los items para la orden
            const items = cart.map(item => ({
                producto_id: item.id,
                cantidad: item.count
            }));
            
            // Datos para crear la orden
            const orderData = {
                direccion_envio: user?.direccion || "Dirección pendiente", // Idealmente esto vendría del perfil de usuario o un formulario
                items: items
            };
            
            // Configuración del header con el token
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            
            // Enviar la orden al backend
            const response = await axios.post(`${apiUrl}/v1/ordenes`, orderData, config);
            
            // Si la orden se creó correctamente, redirigir a la página de confirmación
            if (response.data && response.data.id) {
                // Limpiar el carrito después de la compra exitosa
                setCart([]);
                setTotal(0);
                
                // Redirigir a la página de confirmación con los detalles de la orden
                navigate('/orderConfirm', { 
                    state: { 
                        orden: response.data,
                        fechaCompra: new Date().toLocaleString() 
                    } 
                });
            }
        } catch (err) {
            console.error('Error al procesar la compra:', err);
            setError(err.response?.data?.mensaje || 'Hubo un error al procesar tu compra. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
            handleCloseConfirmModal();
        }
    };

    return (
        <>            
        <Table responsive>
            <tbody>
                {cart.map((producto, i) => (
                    <tr key={i}>
                        <td>
                            <img className="img" width="80" height="70" src={producto.imagen_url} alt={producto.marca} />
                        </td>
                        <td><b>{producto.marca}</b> &nbsp;
                        <small>{producto.descripcion}</small>
                        </td>
                        
                        <td>
                            <Increment index={i} />
                        </td>
                        <td>{producto.count}</td>
                        <td>=</td>
                        <td>{formatPrice(producto.count * producto.precio)}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="5">Total</td>
                    <td>=</td>
                    <td className="fw-bold">${formatPrice(total)}</td>
                </tr>
            </tfoot>
        </Table>
        
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        
        <Button 
            disabled={!token || loading} 
            className="btn btn-dark mt-3 rounded-pill" 
            variant="primary" 
            onClick={handleShowConfirmModal}
        >
            {loading ? 'Procesando...' : 'Comprar'}
        </Button>

        {/* Modal de Confirmación */}
        <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar compra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>¿Estás seguro que deseas realizar esta compra por un total de <strong>${formatPrice(total)}</strong>?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className="btn btn-dark mt-3 rounded-pill" onClick={handleCloseConfirmModal}>
                    Cancelar
                </Button>
                <Button variant="primary" className="btn btn-dark mt-3 rounded-pill" onClick={procesarCompra} disabled={loading}>
                    {loading ? 'Procesando...' : 'Confirmar Compra'}
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default Cart;