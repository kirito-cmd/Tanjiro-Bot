let users = {};

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [eleccion, cantidad] = text.split(' ');
    if (!eleccion || !cantidad) {
        return m.reply(`❤️‍🔥 Por favor, elige cara o cruz y una cantidad de moras para apostar.\nEjemplo: *${usedPrefix + command} cara 50*`);
    }

    eleccion = eleccion.toLowerCase();
    cantidad = parseInt(cantidad);
    if (eleccion !== 'cara' && eleccion !== 'cruz') {
        return m.reply(`❤️‍🔥 Elección no válida. Por favor, elige cara o cruz.\nEjemplo: *${usedPrefix + command} cara*`);
    }

    if (isNaN(cantidad) || cantidad <= 0) {
        return m.reply(`❤️‍🔥 Cantidad no válida. Por favor, elige una cantidad de moras para apostar.\nEjemplo: *${usedPrefix + command} cara 50*`);
    }

    let userId = m.sender;
    if (!users[userId]) users[userId] = { moras: 100 };
    let user = global.db.data.users[m.sender];
    if (user.moras < cantidad) {
        return m.reply(`❤️‍🔥 No tienes suficientes moras para apostar. Tienes ${user.moras} moras.`);
    }

    let resultado = Math.random() < 0.5 ? 'cara' : 'cruz';
   let mensaje = `⭐️ La moneda ha caído en `
    if (resultado === eleccion) {
        user.moras += cantidad; 
    mensaje += `*${resultado}* y has ganado *${cantidad} moras*!`;
    } else {
        user.moras -= cantidad;
        mensaje += `*${resultado}* y has perdido *${cantidad} moras*!`;
    }

    await conn.reply(m.chat, mensaje, m);
};

handler.help = ['cf'];
handler.tags = ['fun'];
handler.command = ['cf', 'caracruz'];

export default handler;