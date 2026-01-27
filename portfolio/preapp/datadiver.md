# Datadiver
In the E-Commerce space, many platforms and markets come with some sort of analytics or business insights dashboard built into their system. Most modern frameworks allow you to pull that report data from their respective API, but some are only available as downloads from those respective analytics/insights dashboards. We needed a way to automate getting that data, parsing it, and feeding it into our other systems for consumption. This is what Datadiver was built to do.

The main tools and technologies used are:
- Laravel
- Python Selenium
- MySQL
- Docker

## Design
To achieve this goal, we built a custom middleman application that was able to store credentials for individual store fronts. Using those credentials, we built custom workers that would utilize Selenium Python to simulate a user, log into those admin portals, download the relevant data, and return it to Datadiver to be extracted, transformed, and then loaded to our ERP or Database as necessary for centralizing that data.

![Diagram of Datadiver](/assets/preapp/datadiver.png)

## Example Code for the Selenium Scraper
The key to this is building Python scripts that can leverage Selenium Webdriver, Beautiful Soup, and other packages to simulate a user logging in and interacting with the admin portal of choice. When calling these Python scripts, the Datadiver job dispatcher calls a helper function to go in and build all the necessary parameters for retrieving a specific type of data. Once it calls the Python script, it has already been passed all the necessary parameters to return that data.

Here is the class initialization. 
```py
from selenium import webdriver
from selenium.webdriver import DesiredCapabilities

class SeleniumScraper:
    # Class Constant: Login Page
    login_path = 'LOGIN URL PATH HERE'

    # Class Constant: Pathway for Paged Data
    paged_path = 'PAGED DATA URL PATH HERE'

    # Class Constant: Pathway for Table Data From Post Request
    table_path = 'TABLE DATA URL PATH HERE'

    # Class Constant: Pathway for Paged Data with Checkbox Form for Viewing Data
    checkbox_path = 'CHECKBOX FORM URL PATH HERE'

    # Constructor Method
    def __init__(self, json_vars):
        try:
            inputs = json.loads(json_vars)

            # Initialize driver first because Destructor Method always ensures that driver will quit
            # Throws an Error if Class Instance is destroyed before Driver is set
            self.driver = webdriver.Remote(command_executor='http://selenium:4444/wd/hub', desired_capabilities=DesiredCapabilities.CHROME.copy())

            # Validate/Verify Input
            self.__validate_input(inputs)

            # Set Instance variables
            self.csv_type = inputs['csv_type']
            self.username = inputs['username']
            self.password = inputs['password']

        except:
            exc_type, exc_value, exc_traceback = sys.exc_info()
            self.driver.quit()
            print(json.dumps({"err_type": exc_type.__name__,"err_msg": str(exc_value)}))
            exit()
```

Here is the get report data function. From the `csv_type`, the scraper will access different key locations and interact to get the report data desired.
```py
# Method for calling and retrieving data from CSV Endpoints
def get_report_data(self):
    try:
        if self.csv_type == 'paged':
            self.__login_and_verify_credentials()
            data = self.__get_data_from_paged_table()
        elif self.csv_type == 'checkbox':
            self.__login_and_verify_credentials()
            data = self.__get_data_from_checkbox_form()
        else:
            self.__login_and_verify_credentials()
            data = self.__get_data_from_table_post_request()
        return data
    except:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        return(json.dumps({"err_type": exc_type.__name__, "err_msg": str(exc_value)}))
```

Here's an example of one of these report gathering methods. This one submits a form and scrapes the response page for relevant table data, and then returns that data in json format. In order to "trick" the site into accepting our post request, we simply copy over our cookies from the Selenium webdriver to our Session, and submit the request that way.
```py
# Helper Method for getting hourly data
def __get_data_from_table_post_request(self):
    cookies = self.driver.get_cookies()
    s = requests.Session()
    for cookie in cookies:
        s.cookies.set(cookie['name'], cookie['value'])
    payload = {'Payload for POST request'}
    response = s.post(self.table_path, data=payload)
    soup = BeautifulSoup(response.content, 'lxml')
    table = soup.find('table')
    df = pd.read_html(str(table))
    return df[0].to_json(orient='values')
```

Here is the main method. Simply creates an instance of the Scraper with all of its args preloaded in, gets the report data based on it's input, and then deletes itself and returns the data it pulled.
```py
# Main Method
def main(args):
    scraper = SeleniumScraper(args)
    data = scraper.get_report_data()
    del scraper
    return data
```

## Outcomes
For our use case, this is a solution that worked. It did require manual maintenance to help the scraper when it encountered errors. These platforms change their layouts and dashboards somewhat regularly, and additionally, the issue of 2FA was a difficult to overcome task. There can be many improvements made to this, including abstracting the login/path navigation away from the class and instead in modules that could be more easily edited.

However, while this was not a perfect solution, this application automated two key business functions:

1. Manually logging into to all (4+) business dashboards and downloading the relevant data.
2. Parsing and translating that data into a format that can be compared readily and easily across all our different dashboards.

In this way, we saved an average of 2-3 hours of tedious busywork downloading the data, transforming it into a more easily comparable format, and then uploading it to our centralized location. However, the most beneficial outcome was that our analysts and leadership teams were able to make data driven decisions on a daily basis without having to wait for that busywork to be completed.

Here's a link to the Github Repository with the Scraper examples I built.
- [Github Link](https://github.com/ahirota/python-scraper-example)