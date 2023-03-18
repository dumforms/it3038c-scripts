import re

data = "Hello. My email is dumforms@mail.uc.edu. Please contact me!"

c = re.compile("[A-Za-z0-9%.-]+@[A-Za-z0-9%.-]+\.[A-Za-z0-9]{2,}")

print(c.search(data).group())
