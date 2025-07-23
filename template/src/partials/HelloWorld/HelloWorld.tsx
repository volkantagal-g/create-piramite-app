import React from 'react';
import classNames from 'classnames';

import appConfig from '../../appConfig';
import ROUTE_PATHS from '../../appRoute/routeConstants';

import Logo from '../../assets/images/Logo.svg';

import style from './HelloWorld.scss';

const piramite = require('@piramite/core');

function HelloWorld({ initialState }) {
  return (
    <div className={classNames(style.root)}>
      <div className={classNames(style.container)}>
        <Logo />
        <h1>Welcome to the piramiteJS</h1>

        <span>Hello World! It is a Micro Frontend Library</span>
        <img
          className={style.piramite}
          src={`${appConfig.mediaUrl}/images/piramite.png`}
          alt="Piramite"
        />
      </div>
    </div>
  );
}

const component = piramite.default.withBaseComponent(HelloWorld, ROUTE_PATHS.HELLO_WORLD);

// component.services = [piramite.default.SERVICES.piramiteapi]

/* component.getInitialState = (piramiteApiClientManager, context) => {
  return piramiteApiClientManager.get('/product').execute().then(response => response.data);
}; */

export default component;
