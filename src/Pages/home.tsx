import React, { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';

export const Home: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [records, setRecords] = useState<Record[]>([]);

    const handleClick = () => {
        Swal.fire({
            title: 'Mensaje personalizado',
            input: 'text',
            inputPlaceholder: 'Escribe tu mensaje',
            html: `
                <h4>Contactos</h4>
                <ul id="contactsList" style="text-align: left;">
                    ${contacts.map((contact, index) => `<li data-index="${index}" style="cursor: pointer;">${contact.name} (${contact.phone})</li>`).join('')}
                </ul>
                <button id="registerContact" class="swal2-styled">Registrar contacto</button>
            `,
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const message = Swal.getPopup().querySelector('input').value;
                const selectedContactIndex = Swal.getPopup().querySelector('#contactsList li.selected');
                let selectedContact = null;
                if (selectedContactIndex) {
                    const index = parseInt(selectedContactIndex.getAttribute('data-index'), 10);
                    selectedContact = contacts[index];
                }
                return { message, selectedContact };
            },
            didRender: () => {
                const contactsList = Swal.getPopup().querySelector('#contactsList');
                contactsList.querySelectorAll('li').forEach((li, index) => {
                    li.addEventListener('click', () => {
                        contactsList.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
                        li.classList.add('selected');
                    });
                });
                
                const registerContactButton = Swal.getPopup().querySelector('#registerContact');
                registerContactButton.addEventListener('click', handleRegisterContact);
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { message, selectedContact } = result.value;
                const newRecord = {
                    id: records.length + 1,
                    status: 'Enviado',
                    contact: selectedContact ? `${selectedContact.name} (${selectedContact.phone})` : 'Ninguno',
                    message: message
                };
                setRecords((prevRecords) => [...prevRecords, newRecord]);
                Swal.fire('Mensaje enviado', `Tu mensaje: "${message}" fue enviado.`, 'success');
            }
        });
    };

    const handleRegisterContact = () => {
        Swal.fire({
            title: 'Registrar contacto',
            html: `
                <input id="contactName" class="swal2-input" placeholder="Nombre">
                <input id="contactPhone" class="swal2-input" placeholder="Teléfono">
            `,
            showCancelButton: true,
            confirmButtonText: 'Registrar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const name = document.getElementById('contactName').value;
                const phone = document.getElementById('contactPhone').value;
                return { name, phone };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const newContact = result.value;
                setContacts((prevContacts) => [...prevContacts, newContact]);
                Swal.fire('Contacto registrado', `Contacto: ${newContact.name} (${newContact.phone})`, 'success');
                handleClick();
            }
        });
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <Button variant="primary" style={{ fontSize: '24px' }} onClick={handleClick}>
                +
            </Button>
            <Row style={{ marginTop: '20px' }}>
                {records.map((record, index) => (
                    <Col md={4} key={index}>
                        <Card>
                            <Card.Body>
                                <Card.Title>ID: {record.id}</Card.Title>
                                <Card.Text>
                                    Estatus: {record.status}<br />
                                    Contacto: {record.contact}<br />
                                    Mensaje: {record.message}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Home;
