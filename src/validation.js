
    function requiredField(value){
        return value !== '';
    }

    function validateEmail(email) {
        let emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRE.test(email);
    }

    function checkPasswordLength(value, sum, total) {
        let length = value.length;
        let display;
        let msg = '';
        sum = (total - length);
        switch (sum) {
            case 0:
                display = '';
                break;
            case 1:
                display = 'Keep going - just need ' + sum + ' more character.';
                break;
            default:
                display = 'Keep going - just need ' + sum + ' more characters';
        }
        if (length >= total) {
            msg = '';
        } else {
            msg = display;
        }
        return msg;
    }

    function checkPasswordsMatch(password, password2) {
        if (password.length > 5 && password2.length > 5) {
            return password2 !== password;
        }
    }

//---------------check email------------------------------------------------------------------------
    /**
     * @return {string}
     */
    function CheckEmail(email) {
        let emailMsg = '';
        if (!requiredField(email)) {
            emailMsg = 'Field is required';
        } else {
            if (!validateEmail(email)) {
                emailMsg = 'Keep typing...waiting for a valid email'
            } else {
                emailMsg = '';
            }
        }
        return emailMsg;
    }
//----------------check password(authorization)--------------------------------------------------------
    /**
     * @return {string}
     */
    function CheckPswd(password) {
        let passwordMsg = '';
        if (requiredField(password)){
            passwordMsg = checkPasswordLength(password,0,6);
        }else{
            passwordMsg = 'Field is required';
        }
        return passwordMsg;
    }

    function testPhone(phone) {
        let phoneRE = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;
        return phoneRE.test(phone);
    }
 export default {
     requiredField,
     checkPasswordsMatch,
     CheckEmail,
     CheckPswd,
     testPhone
 }