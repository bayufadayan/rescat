// src/data/vet-contacts.ts
export type VetContact = {
    name: string;
    phone: string;
    clinic: string;
};

const vetContacts: VetContact[] = [
    { name: 'Sibra Aljawir',     phone: '+62 812-3456-7890', clinic: 'Klinik Hewan Sejahtera' },
    { name: 'Dr. Arman Mau',     phone: '+62 813-1111-2222', clinic: 'Praktik Dokter Hewan Arman' },
    { name: 'Siti Lestari',      phone: '+62 821-3333-4444', clinic: 'Klinik Kucing & Anjing Siti' },
    { name: 'Dr. Dari Us',       phone: '+62 838-5555-6666', clinic: 'Klinik Hewan Bima' },
    { name: 'Pli Sumawijaya',    phone: '+62 819-7777-8888', clinic: 'Praktik Dokter Hewan Rina' },
    { name: 'Dr. Hendra Saputra',phone: '+62 811-9999-0000', clinic: 'Animal Care Hendra' },
];

export default vetContacts;
