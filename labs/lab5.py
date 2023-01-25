import time, datetime, re

#Function Definitions
#====== Lab 5 Problem 1 ======#
def birthdayGame():
    #Date pattern to match
    dateFormat = "%m/%d/%Y"

    #Get and validate user input
    print("What is your birthday? (mm/dd/yyyy)")
    bday = input()
    valid = False
    while (valid != True):
        try:
            epochBirthday = int(datetime.datetime.strptime(bday, dateFormat).timestamp())
            valid = True
        except:
            print("I\'m sorry, you did not provide a valid birthday in the expected format. Please try again.")
            bday = input()

    #Provide Output
    print("Calculating...")
    time.sleep(1)
    epochCurrentTime = int(time.time())
    ageInSeconds = epochCurrentTime - epochBirthday
    print("You are " + str(ageInSeconds) + " seconds old! Congratulations!")

#====== Lab 5 Problem 2 ======#
def wordCount():
    #List of vowels to match against
    vowelList = ["a", "e", "i", "o", "u"]

    #Get and valindate user input
    print("What word would you like to count?")
    word = input()
    valid = False
    while (valid != True):
        if ((len(word) < 1) or (re.search("[^A-Za-z]+", word) != None)): #Word length < 1 or contains non-letter chars
            print("That is not a real word! Please try again.")
            word = input()
        else:
            valid = True

    #Determine status of "y"
    if ('y' in word.lower()):
        print("Do you consider \"y\" a vowel in this word? [y/n]:")
        isVowel = input()
        valid = False
        while (valid != True):
            try:
                isVowel = str(isVowel).lower().strip()
                if (isVowel == "y" or isVowel == "yes"):
                    vowelList.append("y")
                    valid = True
                elif (isVowel == "n" or isVowel == "no"):
                    valid = True
                else:
                    print("You did not respond with \"(y)es\" or \"(n)o\"! Please try again. [y/n]:")
                    isVowel = input()
            except:
                print("You did not provide a valid string! Please try again. [y/n]:")
                isVowel = input()
    
    vowelCount = 0
    for letter in word:
        if letter in vowelList:
            vowelCount = vowelCount + 1
    consonantCount = len(word) - vowelCount
    print("The word \"%s\" contains %s consonants and %s vowels." %(word, consonantCount, vowelCount))

#====== Lab 5 Problem 3 ======#
def primeCount():
    print("primeCount")

#====== Lab 5 Problem 4 ======#
def guessTheNumber():
    print("guessTheNumber")

#List function options
print("Select your preferred function from the options below:")
print("1. BirthdayCalculation")
print("2. WordCount")
print("3. PrimeCount")
print("4. GuessTheNumber")

#Validate user input
userInput = input()
valid = False
while (valid != True):
    try:
        gameChoice = int(userInput)
        if (gameChoice > 4 or gameChoice < 1):
            print("That was not one of the options! Please make a new selection.")
            userInput = input()
        else:
            valid = True
    except:
        print("That was not a number! Please make a new selection.")
        userInput = input()
print("You selected option %s. Starting..." %gameChoice)

#Call appropriate function
if gameChoice == 1:
    birthdayGame()
elif gameChoice == 2:
    wordCount()
elif gameChoice == 3:
    primeCount()
elif gameChoice == 4:
    guessTheNumber()
else:
    print("Oops, something went wrong! Please try again.")




    


