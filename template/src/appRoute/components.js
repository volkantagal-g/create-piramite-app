import HelloWorld from '../partials/HelloWorld/HelloWorld';
import Deneme from '../partials/Deneme/Deneme';
import ROUTE_PATHS from './routeConstants';

const COMPONENTS = {
  [ROUTE_PATHS.HELLO_WORLD]: {
    fragment: HelloWorld,
    fragmentName: 'HelloWorld',
    name: 'HELLO_WORLD',
    status: 'dev',
    isMobileFragment: false,
    isPreviewQuery: false
  }
};

export default COMPONENTS;
