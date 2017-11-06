"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
	var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
    switch(searchType){
		case 'yes':
			searchByName(people);			// TODO: search by name
			break;
		case 'no':
		searchByTraits(people);
		break;
		default:
		alert("That input is invalid. Please enter a 'yes' or 'no'.");
		app(people); // restart app
		break;
	}
}

//Must create requisite functions for userSearchChoice, i.e. searchByHeight, &c. Use searchByWeight as starter
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
    let foundPerson = filteredPeople[0];
    mainMenu(foundPerson, people);
}
//searchBy functions need invalid UI alerts
function searchByHeight(people){
	let userInputHeight = prompt("How tall is the person?");
    let newArray = people.filter(function (el){
        if(el.height === userInputHeight){
            return true;
        }
    // return true if el.height matches userInputHeight
    });
    return newArray;
}
function searchByWeight(people){
<<<<<<< HEAD
	let userInputWeight = parseInt(prompt("How much does the person weigh?"), 10);
	let newArray = people.filter(function (el){
		if(el.weight === userInputWeight){
			return true;
			//displayPerson(people);
		}
	})
}
function searchByEyeColor(people){
	let userInputEyeColor = prompt("What color is the person's eyes?");
    let newArray = people.filter(function (el){
        if(el.eyeColor === userInputEyeColor){
            return true;
        }
    // return true if el.eyeColor matches userInputEyeColor
    });
    return newArray;
}
function searchByGender(people){
	let userInputGender = prompt("What is the person's gender?");
    let newArray = people.filter(function (el){
        if(el.gender === userInputGender){
            return true;
        }
    // return true if el.height matches userInputGender
    });
    return newArray;
}
function searchByAge(people){
	let userInputAge = prompt("How old is the person?");
    let newArray = people.filter(function (el){
        if(el.age === userInputAge){
            return true;
        }
    // return true if el.age matches userInputAge
    });
    return newArray;
}
function searchByOccupation(people){
	let userInputOccupation = prompt("What is the person's occupation?");
    let newArray = people.filter(function (el){
        if(el.occupation === userInputOccupation){
            return true;
        }
    // return true if el.occupation matches userInputOccupation
    });
>>>>>>> a29027fe887ac8b065f8d9cf85ae178912e3f2f8
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

	switch(displayOption){
		case "info":
		// TODO: get person's info
		break;
		case "family":
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

function searchByName(people){
	var firstName = promptFor("What is the person's first name?", chars);
    var lastName = promptFor("What is the person's last name?", chars);

  // TODO: find the person using the name they entered

}

// alerts a list of people
function displayPeople(people){
    alert(people.map(function(person){
        return person.firstName + " " + person.lastName;
    }).join("\n"));
}

function displayPerson(person, index){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
    var personInfo = "First Name: " + person[index].firstName + "\n";
    personInfo += "Last Name: " + person[index].lastName + "\n";
  // TODO: finish getting the rest of the information to display
    alert(personInfo);
}

// function that prompts and validates user input
//do/while may be syntactically wrong
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
    return true; // default validation only
}
