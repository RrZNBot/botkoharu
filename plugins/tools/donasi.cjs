var handler = async m => m.reply(`
╭─「 Donasi 」
│ • DANA [085892728039]
│ • GOPAY [tidak terdaftar]
│ • OVO [085892728039]
╰────
╭─「 Hubungi 」
│ > wa.me/6285892728039 (Zii)
╰────
`.trim()) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['']
handler.command = /^dona(te|si)$/i

module.exports = handler