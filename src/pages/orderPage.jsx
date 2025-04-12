import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';

const formatPrice = (valor) => Math.round(parseFloat(valor || 0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString();
};

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orden, fechaCompra } = location.state || {};

  // Si no hay orden en el estado, redirigir al home
  if (!orden) {
    return (
      <Container className="py-5 text-center">
        <h2>No se encontraron detalles de la compra</h2>
        <Button onClick={() => navigate('/')} className="mt-3">
          Volver al inicio
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-success text-white text-center">
              <h3>¡Compra realizada con éxito!</h3>
            </Card.Header>
            <Card.Body>
              <Row className="mb-4">
                <Col>
                  <h5>Detalles de la Orden #{orden.id}</h5>
                  <p><strong>Fecha:</strong> {formatDate(orden.fecha_creacion || fechaCompra)}</p>
                  <p><strong>Estado:</strong> {orden.estado}</p>
                  <p><strong>Dirección de envío:</strong> {orden.direccion_envio}</p>
                </Col>
              </Row>

              <h5>Productos adquiridos</h5>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orden.detalles?.map((detalle, index) => (
                    <tr key={index}>
                      <td>{detalle.producto.nombre}</td>
                      <td>{detalle.cantidad}</td>
                      <td>${formatPrice(detalle.precio_unitario)}</td>
                      <td>${formatPrice(detalle.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                    <td><strong>${formatPrice(orden.total)}</strong></td>
                  </tr>
                </tfoot>
              </Table>

              <div className="text-center mt-4">
                <p className="text-muted">
                  Te enviamos un correo electrónico con los detalles de tu compra.
                </p>
                <Button 
                  onClick={() => navigate('/')} 
                  className="btn btn-dark mt-3 rounded-pill"
                  variant="primary">
                  Seguir comprando
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderPage;