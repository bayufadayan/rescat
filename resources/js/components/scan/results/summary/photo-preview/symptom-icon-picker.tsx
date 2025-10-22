// deretan ikon (mata, hidung, dll)
import React from 'react';
import SymptomIcon from './symptom-icon';
import catIconData from '@/constants/cat-body-icon-data';

export default function SymptomIconPicker() {
    return (
        <div className='absolute bottom-0 flex flex-wrap w-full max-w-full justify-between bg-transparent px-3 py-4'>
            {catIconData.map((icon) => (
                <SymptomIcon key={icon.id}>
                    <img
                        src={icon.src}
                        alt={icon.alt}
                    />
                </SymptomIcon>
            ))}
        </div>
    )
}
