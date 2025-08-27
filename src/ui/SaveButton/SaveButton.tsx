import { useEffect, useState, type FC } from 'react';
import './SaveButton.scss'

interface SaveButtonProps {
    dog: string
}

export const SaveButton: FC<SaveButtonProps> = ({ dog }) => {

    const [save, setSave] = useState(false);

    const handleSave = () => {
        const savedItems = localStorage.getItem('savedDogs');
        let savedDogs = savedItems ? JSON.parse(savedItems) : [];

        if (!save) {
            savedDogs.push(dog);
            localStorage.setItem('savedDogs', JSON.stringify(savedDogs));
            setSave(true);
        } else {
            savedDogs = savedDogs.filter((savedDog: string) => savedDog !== dog);
            localStorage.setItem('savedDogs', JSON.stringify(savedDogs));
            setSave(false);
        }
    };

    useEffect(() => {
        const savedItems = localStorage.getItem('savedDogs');
        const savedDogs = savedItems ? JSON.parse(savedItems) : [];
        setSave(savedDogs.includes(dog));
    }, [dog]);

    return (
        <button onClick={handleSave} className="btn save-btn">
            {save ? 'Удалить из избранного' : 'Сохранить в избранное'}
        </button>
    )
}
