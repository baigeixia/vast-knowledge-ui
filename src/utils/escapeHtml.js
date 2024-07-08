// export  const escapeHtml = (unsafe) => {
//     return unsafe.replace(/[&<>"'`=/]/g, match => ({
//         '&': '&amp;',
//         '<': '&lt;',
//         '>': '&gt;',
//         '"': '&quot;',
//         '\'': '&#39;',
//         '`': '&#96;',
//         '=': '&#61;',
//         '/': '&#47;'
//     }[match]));
// }

export const escapeHtml = (unsafe) => {
    return unsafe.replace(/[&<"']/g, match => ({
        '&': '&amp;',
        '<': '&lt;',
        '"': '&quot;',
        '\'': '&#39;'
    }[match]));
}
