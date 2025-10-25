// src/constants/petcare-data.ts
export type Petcare = {
    name: string;
    address: string;
    phone?: string;
    lat?: number;
    lng?: number;
};

const petcares: Petcare[] = [
    {
        name: 'PetCare Harmoni',
        address: 'Jl. Harmoni No. 12, Jakarta Pusat',
        phone: '+62 812-8888-7777',
        lat: -6.1754,
        lng: 106.8272,
    },
    {
        name: 'Klinik Hewan Nusantara',
        address: 'Jl. Nusantara Raya No. 5, Depok',
        phone: '+62 813-2222-3333',
        lat: -6.39,
        lng: 106.8326,
    },
    {
        name: 'Vet Corner',
        address: 'Jl. Melati No. 7, Bandung',
        phone: '+62 821-4444-5555',
        lat: -6.9149,
        lng: 107.6098,
    },
];

export default petcares;
