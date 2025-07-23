import React, {useState} from 'react';
import classNames from 'classnames';

import ROUTE_PATHS from '../../appRoute/routeConstants';

import Heart from '../../assets/images/heart.svg';
import HeartActive from '../../assets/images/heart-active.svg';

import style from './deneme.scss';

const piramite = require('@piramite/core');

function Deneme({ initialState }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSetFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={style.favorite} onClick={handleSetFavorite}>
      {isFavorite && (
        <>
          <HeartActive width="32" height="32" fill="red" /> Favorilere Ekle
        </>
      )}

      {!isFavorite && (
        <>
          <Heart width="32" height="32" /> Favorilere Ekle
        </>
      )}
    </div>
  );
}

const component = piramite.default.withBaseComponent(Deneme, ROUTE_PATHS.DENEME);

// component.services = [piramite.default.SERVICES.piramiteapi]

/* component.getInitialState = (piramiteApiClientManager, context) => {
  return piramiteApiClientManager.get('/product').execute().then(response => response.data);
}; */

export default component;
