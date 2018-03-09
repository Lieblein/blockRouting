const BASE_URL = process.env.NODE_ENV === 'production' ?
    'lieblein.github.io/blockRouting/build/'
    : '/';

const MAIN_PAGE_ROUTE = '/';
const SUB_PAGE_ROUTE = MAIN_PAGE_ROUTE + 'sub';

module.exports = {
    BASE_URL,
    MAIN_PAGE_ROUTE,
    SUB_PAGE_ROUTE
};

