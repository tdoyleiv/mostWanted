"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
	var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo);
    let filteredPeople;
	switch(searchType){
		case 'yes':
			filteredPeople = searchByName(people);
			break;
		case 'no':
		    searchByTraits(people);
		    break;
		default:
		    alert("That input is invalid. Please enter a 'yes' or 'no'.");
		    app(people); // restart app
		    break;
	}
	for(let i = 0; i < filteredPeople.length; i++){
		let foundPerson = filteredPeople[i];
		mainMenu(foundPerson, people);
	}
}

function searchByTraits(people){
	let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.").toLowerCase();
    let filteredPeople;
    switch(userSearchChoice){
		case "height":
			filteredPeople = searchByHeight(people);
			break;
		case "weight":
			filteredPeople = searchByWeight(people);
			break;
		case "eye color":
			filteredPeople = searchByEyeColor(people);
			break;
		case "gender":
            filteredPeople = searchByGender(people);
			break;
        case "age":
            filteredPeople = searchByAge(people);
			break;
        case "occupation":
            filteredPeople = searchByOccupation(people);
            break;		
		default:
		    alert("That search type is invalid. Please search by 'height', 'weight', 'eye color', 'gender', 'age', or 'occupation'.");
		    searchByTraits(people);
            break;
    }  
	
	for(let i = 0; i < filteredPeople.length; i++){
		let foundPerson = filteredPeople[i];
		mainMenu(foundPerson, people);
	}
}

function searchByHeight(people){
	let userInputHeight = parseInt(prompt("How tall is the person in inches?"), 10);
    let newArray = people.filter(function (el){
        if(el.height === userInputHeight){
            return true;
        }
    });
    return newArray;
}
function searchByWeight(people){
	let userInputWeight = parseInt(prompt("How much does the person weigh?"), 10);
	let newArray = people.filter(function (el){
		if(el.weight === userInputWeight){
			return true;
		}
	});
	return newArray;
}
function searchByEyeColor(people){
	let userInputEyeColor = prompt("What color is the person's eyes?").toLowerCase();
    let newArray = people.filter(function (el){
        if(el.eyeColor === userInputEyeColor.toLowerCase()){
            return true;
        }
    });
    return newArray;
}
function searchByGender(people){
	let userInputGender = prompt("What is the person's gender?").toLowerCase();
    let newArray = people.filter(function (el){
        if(el.gender === userInputGender){
            return true;
        }
    });
    return newArray;
}
//Convert DOB to age integer
function searchByAge(people){
	let userInputAge = parseInt((prompt("How old is the person in years?")));
    let newArray = people.filter(function (el){
		let personAge = findAge(el);
        if(personAge === userInputAge){
            return true;
        }
    });
    return newArray;
}

function findAge(people){
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let dobArray = people.dob.split("/");
	let dobArrayInt = dobArray.map(function (el){
		return parseInt(el);	
	})
	let monthIndex = dobArrayInt[0];
	dobArrayInt[0] = months[monthIndex - 1];
	dobArrayInt = dobArrayInt.join(" ");
	let todaysDate = getTodaysDate();
	let dobMsec = Date.parse(dobArrayInt);
	let ageMsec = todaysDate - dobMsec;
	let ageYears = Math.floor((ageMsec / 86400000) / 365.25);
	console.log(ageYears);
	return ageYears;
}

function getTodaysDate(){
	let mSec = (new Date()).getTime();
	console.log(mSec);
	return mSec;
}

function searchByOccupation(people){
	let userInputOccupation = prompt("What is the person's occupation?").toLowerCase();
    let newArray = people.filter(function (el){
        if(el.occupation === userInputOccupation){
            return true;
        }
    });
    return newArray;
}
// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
    if(!person){
        alert("Could not find that individual.");
        return app(people); // restart
    }

	var displayOption = prompt("Found " + person.firstName + " " + person.lastName + ". Do you want to know their 'info', 'family', or 'descendants'? Please enter the option you want, or 'restart' or 'quit'");
	let parent1;
	let parent2;
	switch(displayOption){
		case "info":
		    displayPerson(person);
		    break;
		case "family":
			displayFamily(person, people);
		// TODO: get person's family
		break;
		case "descendants":
		// TODO: get person's descendants
		break;
		case "restart":
		app(people); // restart
		break;
		case "quit":
		return; // stop execution
		default:
		return mainMenu(person, people); // ask again
    }
}

function capitalize(name){
	let wordsArray = name.split(" ");
	for(let i = 0; i < wordsArray.length; i++){
		let cappedWord = wordsArray[i].charAt(0).toUpperCase() + wordsArray[i].slice(1).toLowerCase();
	    wordsArray[i] = cappedWord;
	}
	let answer = wordsArray.join(" ");
	return answer;
}

function searchByName(people){
	var firstName = capitalize(promptFor("What is the person's first name?", chars));
    var lastName = capitalize(promptFor("What is the person's last name?", chars));
    let newArray = people.filter(function (el){
        if(el.firstName === firstName && el.lastName === lastName){
            return true;
        }
    });
    return newArray;
}

// alerts a list of people
function displayPeople(people){
    alert(people.map(function(person){
        return person.firstName + " " + person.lastName;
    }).join("\n"));
}

function displayFamily(person, people){
	let parentsArray = searchForChildren(person, people);
	console.log(parentsArray);
}

function searchForChildren(person, people){
	let personID = person.id;
	let descendants;
	let progenyIteration = ["whose children are"];
	let newArray = people.filter(function (el){
		if(el.parents[0] === personID || el.parents[1] === personID){
			return true;
		}
    });
	if (newArray.length > 0){
		for (let i = 0; i < newArray.length; i++){
			descendants = newArray[i];
			progenyIteration.push(searchForChildren(descendants, people));
		}	
	}
	   if(progenyIteration.length > 0){
		   newArray += progenyIteration;
		   console.log(newArray);
	   }
	return newArray;
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
    var personInfo = "First Name: " + person.firstName + "\n";
    personInfo += "Last Name: " + person.lastName + "\n";
	personInfo += "Gender: " + person.gender + "\n";
	personInfo += "DOB: " + person.dob + "\n";
	personInfo += "Height: " + person.height + "\n";
	personInfo += "Weight: " + person.weight + "\n";
	personInfo += "Eye Color: " + person.eyeColor + "\n";
	personInfo += "Occupation: " + person.occupation + "\n";
    alert(personInfo);
}

// var firstName = capitalize(promptFor("What is the person's first name?", chars));

// function that prompts and validates user input
function promptFor(question, valid){
    do{
        var response = prompt(question).trim();
    }
	while(!response || !valid(response));
    return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
    // input = /regEx/xyz
	return true; // default validation only
}