"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

//Must add multiple characteristic search entry 2-5

// app is the function called to start the entire application
function app(people){
	var searchType = promptFor("Would you like to search by 'name' or 'traits'? Enter 'name', 'traits', or click cancel to stop.", eitherNameOrTraits);
    let filteredPeople;
	let stopRunning
	switch(searchType){
		case 'name':
			filteredPeople = searchByName(people);
			break;
		case 'traits':
		    filteredPeople = pickOneOrMoreTraits(people);
		    break;
		case undefined:
			filteredPeople = undefined;
			break;
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
		alert("Noone was found who matched the information you entered.");
		app(people);
	}else{
		for(let i = 0; i < filteredPeople.length && !(stopRunning === "restart"); i++){
			let foundPerson = filteredPeople[i];
			stopRunning = mainMenu(foundPerson, people);
			if (stopRunning === null){
				return alert("Thanks for trying out our secret service!");
			}
		}
		if (!(stopRunning === "restart")){
			alert("That is everyone found who met the criteria entered.  Thanks for using our secret service!");
		}
	}
	return;
}

function pickOneOrMoreTraits(people){
	var searchType = promptFor("Would you like to search more than one trait?  Enter 'yes', 'no', or click cancel to stop.", yesNo);
    let filteredPeople;
	let traits;
    switch(searchType){
		case 'yes':
			traits = getTraits();
            filteredPeople = searchMultipleTraits(people, traits);
			break;
		case 'no':
		    filteredPeople = searchByTraits(people);
		    break;
		case undefined:
			return;
		default:
		    alert("That input is invalid. Please enter 'yes', 'no', or 'cancel'.");
		    app(people); // restart app
		    break;
			return;
	}
	return filteredPeople;
}

function searchByTraits(people){
	let userSearchChoice = prompt("What single trait would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation' or 'quit'.");
	if (userSearchChoice === null || userSearchChoice === "") {
		return;
	}else { 
		userSearchChoice = userSearchChoice.toLowerCase().trim();	
	}
    let filteredPeople;
    switch(userSearchChoice){
		case "height":
			filteredPeople = searchByHeight(people);
			//alert("
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
		    alert("That input is invalid. Please enter 'height', 'weight', 'eye color', 'gender', 'age', 'occupation' or 'quit'.");
		    searchByTraits(people);
            break;
			return;
    }  
	return filteredPeople;
}
function getTraits (){
    let traits = prompt("Which traits would you like to search?  Search by: 'weight', 'height', 'eye color', 'age', or 'occupation'.  Also please separate each trait with a space.");
    let traitsArray = traits.toLowerCase().split(" ");
    console.log (traitsArray);
    return traitsArray;
}

function searchMultipleTraits (people, traits){
let results = [];
  if(traits.includes("height")){  
    results = searchByHeight(people);
    people = results;
  }
  if(traits.includes("weight")){
    results = searchByWeight(people);
    people = results;
  }
  if(traits.includes("eye color")){
    results = searchByEyeColor(people);
    people = results;
  }
  if(traits.includes("age")){
    results = searchByAge(people);
    people = results;
  }
  if(traits.includes("occupation")){
    results = searchByOccupation(people);
    people = results;
    
    
  }
  return results;
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
	let ageYears = Math.floor(ageMsec / (86400000 * 365.25));
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

	var displayOption = prompt("Found " + person.firstName + " " + person.lastName + ". Do you want to know their 'info', 'family', or 'descendants'? Please enter the option you want, or type 'pass' to see if there is another match or 'restart' to start over or click cancel to quit.");

	switch(displayOption){
		case "info":
		    return displayPerson(person);
		    break;
		case "family":
			displayFamily(person, people);
			// TODO: get person's family
			break;
		case "descendants":
			displayDescendants(person, people);
			break;
		case "pass":
			return displayOption;
			break;
		case "restart":
			app(people);
            return displayOption; // stop execution
		case undefined || null:
			return null;
		default:
		alert("That input is invalid. Please enter 'info', 'family', 'descendants', or 'restart' to exit the program.  You can also click cancel to quit.");
		return mainMenu(person, people); // ask again
    }
	displayOption = promptFor("Thanks for using our secret service!  Would you like to search again? (Type 'yes', 'no', or click cancel)", yesNo);
	if (displayOption === "yes"){
		app(people);
	}else{
		return;
	}
}

function displayFamily(person, people){
	let parents = searchForParents(person, people);
	let siblings = searchForSiblings(person, people);
	let spouse = searchForSpouse(person, people);
	let children = searchForKids(person, people);
	let familyArray = [parents, siblings, spouse, children];
	let family = familyArray.toString().split(",").join("\n");
	console.log(family)
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
function searchForSiblings(person, people){
	let newArray = people.filter(function (el){
		if(el.parents[0] === person.parents[0] || el.parents[1] === person.parents[1] || el.parents[1] === person.parents[0] || el.parents[0] === person.parents[1]){
			while(person.id !== el.id)
			return true;
		}
	});
	return newArray;
}
function searchForKids(person, people){
	let personID = person.id;
	let newArray = people.filter(function (el){
		if(el.parents[0] === personID || el.parents[1] === personID){
			return true;
		}
	});
	return newArray;
}
	
function searchForChildren(person, people, descendants){
	let personID = person.id;
	let progenyIteration;
	let addName;
	let totalChildren = [separateName(person), "has children named:"];
	if(descendants){
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
	return person.firstName + " " + person.lastName;
}

function searchForParents (person, people, descendants){
	let matchNotFound = true;
	let theParents = [person.firstName + " " + person.lastName + "'s parent(s): "];
	let newArray = people.filter(function (el){
		if(el.id === person.parents[0] || el.id === person.parents[1]){
			if (!(matchNotFound)){
				theParents.push("&");
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

function searchForSpouse (person, people){
    let spouse;
        let newArray = people.filter(function (el){
            if (el.currentSpouse === person.id){
                spouse = el.firstName + " " + el.lastName
                return true;
            }
			else{
				return ["No current spouse"];
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
