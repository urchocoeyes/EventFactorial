import requests
from bs4 import BeautifulSoup


def remove_spaces_and_convert_to_integer(input_string):
    result = ""
    for i in input_string:
        if i == '-':
            break
        if i.isdigit():
            result += i
    result = int(result)
    return result


# Function to fetch and parse the main page
def parse_main_page(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        # Extract product links from the main page
        product_links = [link.get('href') for link in soup.find_all('a', class_='impression-card-title')]
        product_names = [str(link.get_text())[9:-6] for link in soup.find_all('a', class_='impression-card-title')]
        return product_links, product_names
    else:
        print("Failed to fetch main page.")
        return []
    

# Function to fetch and parse individual product page
def parse_product_page(product_url):
    response = requests.get(product_url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        # Extract product information from the product page
        print(product_url)
        s = 0
        for i in soup.find_all('div', class_='event_date_block'):
            s += 1
        if s == 0:
            return
        product_date = soup.find_all('div', class_='event_date_block')[0].get('data-date').strip()
        product_price = soup.find_all('div', class_='str bold')[0].text.strip()
        product_location = soup.find_all('div', class_='text')[0].text.strip()
        content = soup.find('div', class_='content_wrapper')
        product_description = ""
        for i in content.find_all('p'):
            product_description += i.text.strip()
        # Extract additional info or perform other parsing as needed
        # Example: product_description = soup.find('div', class_='product-description').text.strip()
        
        # Return product information
        return {'date': product_date, 'price': remove_spaces_and_convert_to_integer(product_price), 'location': product_location, 'description': product_description}
    else:
        print(f"Failed to fetch product page: {product_url}")
        return None


# Main function to orchestrate parsing
def main():
    main_page_url = 'https://sxodim.com/almaty/'
    product_links, product_names = parse_main_page(main_page_url)
    print(product_links)
    print(product_names)
    if product_links:
        for link in product_links:
            product_info = parse_product_page(link)
            if product_info:
                print(product_info)

                
if __name__ == "__main__":
    main()