// src/lib/phone.ts
/**
 * Hasil:
 * - tel: string numerik (tanpa +), contoh "6281234567890"
 * - wa:  string numerik internasional tanpa + juga, contoh "6281234567890"
 */
export function normalizePhone(raw: string) {
    // buang semua non-digit
    const digits = (raw || '').replace(/\D+/g, '');

    // kasus:
    // "0812..."  -> "62812..."
    // "62..."    -> "62..."
    // "+62..."   -> sudah terbuang '+' jadi "62..."
    // "812..."   -> anggap "62" + "812..."
    let intl = digits;
    if (digits.startsWith('0')) {
        intl = '62' + digits.slice(1);
    } else if (digits.startsWith('62')) {
        intl = digits;
    } else {
        // fallback: kalau tidak 0/62, prepends 62
        intl = '62' + digits;
    }

    return {
        tel: intl, // untuk href tel, kebanyakan browser terima "tel:62812..."
        wa: intl, // untuk wa.me
    };
}
