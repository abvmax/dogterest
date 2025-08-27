import { useState, type FC } from 'react';
import svg from "../../assets/img/sprite.svg";
import './LikeButton.scss'

interface LikeButtonProps {
    randomNumber: number
}

export const LikeButton: FC<LikeButtonProps> = ({ randomNumber }) => {

    const [counter, setCounter] = useState(randomNumber);
    const [like, setLike] = useState(false);

    const incrementCounter = () => {
        setCounter(counter + 1);
        setLike(true)
    };

    const decrementCounter = () => {
        setCounter(counter - 1);
        setLike(false)
    };

    return (
        <div className="btn-like">
            <button style={like ? { display: 'none' } : { display: 'block' }} onClick={incrementCounter}>
                <svg className="btn-like__on" width="24" height="24">
                    <use xlinkHref={`${svg}#like`}></use>
                </svg>
            </button>
            <button style={like ? { display: 'block' } : { display: 'none' }} onClick={decrementCounter}>
                <svg className="btn-like__off" width="24" height="24">
                    <use xlinkHref={`${svg}#like`}></use>
                </svg>
            </button>
            {counter}
        </div>

    )
}