var handler = async (m, { conn, args }) => {

let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
conn.reply(m.chat, '> aqui tienes el link del grupo :3\n\n' + link, m, rcanal, { detectLink: true })

}
handler.help = ['link']
handler.tags = ['grupo']
handler.command = ['link','linkgroup']

handler.group = true
handler.botAdmin = true

export default handler
