const BASE_SCRAP_URL = 'https://rekvizitai.vz.lt/en/company-search/1/';

// Selectors
const MODAL_CLOSE_BUTTON_SELECTOR = '#cookiescript_close';
const SEARCH_FORM_SELECTOR = '#divSearchForm';
const CODE_INPUT_SELECTOR = '#code';
const SEARCH_RESULT_ITEM_SELECTOR = '.highlighted';
const INITIATE_SEARCH_BUTTON_SELECTOR = '#ok';
const COMPANY_NAME_SELECTOR = '#rekvizitai-app > div > div:nth-child(2) > div > main > div.block.p-0 > div.top-info.p-0 > div > div.name.d-md-block';
const COMPANY_DESCRIPTION_SELECTOR = 'tr';
const COMPANY_DESCRIPTION_LABEL_SELECTOR = '.name';
const COMPANY_DESCRIPTION_VALUE_SELECTOR = '.value';
const COMPANY_TURNOVER_YEAR_SELECTOR = '#rekvizitai-app > div > div:nth-child(2) > div > main > div.block.p-0 > div.mid-info.company > div.finances-summary.p-0 > div.finances-block.pb-0 > table > thead > tr > th.years';
const COMPANY_TURNOVER_LABEL_SELECTOR = '#rekvizitai-app > div > div:nth-child(2) > div > main > div.block.p-0 > div.mid-info.company > div.finances-summary.p-0 > div.finances-block.pb-0 > table > tbody > tr > td:not(.year-value)';
const COMPANY_TURNOVER_VALUE_SELECTOR = '#rekvizitai-app > div > div:nth-child(2) > div > main > div.block.p-0 > div.mid-info.company > div.finances-summary.p-0 > div.finances-block.pb-0 > table > tbody > tr > td.year-value';
const ALL_A_TAG_SELECTOR = 'a';
const HREF = 'href';


module.exports = {
    BASE_SCRAP_URL,
    MODAL_CLOSE_BUTTON_SELECTOR,
    SEARCH_FORM_SELECTOR,
    CODE_INPUT_SELECTOR,
    SEARCH_RESULT_ITEM_SELECTOR, 
    INITIATE_SEARCH_BUTTON_SELECTOR,
    COMPANY_NAME_SELECTOR,
    COMPANY_DESCRIPTION_SELECTOR,
    COMPANY_DESCRIPTION_LABEL_SELECTOR,
    COMPANY_DESCRIPTION_VALUE_SELECTOR,
    COMPANY_TURNOVER_YEAR_SELECTOR,
    COMPANY_TURNOVER_LABEL_SELECTOR,
    COMPANY_TURNOVER_VALUE_SELECTOR,
    ALL_A_TAG_SELECTOR,
    HREF,
}
