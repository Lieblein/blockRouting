export const MAIN_PAGE_ROUTE = 
process.env.NODE_ENV === 'production' ?
    'https://lieblein.github.io/blockRouting.github.io/build/'
    : '/';
export const SUB_PAGE_ROUTE = MAIN_PAGE_ROUTE + 'sub';
