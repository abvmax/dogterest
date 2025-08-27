import './SkeletonList.scss'

export const SkeletonList = () => {

    return (
        <div className='skeleton'>
            <ul className="skeleton__list">
                <li className='skeleton__item'></li>
                <li className='skeleton__item'></li>
                <li className='skeleton__item'></li>
                <li className='skeleton__item'></li>
                <li className='skeleton__item'></li>
                <li className='skeleton__item'></li>
                <li className='skeleton__item'></li>
                <li className='skeleton__item'></li>
            </ul>
        </div>

    )
}

