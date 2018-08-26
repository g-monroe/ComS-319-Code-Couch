var name;
var email;
var type;
var extra;

function user() {
    this.setName = function (person) {
        this.name = person;
        this.name = document.createElement(person);
    };

    this.getName = function () {
        return name;
    };

    this.setEmail = function (address) {
        this.email = address;
        this.email = document.createElement(address);
    };

    this.getEmail = function () {
        return email;
    };

    this.setType = function (T) {
        this.type = T;
        this.type = document.createElement(T);
    };

    this.getType = function () {
        return type;
    };

    this.setExtra = function (E) {
        this.extra = E;
        this.extra = document.createElement(E);
    };

    this.getExtra = function () {
        return extra;
    };

    return name;
    return email;
    return type;
    return extra;
}
export default user;
