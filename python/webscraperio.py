from bs4 import BeautifulSoup
import requests, re

# r = requests.get("http://webscraper.io/test-sites/e-commerce/allinone/phones").content
# soup = BeautifulSoup(r, 'html.parser')
#
# tags = soup.findAll("div", {"class":re.compile("(ratings)")})
# for p in tags:
# 	a = p.findAll("p", {"class":"pull-right"})
# 	print(a[0].string)

data = requests.get("https://www.reebok.com/us/flexagon-energy-shoes---preschool/DV8354.html").content
soup = BeautifulSoup(data, "html.parser")
temp = soup.find("h1", {"class":"product_information_title___2rG9M product_title gl-heading gl-heading--m"})
title = temp.text
temp = soup.find("div", {"class":"gl-price-item notranslate"})
price = temp.text

print("Item %s has price %s" %(title, price))
