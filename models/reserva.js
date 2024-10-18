const fs = require('fs/promises');
const path = require('path');

// Ruta al archivo JSON donde se guardan las reservas
const filePath = path.join(__dirname, '../data/reservas.json');

class Reserva {
    constructor(id, nombreCliente, email, fecha, franjaHoraria, personas, mesa, estado = 'confirmada') {
        this.id = id;
        this.nombreCliente = nombreCliente;
        this.email = email;
        this.fecha = fecha;
        this.franjaHoraria = franjaHoraria;
        this.personas = personas;
        this.mesa = mesa;
        this.estado = estado;
    }

    static async getAllReservas() {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data).reservas;
    }

    static async saveReserva(nuevaReserva) {
        const data = await fs.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(data);
        jsonData.reservas.push(nuevaReserva);
        await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
    }

    static async deleteReservaById(id) {
        const data = await fs.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(data);
        const reservasActualizadas = jsonData.reservas.filter(reserva => reserva.id !== id);
        jsonData.reservas = reservasActualizadas;
        await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
    }

    static async findReservaByEmail(email) {
        const data = await fs.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(data);
        return jsonData.reservas.filter(reserva => reserva.email === email);
    }
}

module.exports = Reserva;