from bs4 import BeautifulSoup
import requests, re

dataSource = "https://msdumford.tplinkdns.com/resources.html"
data = requests.get(dataSource).content
soup = BeautifulSoup(data, "html.parser")

HTTPSLinks = soup.findAll("a", {"href":re.compile("https?")})
downloadLinks = soup.findAll("a", {"href":re.compile("download")})
otherWebLinks = []
for link in HTTPSLinks:
	if (link.get("href").find("download") == -1):
		otherWebLinks.append(link)
mailToLinks = soup.findAll("a", {"href":re.compile("mailto")})


print("The webpage %s contains %s web links:" %(dataSource, (len(HTTPSLinks) + len(mailToLinks))))
print("\t%s download links:" %(len(downloadLinks)))
for link in downloadLinks:
	print("\t - " + link.get("href"))
print("\t%s other web links:" %(len(otherWebLinks)))
for link in otherWebLinks:
	print("\t - " + link.get("href"))
print("\t%s mail links:" %(len(mailToLinks)))
for link in mailToLinks:
	print("\t - " + link.get("href"))
