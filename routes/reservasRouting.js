const express = require('express');
const router = express.Router();
const Reserva = require('../models/reserva');
const { v4: uuidv4 } = require('uuid');

// Crear una nueva reserva
router.post('/', async (req, res) => {
    const { nombreCliente, email, fecha, franjaHoraria, personas, mesa } = req.body;

    if (!nombreCliente || !email || !fecha || !franjaHoraria || !personas || !mesa) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const nuevaReserva = new Reserva(uuidv4(), nombreCliente, email, fecha, franjaHoraria, personas, mesa);
    await Reserva.saveReserva(nuevaReserva);
    res.status(201).json({ message: 'Reserva creada exitosamente', reserva: nuevaReserva });
});

// Obtener todas las reservas
router.get('/', async (req, res) => {
    const reservas = await Reserva.getAllReservas();
    res.json(reservas);
});

// Eliminar una reserva por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Reserva.deleteReservaById(id);
    res.json({ message: 'Reserva eliminada exitosamente' });
});

// Buscar reservas por email
router.get('/buscar/:email', async (req, res) => {
    const { email } = req.params;
    const reservas = await Reserva.findReservaByEmail(email);
    if (reservas.length === 0) {
        return res.status(404).json({ message: 'No se encontraron reservas para este email' });
    }
    res.json(reservas);
});

module.exports = router;