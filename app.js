"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

//Must add multiple characteristic search entry 2-5

// app is the function called to start the entire application
function app(people){
	var searchType = promptFor("Would you like to search by 'name' or 'traits'? Enter 'name', 'traits', or click cancel to stop.", eitherNameOrTraits);
    let filteredPeople;
	switch(searchType){
		case 'name':
			filteredPeople = searchByName(people);
			break;
		case 'traits':
		    filteredPeople = pickOneOrMoreTraits(people);
		    break;
		case undefined:
			return;
		default:
		    alert("That input is invalid. Please enter 'name', 'traits', or click cancel.");
		    app(people); // restart app
		    break;
			return;
	}
	if (filteredPeople === undefined){
		alert("Thanks for trying out our secret service!");
		return;
	}else if (!(filteredPeople.length > 0)){
		alert("Noone was found matching the information you entered.");
		app(people);
	}else{
		for(let i = 0; i < filteredPeople.length; i++){
			let foundPerson = filteredPeople[i];
			mainMenu(foundPerson, people);
		}
	}
	return;
}

function pickOneOrMoreTraits(people){
	var searchType = promptFor("Would you like to search more than one trait?  Enter 'yes', 'no', or click cancel to stop.", yesNo);
    let filteredPeople;
	switch(searchType){
		case 'yes':
			filteredPeople = searchMultipleTraits(people);
			break;
		case 'no':
		    filteredPeople = searchByTraits(people);
		    break;
		case undefined:
			return;
		default:
		    alert("That input is invalid. Please enter a 'yes', 'no', or 'cancel'.");
		    app(people); // restart app
		    break;
			return;
	}
	return filteredPeople;
}


//Must create requisite functions for userSearchChoice, i.e. searchByHeight, &c. Use searchByWeight as starter

function searchByTraits(people){
	let userSearchChoice = prompt("What single trait would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation' or 'quit'.");
	console.log(userSearchChoice);
	if (userSearchChoice === null || userSearchChoice === "") {
		return;
	}else { 
		userSearchChoice = userSearchChoice.toLowerCase().trim();	
	}
	console.log(userSearchChoice);
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
		case "quit":
			return;
		default:
		    alert("That search type is invalid. Please search by 'height', 'weight', 'eye color', 'gender', 'age', 'occupation' or 'quit'.");
		    searchByTraits(people);
            break;
			return;
    }  

	return filteredPeople;
}

function searchMultipleTraits(people){
	
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
	let ageYears = Math.floor((ageMsec / (86400000*365.25)));
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
			searchForParents(person, people);
			// TODO: get person's family
			break;
		case "descendants":
			displayDescendants(person, people);
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
	var firstName = promptFor("What is the person's first name?", chars);
	if (firstName === null || firstName === undefined) {
		return;
	}else { 
		firstName = capitalize(firstName.toLowerCase().trim());	
	}
	
    var lastName = promptFor("What is the person's last name?", chars);
	if (lastName === null || lastName === undefined) {
		return;
	}else { 
		lastName = capitalize(lastName.toLowerCase().trim());	
	}
	
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

function displayDescendants(person, people){
	let descendantsArray = searchForChildren(person, people);
	let descendantLineage = descendantsArray.toString().split(",").join("\n");
	alert(descendantLineage);
}

function searchForChildren(person, people, descendants){
	let personID = person.id;
	let progenyIteration;
	let addName;
	let totalChildren = [separateName(person), "has children named:"];
	if (descendants){
		totalChildren = ["whose children are:"];
	}
	let newArray = people.filter(function (el){
		if(el.parents[0] === personID || el.parents[1] === personID){
			let descendants = true;
			addName = separateName(el);
			totalChildren.push(addName);
			progenyIteration = searchForChildren(el, people, descendants);
			if (!(progenyIteration === undefined)){
				totalChildren.push(progenyIteration);
			}
			return true;
		}
    });
	if (newArray.length > 0){
		return totalChildren;
	}else if (descendants){
		return;
	}else{
		return alert(person.firstName + " has no children.");
	}
}

function separateName(person){
	// let firstName = person.firstName;
	// let lastName = person.lastName;
	// let fullName += firstName + " " + lastName + ", ";
	// return fullName;
	return person.firstName + " " + person.lastName;
}

function searchForParents (person, people, descendants){
	let matchNotFound = true;
	let theParents = [person.firstName + " " + person.lastName + "'s parent(s): "];
	let newArray = people.filter(function (el){
		if(el.id === person.parents[0] || el.id === person.parents[1]){
			if (!(matchNotFound)){
				theParents.push("and");
			}
			theParents.push(el.firstName + " " + el.lastName);
			matchNotFound = false;
			return true;
		}
    });
	if (matchNotFound){
		return theParents = person.firstName + " " + person.lastName + " has no living parents.";
	}else{
		return theParents.join(" ");
	}
}

function checkForSpouse (person, people){
    let spouse;
        let newArray = people.filter(function (el){
            if (el.currentSpouse === person.id){
                spouse = el.firstName + " " + el.lastName
                return true;
            }
                
        });
        return spouse;
}   

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
    var personInfo = "First Name: " + person.firstName + "\n";
    personInfo += "Last Name: " + person.lastName + "\n";
    personInfo += "Height: " + person.Height + "\n";
	personInfo += "Gender: " + person.gender + "\n";
	personInfo += "DOB: " + person.dob + "\n";
	personInfo += "Height: " + person.height + "\n";
	personInfo += "Weight: " + person.weight + "\n";
	personInfo += "Eye Color: " + person.eyeColor + "\n";

    alert(personInfo);
}

// var firstName = capitalize(promptFor("What is the person's first name?", chars));

// function that prompts and validates user input
function promptFor(question, valid){
    do{//split, trim, join
        var response = prompt(question);//.trim();
		if (response === null || response === "") {
			return;
		}else { 
			response = response.trim();	
		}
		if (!response || !valid(response)){
			alert("You're input didn't match the text required, please try again.");
		}
    }
	while(!response || !valid(response));
    return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}

function eitherNameOrTraits(input){

	return input.toLowerCase() === "name" || input.toLowerCase() === "traits";

}

// helper function to pass in as default promptFor validation
function chars(input){
    // input = /regEx/xyz
	return true; // default validation only
}