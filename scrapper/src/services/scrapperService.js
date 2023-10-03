const puppeteer = require('puppeteer');
// const locateChrome = require('locate-chrome');
// const axios = require("axios")
const {executablePath} = require('puppeteer') 


const { generateScrapUrl, cleanTextContent } = require('../utils/index');
const constants = require('../constants/index');

const url = generateScrapUrl(constants.BASE_SCRAP_URL);

const scrapByCode = async (code) => {
    return ({
        "success": true,
        "data": {
            "name": "Tęstinių mokymų centras, UAB",
            "turnovers": {
                "2018": {
                    "Non-current assets": "25 582 €",
                    "Current assets": "20 934 €",
                    "Equity capital": "-109 796 €",
                    "Amounts payable and other liabilities": "183 937 €",
                    "Sales revenue": "170 020 €",
                    "Profit (loss) before taxes": "-45 784 €",
                    "Profit before taxes margin": "-26,93 %",
                    "Net profit (loss)": "-45 784 €",
                    "Net profit margin": "-26,93 %"
                },
                "2019": {
                    "Non-current assets": "25 084 €",
                    "Current assets": "22 380 €",
                    "Equity capital": "-194 780 €",
                    "Amounts payable and other liabilities": "250 090 €",
                    "Sales revenue": "168 662 €",
                    "Profit (loss) before taxes": "-84 984 €",
                    "Profit before taxes margin": "-50,39 %",
                    "Net profit (loss)": "-84 984 €",
                    "Net profit margin": "-50,39 %"
                },
                "2020": {
                    "Non-current assets": "16 699 €",
                    "Current assets": "109 750 €",
                    "Equity capital": "-235 524 €",
                    "Amounts payable and other liabilities": "359 213 €",
                    "Sales revenue": "244 998 €",
                    "Profit (loss) before taxes": "-40 744 €",
                    "Profit before taxes margin": "-16,63 %",
                    "Net profit (loss)": "-40 744 €",
                    "Net profit margin": "-16,63 %"
                },
                "2021": {
                    "Non-current assets": "29 611 €",
                    "Current assets": "321 188 €",
                    "Equity capital": "-109 121 €",
                    "Amounts payable and other liabilities": "434 945 €",
                    "Sales revenue": "680 957 €",
                    "Profit (loss) before taxes": "132 647 €",
                    "Profit before taxes margin": "19,48 %",
                    "Net profit (loss)": "126 403 €",
                    "Net profit margin": "18,56 %"
                },
                "2022": {
                    "Non-current assets": "36 225 €",
                    "Current assets": "624 519 €",
                    "Equity capital": "198 501 €",
                    "Amounts payable and other liabilities": "441 348 €",
                    "Sales revenue": "1 238 137 €",
                    "Profit (loss) before taxes": "343 918 €",
                    "Profit before taxes margin": "27,78 %",
                    "Net profit (loss)": "307 622 €",
                    "Net profit margin": "24,85 %"
                }
            },
            "description": {
                "Registration code": "301674916",
                "VAT": "LT100005638016",
                "Manager": "Tomas Kaulinskas",
                "Address": "Savanorių pr. 1-149 (18 aukštas) „Helios City“, LT-03116 Vilnius",
                "Mobile phone": "",
                "Email address": "Contact by emailContact by email with Tęstinių mokymų centrasSend                        function OnEmailRecaptchaSubmit(token) {                            document.formContactByEmail.submit();                        }                    Close ",
                "Website": "http://www.testiniaimokymai.ltUždaryti",
                "Facebook": "https://www.facebook.com/testiniaimokymai",
                "Account number": "LT157300010106908045",
                "Work hours": "08:00 - 17:00",
                "Employees": "18people (insured)",
                "Average salary": "2,261.22 € (2023-07) Salary history ›",
                "State social insurance contributions amount": "7,858.44 € (2023-07) ",
                "Sales revenue": "2022:1 238 137€Historical turnover ›",
                "Net profit": "2022:307 622 €More ›",
                "Transport": "2023-09: 2 cars (owns)More ›",
                "Trademarks": "1 active trademarkMore ›",
                "Share capital": "2,896.00 €",
                "Company age": "15 years 5 months 10 days",
                "Credit risk": "Low More ›",
                "Report": "Professional reportReport contains significant company-specific dataMore ›",
                "Rating": "\t\t\t\t\t\t\tfunction Rate(score)\t\t\t\t{\t\t\t\t\t$('.ggfbLogins span.alert').addClass('alert-warning');\t\t\t\t\t$('.ggfbLogins').removeClass('hidden').addClass('clicked').show();\t\t\t\t\treturn false;\t\t\t\t}\t\t\t\t$(document).ready(function(){\t\t\t\t\t$('.ggfbLogins').removeClass('hidden').hide();\t\t\t\t\t$('.ggfbLogins').each(function(){\t\t\t\t\t\tvar ggfbLogins = $(this);\t\t\t\t\t\tggfbLogins.parent().mouseover(function(){ if(!ggfbLogins.hasClass('clicked')) ggfbLogins.show(); });\t\t\t\t\t\tggfbLogins.parent().mouseout(function(){ if(!ggfbLogins.hasClass('clicked')) ggfbLogins.hide(); });\t\t\t\t\t});\t\t\t\t});\t\t\t\t\t\t123456789108.7 / 10 (votes 42) You can rate when you are signed in with Google or Facebook: Sign in with GoogleSign in with Facebook "
            }
        }
    });
    // const executablePath = await new Promise(resolve => locateChrome((arg) => resolve(arg))) || '';
    const browser = await puppeteer.launch({ 
        headless: true,
        executablePath: '/usr/bin/google-chrome',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // executablePath
        executablePath: executablePath(),
        // executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        // headless:false, 
        // userDataDir: './temp'
    })
    const page = await browser.newPage();
    
    /* loading search page base url */
    await loadUrl(page, url);
    
    /* initiating search and parsing the company link from searched item */
    const companyLink = await initiateSearchAndGetCompanyLink(page, code);
    
    /* load company details link */
    await loadUrl(page, generateScrapUrl(companyLink));

    const title = await getCompanyName(page); //parsing company name
    const description = await getCompanyDescription(page); //parsing company description
    
    /* load company turnover page */
    await loadUrl(page, generateScrapUrl(`${companyLink}turnover/`));

    const years = await getTurnoverYears(page); //parsing total number of years
    const labels = await getTurnoverLabels(page); //parsing labels from turnover table
    const values = await getTurnoverValues(page); //parsing values from turnover table

    const turnovers = formatTurnoverData(years, labels, values); //mapping year label and values of turnover

    await browser.close();
    response = {
        success: true,
        data: {
            name: title,
            turnovers,
            description
        }
    };
    return response;
}

const loadUrl = async (page, link) => {
    const pageResponse = await page.goto(link);
    if (pageResponse.status() !== 200) {
      const exception = new Error();
      exception.name = "scrape.do Error";
      exception.message = "scrape.do Error";
      exception.response = {
          status: pageResponse.status(),
          data: await pageResponse.json(),
      };
      throw exception;
    }
}

const initiateSearchAndGetCompanyLink = async (page, code) => {
    await page.waitForTimeout(2000);
    let modalButton = await page.$(constants.MODAL_CLOSE_BUTTON_SELECTOR);
    await modalButton.click();

    await page.$eval(
        constants.SEARCH_FORM_SELECTOR, 
        (el, value) => {
        el.innerHTML = el.innerHTML.replace(value.constants.BASE_SCRAP_URL, value.url);
        }, {url, constants}
    );
    await page.type(constants.CODE_INPUT_SELECTOR, code, { delay: 100 });

    /* initiate search */
    const searchButton = await page.$(constants.INITIATE_SEARCH_BUTTON_SELECTOR);
    searchButton.click();
    await page.waitForNavigation();
    /* ---- */

    /* closing modal popup */
    modalButton = await page.$(constants.MODAL_CLOSE_BUTTON_SELECTOR);
    await modalButton.click();
    /* ---- */

    const element = await page.$(constants.SEARCH_RESULT_ITEM_SELECTOR);
    
    /* throwing error if not search result found */
    if (!element) {
        const exception = new Error();
        exception.status = 404;
        exception.name = "Not found!";
        exception.message = "No record found!";
        throw exception;
    }
    /* ---- */
    
    /* parsing a tags from result item which will have the company details link as first item for sure. */
    const links = await element.$$(constants.ALL_A_TAG_SELECTOR);
    const propertyJsHandles = await Promise.all(
        links.map(handle => handle.getProperty(constants.HREF))
    );
    const hrefs2 = await Promise.all(
        propertyJsHandles.map(handle => handle.jsonValue())
    );
    /* ---- */

    return hrefs2[0];
}

const getCompanyName = async (page) => {
    const titleContainer = await page.$(constants.COMPANY_NAME_SELECTOR);
    const title = await page.evaluate(el => el.querySelector(".title").textContent, titleContainer);
    return cleanTextContent(title);
}

const getCompanyDescription = async (page) => {
    const descriptionTableRows = await page.$$(constants.COMPANY_DESCRIPTION_SELECTOR);
    let descResult = {};
    for (let i = 0; i < descriptionTableRows.length; i++) {
        const row = descriptionTableRows[i];
        const rowData = await page.evaluate((el, c) => {
        if (el.querySelector(c.COMPANY_DESCRIPTION_LABEL_SELECTOR)) {
            return [
                el.querySelector(c.COMPANY_DESCRIPTION_LABEL_SELECTOR).textContent, 
                el.querySelector(c.COMPANY_DESCRIPTION_VALUE_SELECTOR).textContent
            ];
        }
        return [];
        }, row, constants);
        if (rowData.length)
            descResult = { ...descResult, [cleanTextContent(rowData[0])]: cleanTextContent(rowData[1]) };
    }
    return descResult;
}

const getTurnoverYears = async (page) => {
    const yearHeaders = await page.$$(constants.COMPANY_TURNOVER_YEAR_SELECTOR);
    const years = [];
    for (let i = 0; i < yearHeaders.length; i++) {
        const yearEl = yearHeaders[i];
        const yearData = await page.evaluate((el) => {
        return el.textContent;
        }, yearEl);
        years.push(cleanTextContent(yearData));
    }
    return years;
}

const getTurnoverLabels = async (page) => {
    const financialLabels = await page.$$(constants.COMPANY_TURNOVER_LABEL_SELECTOR);
    const labels = [];
    for (let i = 0; i < financialLabels.length; i++) {
        const labelEl = financialLabels[i];
        const labelData = await page.evaluate((el) => {
        return el.textContent;
        }, labelEl);
        labels.push(cleanTextContent(labelData));
    }
    return labels;
}

const getTurnoverValues = async (page) => {
    const financialValues = await page.$$(constants.COMPANY_TURNOVER_VALUE_SELECTOR);
    const values = [];
    for (let i = 0; i < financialValues.length; i++) {
        const valueEl = financialValues[i];
        const valueData = await page.evaluate((el) => {
        return el.textContent;
        }, valueEl);
        values.push(cleanTextContent(valueData));
    }
    return values;
}

const formatTurnoverData = (years, labels, values) => {
    const turnovers = {};
    years.forEach((year, yearIdx) => {
        let temp = {};
        labels.forEach((label, labelIdx) => {
          const valIndex = yearIdx + (years.length * labelIdx);
          temp = {...temp, [label]: values[valIndex]};
        })
        turnovers[year] = temp;
      })
    return turnovers;
}

module.exports = {
    scrapByCode
}