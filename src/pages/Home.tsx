import React from 'react';
// import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { menu } from '../components/Sort';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selector';
import { selectPizzaData } from '../redux/pizza/selector';
import { setCategoryIndex, setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncAction';
// import { SearchPizzaParams } from '../redux/pizza/types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { categoryIndex, sort, currentPage, searchValue } = useSelector(selectFilter);
  // const sortIndex = useSelector((state) => state.filter.sort.sortProperty);
  // const currentPage = useSelector((state) => state.filter.currentPage);
  const { pizzaItems, status } = useSelector(selectPizzaData);
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onClickCategory = React.useCallback((index: number) => {
    dispatch(setCategoryIndex(index));
  }, []);
  // const onClickCategory = (index: number) => {
  //   dispatch(setCategoryIndex(index));
  // };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryIndex > 0 ? `category=${categoryIndex}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({ sortBy, order, category, search, currentPage: String(currentPage) }));

    window.scrollTo(0, 0);
  };

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryIndex: categoryIndex > 0 ? categoryIndex : null,
  //       currentPage,
  //     });

  //     navigate(`/?${queryString}`);
  //   }

  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams));
  //   }

  //   // isMounted.current = true;
  // }, [categoryIndex, sort.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    // isSearch.current = false;
  }, [categoryIndex, sort.sortProperty, searchValue, currentPage]);

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = menu.find((obj) => obj.sortProperty === params.sortBy);
  //     // if (sort) {
  //     //   params.sortBy = sort;
  //     // }
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryIndex: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || menu[0],
  //       }),
  //     );
  //   }
  //   isSearch.current = true;
  // }, []);

  const pizzas = pizzaItems.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skelet = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryIndex} onClickCategory={onClickCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="cart cart--empty">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>
            К сожалению не удалось подгрузить каталог пицц.
            <br />
            Попробуйте повторить попытку позже.
          </p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skelet : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
