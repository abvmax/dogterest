import './Header.scss'
import logo from '../../assets/img/logo.png'
import { Navigation } from '../Navigation/Navigation'

export const Header = () => {
    return (
        <header className='header'>
            <div className='header__container'>
                <div onClick={() => window.location.href = '/'} className="header__block">
                    <img className='header__logo' src={logo} alt="logo" />
                    <h1 className='header__title'>
                        dogs
                    </h1>
                </div>
                <Navigation />
            </div>
        </header>
    )
} 