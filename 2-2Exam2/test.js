var person = {
    lastName: "Anand"
};

function fullName(salutaion, firstName) {
    console.log(salutaion, firstName, this.lastName);
}

var bindFullName = fullName.bind(person, "Mr");

bindFullName("Ankur");