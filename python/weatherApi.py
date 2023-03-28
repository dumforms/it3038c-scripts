import json
import requests

print("Please enter your zip code:")
zip = input()

r = requests.get("http://api.openweathermap.org/data/2.5/weather?zip=%s,us&appid=b094d36e32f891b6ebed2d56824adf0a" % zip)
data = r.json()

print(data["weather"][0]["description"])