import time, datetime

#Function Definitions
def birthdayGame():
    #Date pattern to match
    dateFormat = "%m/%d/%Y"

    #Get and validate input
    print("What is your birthday? (mm/dd/yyyy)")
    bday = input()
    valid = False
    while (valid != True):
        try:
            epochBirthday = int(datetime.datetime.strptime(bday, "%m/%d/%Y").timestamp())
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

def wordCount():
    print("wordCount")

def primeCount():
    print("primeCount")

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
print("You selected option " + str(gameChoice) + ". Starting...")

#Call appropriate function
match gameChoice:
    case 1:
        birthdayGame()
    case 2:
        wordCount()
    case 3:
        primeCount()
    case 4:
        guessTheNumber()
    case _:
        print("Oops, something went wrong! Please try again.")




    


