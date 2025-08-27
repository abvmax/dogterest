import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { dogsApi } from '../../redux/services/dogsApi'
import { generateRandomNumbers, handlerTop } from '../../utils/utils'
import { SkeletonList } from '../../ui/SkeletonList/SkeletonList';
import './DogsList.scss'
const LazyDogItem = React.lazy(() => import('../DogItem/DogItem'));

export const DogsList = () => {
    const { pathname } = useLocation();
    const itemsPerPage = 12;

    const [page, setPage] = useState(1);
    const [allDogs, setAllDogs] = useState<string[]>([]); // Весь массив
    const [dogs, setDogs] = useState<string[]>([]); // Только отображаемые
    const [hasMore, setHasMore] = useState(true);
    const loadingMore = useRef(false);
    const { data: dogsArrFromApi, isLoading, error, refetch } = dogsApi.useGetDogsQuery();
    const [noImagesMessage, setNoImagesMessage] = useState(false);

    // Генерируем случайные числа для лайков
    const randomNumbers = generateRandomNumbers(dogs.length, 1, 50);

    // Загрузка данных из localStorage 
    useEffect(() => {
        if (pathname === '/save') {
            const savedItems = localStorage.getItem('savedDogs');
            const savedDogs = savedItems ? JSON.parse(savedItems) : [];
            setAllDogs(savedDogs);
            setDogs(savedDogs);
            setHasMore(false);
            setNoImagesMessage(savedDogs.length === 0);
        } else {
            setAllDogs([]);
            setDogs([]);
            setHasMore(true);
            setNoImagesMessage(false);
        }
        setPage(1);
    }, [pathname]);

    // При получении данных с API сохраняем их в allDogs и dogs (только первые 12)
    useEffect(() => {
        if (pathname !== '/save' && dogsArrFromApi) {
            setAllDogs(dogsArrFromApi);
            setDogs(dogsArrFromApi.slice(0, itemsPerPage));
            setHasMore(dogsArrFromApi.length > itemsPerPage);
        }
        loadingMore.current = false;
    }, [dogsArrFromApi, itemsPerPage, pathname]);

    // Обработчик скролла для главной страницы
    const handleScroll = useCallback(() => {
        if (
            pathname !== '/save' &&
            window.innerHeight + document.documentElement.scrollTop + 100 >=
            document.documentElement.offsetHeight &&
            hasMore &&
            !isLoading &&
            !loadingMore.current
        ) {
            loadingMore.current = true;
            setPage((prevPage) => prevPage + 1);
        }
    }, [hasMore, isLoading, pathname]);

    useEffect(() => {
        if (pathname !== '/save') {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
        return undefined;
    }, [handleScroll, pathname]);

    // При изменении page увеличиваем dogs на 12 элементов из allDogs
    useEffect(() => {
        if (pathname !== '/save' && allDogs.length > 0) {
            const newCount = Math.min(page * itemsPerPage, allDogs.length);
            setDogs(allDogs.slice(0, newCount));
            setHasMore(newCount < allDogs.length);
        }
        loadingMore.current = false;
    }, [page, allDogs, itemsPerPage, pathname]);

    const handleRetry = () => {
        setPage(1);
        setAllDogs([]);
        setDogs([]);
        setHasMore(true);
        refetch();
        loadingMore.current = false;
    };

    return (
        <section className='dogs'>
            <div className="container">
                {isLoading && page === 1 && <SkeletonList />}
                {error &&
                    <div>
                        <h2 style={{ marginBottom: "10px" }}> Произошла ошибка</h2> <button className='btn btn-dark' onClick={handleRetry}>Обновить список</button>
                    </div>}
                {noImagesMessage && (
                    <div className="no-images-message">Изображения отсутствуют</div>
                )}
                <ul className='dogs__list'>
                    {dogs.map((dog, index) => (
                        <li className='dogs__item' key={index}>
                            <Suspense fallback={<SkeletonList />}>
                                <LazyDogItem dog={dog} randomNumber={randomNumbers[index]} />
                            </Suspense>
                        </li>
                    ))}
                </ul>
                {isLoading && page > 1 && <SkeletonList />}
                {!hasMore && <div className='dog__end'>Конец списка перейти в <button className='dogs__top' onClick={handlerTop}>начало списка</button></div>}
            </div>
        </section>
    );
};