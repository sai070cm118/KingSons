export const AppConfig = Object.freeze({
    APP_KEY: '0e7qXCCDOauT7YfOlLqO9gLhqy7hyEm5jkhQuuf3SpLuJpkjiPHaIPOcSYAjFeOJ',
    BASE_URL: 'http://www.kingsons.somee.com/',
    get BASE_API_URL() { return this.BASE_URL + 'api/'; },
    Login_URL: 'whatsis/Login',
    Home_URL: 'Home',
    Dashboard_URL: 'Home/Dashboard',
    HeaderHeight: 55,
    FooterHeight: 22,
    BreadcomHeight: 35,
    GridHeaderHeight: 43,
    LayoutMarginHeight: 105,
    PAGESIZE: 10,
    PAGENO: 1,
    PAGESIZES: [10, 50, 100, 1000]

});
