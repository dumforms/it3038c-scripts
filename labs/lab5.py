import time, datetime, re, math, random

#Function Definitions
#====== Lab 5 Problem 1 ======#
def birthdayGame():
    #Date pattern to match
    dateFormat = "%m/%d/%Y"

    #Get and validate user input
    bday = input("What is your birthday? (mm/dd/yyyy): ")
    valid = False
    while (valid != True):
        try:
            epochBirthday = int(datetime.datetime.strptime(bday, dateFormat).timestamp())
            valid = True
        except:
            bday = input("I\'m sorry, you did not provide a valid birthday in the expected format. Please try again: ")

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
    word = input("Enter the word you would like to count: ")
    valid = False
    while (valid != True):
        if ((len(word) < 1) or (re.search("[^A-Za-z]+", word) != None)): #Word length < 1 or contains non-letter chars
            word = input("That is not a real word! Please enter a word: ")
        else:
            valid = True

    #Determine status of "y"
    if ('y' in word.lower()):
        isVowel = input("Do you consider \"y\" a vowel in this word? [y/n]: ") #Yes-no response code inspired by: https://gist.github.com/garrettdreyfus/8153571
        valid = False
        while (valid != True):
            try:
                isVowel = str(isVowel).lower()
                if (isVowel == "y" or isVowel == "yes"):
                    vowelList.append("y")
                    valid = True
                elif (isVowel == "n" or isVowel == "no"):
                    valid = True
                else:
                    isVowel = input("You did not respond with \"(y)es\" or \"(n)o\"! Please try again. [y/n]: ")
            except:
                isVowel = input("You did not provide a valid string! Please try again. [y/n]: ")
    
    vowelCount = 0
    for letter in word:
        if letter in vowelList:
            vowelCount = vowelCount + 1
    consonantCount = len(word) - vowelCount
    print("The word \"%s\" contains %s consonants and %s vowels." %(word, consonantCount, vowelCount))

#====== Lab 5 Problem 3 ======#
#Untility fucntion to check if a number is prime. Code inspired by https://www.mygreatlearning.com/blog/prime-numbers-program-in-python/
def isPrime(num):
    end = int(math.sqrt(num) + 1)
    for i in range(2, end):
        if (num%i == 0):
            return False
    return True
    
#Core function
def primeCount():
    #Get and validate user input
    userNum = input("Enter your number: ")
    valid = False
    while (valid != True):
        try:
            userNum = int(userNum)
            valid = True
        except:
            userNum = input("You did not provide a number! Please enter a number: ")
    
    #Catch small edgecase (0 and 1 are not technically prime)
    if (userNum <= 2):
        print("There are no prime numbers between 0 and %s." %userNum)
    else:
        #Print and count prime numbers
        primeCount = 0
        for num in range(2, userNum):
            if (isPrime(num)):
                print(str(num))
                primeCount = primeCount + 1
        print("There are %s prime numbers between 0 and %s." %(primeCount, userNum))

#====== Lab 5 Problem 4 ======#
def guessTheNumber():
    #Get and validate guess limit
    ceiling = input("So you want to play a game! Please enter the biggest number I am allowed to guess: ")
    valid = False
    while (valid != True):
        try:
            ceiling = int(ceiling)
            valid = True
        except:
            ceiling = input("You did not provide a number! Please enter a number: ")
    
    #Set guess parameters
    print("Picking my guess...")
    time.sleep(1)
    target = random.randrange(0, ceiling)
    numberOfGuesses = 1

    #Get, validate, and check user guess
    userGuess = input("Ok, I picked a number! What is your guess: ")
    valid = False
    #Outer loop + try/except catches non-integer inputs
    while (valid != True):
        try:
            #Inner loop provides guess feedback and gets next guess
            while (int(userGuess) != target):
                if (int(userGuess) > target):
                    userGuess = input("Too high! Try again: ")
                    numberOfGuesses = numberOfGuesses + 1
                else:
                    userGuess = input("Too low! Try again: ")
                    numberOfGuesses = numberOfGuesses + 1
            #Breaks outer loop when guess is correct
            valid = True
            #Feedback on correct guess
            if (numberOfGuesses == 1):
                print("Wow, first try! You didn't cheat, did you?")
            else:
                print("Congratulations! You guessed my number after %s trys!" %numberOfGuesses)
        except:
            if (userGuess == "cheat"):
                userGuess = input("I guessed " + str(target) + ", but you're not supposed to know that! What is your guess: ")
            else:
                userGuess = input("You did not provide a number! Please enter a number: ")

#====== Main Program Starts Here ======#
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
            userInput = input("That was not one of the options! Please make a new selection: ")
        else:
            valid = True
    except:
        userInput = input("That was not a number! Please make a new selection: ")
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




    


