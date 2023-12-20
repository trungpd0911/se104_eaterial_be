const tableBookingService = require('../services/tableBookingService');

const actions = {
    BOOK_TABLE: 'BOOK_TABLE',
    CANCEL_TABLE: 'CANCEL_TABLE',
};

const configSocketIORoute = (io) => {
    io.on('connection', (socket) => {
        const user = socket.user;
        const id = user.id;
        // console.log(`New connection with ID: ${id}`);
        console.log('New connection with user info: ', user);

        socket.join(id);

        socket.on(actions.BOOK_TABLE, async (data) => {
            const tableId = data.table_id;
            const bookingTime = data.booking_time;

            const res = await tableBookingService.bookTable(
                user.id,
                tableId,
                bookingTime,
            );

            socket
                .to(id)
                .emit(res.toClient.message, {
                    table_id: res.toClient.table_id,
                });
            if (res.broadcast) {
                socket.broadcast.emit(res.broadcast.message, {
                    table_id: res.broadcast.table_id,
                });
            }
        });

        socket.on(actions.CANCEL_TABLE, async (data) => {
            const tableId = data.table_id;

            const res = await tableBookingService.cancelTable(user.id, tableId);

            socket
                .to(id)
                .emit(res.toClient.message, {
                    table_id: res.toClient.table_id,
                });
            if (res.broadcast) {
                socket.broadcast.emit(res.broadcast.message, {
                    table_id: res.broadcast.table_id,
                });
            }
        });

        socket.on('disconnect', () => {
            console.log(`Disconnection of user with info: ${id}`);
        });
    });
}

module.exports = { configSocketIORoute }