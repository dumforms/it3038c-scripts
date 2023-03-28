import json
import requests

r = requests.get("http://localhost:3000/")
data = r.json()

for widget in data:
    name = widget["name"]
    color = widget["color"]
    print("%s is %s" % (name, color))