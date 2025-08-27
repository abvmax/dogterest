import { Link } from "react-router-dom";
import './NotFound.scss'

export const NotFound = () => {
  return (
    <section className="not-page">
      <div className="container">
        <div className="not-page__wrap">
          <h2 className="not-page__title">Ошибка 404</h2>
          <p className="not-page__text">Страница не найдена</p>
          <Link className="btn not-page__btn" to={'/'}> вернуться на главную страницу</Link>
        </div>

      </div>
    </section>

  );
}
