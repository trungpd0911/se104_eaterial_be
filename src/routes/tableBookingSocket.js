const tableBookingService = require('../services/tableBookingService');

const actions = {
    BOOK_TABLE: 'BOOK_TABLE',
    CANCEL_TABLE: 'CANCEL_TABLE',
};

const configSocketIORoute = (io) => {
    io.on('connection', (socket) => {
        const user = socket.user;
        const id = user.id;
        const roomId = '' + id;
        // console.log(`New connection with ID: ${id}`);
        console.log('New connection with user info: ', user);

        socket.join(roomId);

        socket.on(actions.BOOK_TABLE, async (data) => {
            const tableId = data.table_id;
            const bookingTime = data.booking_time;

            console.log('booking: ', user.id, tableId, bookingTime);

            const res = await tableBookingService.bookTable(
                user.id,
                tableId,
                bookingTime,
            );

            io
                .to(roomId)
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

            console.log('booking: ', user.id, tableId);

            const res = await tableBookingService.cancelTable(user.id, tableId);

            console.log('res: ', res);

            io
                .to(roomId)
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