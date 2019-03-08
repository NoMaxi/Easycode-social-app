import { AuthService } from '../services/auth.service';

/** Class representing the signup component */
export class SignupComponent {
    /** Create an authentication service */
    constructor() {
        this._authService = new AuthService(); 
    }

    async beforeRender() {}

    /**
     * Create the signup form template
     * @returns {string} A string representing the signup form template
     */
    render() {
        return `
        <div class="auth-wrap d-flex mt-5">
            <div class="auth-form col col-6 mx-auto my-auto">
                <h3>Signup to Social.</h3>
                <p class="text-secondary">Enter the required data to signup your Social account.</p>
                <form name="signupForm" novalidate>
                    <div class="form-group">
                        <input type="email" class="form-control form-control-sm" id="email" placeholder="name@example.com" required data-pattern="^\S+@[a-z]+\.[a-z]+$">
                        <input type="password" class="form-control form-control-sm mt-3" id="password" placeholder="password" required data-pattern="\\S+">
                        <input type="text" class="form-control form-control-sm mt-3" id="nickname" placeholder="nickname" required data-pattern="\\S+">
                        <input type="text" class="form-control form-control-sm mt-3" id="firstName" placeholder="first name" required data-pattern="\\S+[^\\W]">
                        <input type="text" class="form-control form-control-sm mt-3" id="lastName" placeholder="last name" required data-pattern="\\S+[^\\W]">
                        <input type="tel" class="form-control form-control-sm mt-3" id="phone" placeholder="phone" required data-pattern="^(\\+\\d{2})?0\\d{9}$">
                        <div class="row mt-3 pl-1">
                            <legend class="col-form-label col-sm-2 pt-2">Gender:</legend>
                            <div class="col-sm-10">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="gender" id="genderMale" value="male">
                                    <label class="form-check-label" for="genderMale">Male</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="gender" id="genderFemale" value="female">
                                    <label class="form-check-label" for="genderFemale">Female</label>
                                </div>
                            </div>
                        </div>
                        <input type="text" class="form-control form-control-sm mt-3" id="city" placeholder="city" required data-pattern="\\S+[^\\W]">
                        <input type="text" class="form-control form-control-sm mt-3" id="country" placeholder="country" required data-pattern="\\S+[^\\W]">
                        <div class="mt-3">
                            <label class="form-check-label pl-1" for="birthDate">Birth date:</label>
                            <input type="date" class="form-control form-control-sm mt-2" name="birthDate" id="birthDate" min="1950-01-01" max="2019-01-01" required>
                        </div>
                        <div class="d-flex mt-5">
                            <button type="submit" class="btn btn-primary btn-sm">Signup</button>
                        </div>
                    </div>
                </form>
            </div>
            <!-- /.auth-form -->
            <div class="auth-bg col col-6">

            </div>
            <!-- /.auth-bg -->
        </div>
        <!-- /.auth-wrap -->
        `;
    }

    /** Submit the signup form to the server and get the server response */
    afterRender() {
        document.forms['signupForm'].addEventListener('submit', (e) => {
            e.preventDefault();

            const birthDate = new Date(e.target.elements['birthDate'].value);
            const userData = {
                email: e.target.elements['email'].value,
                password: e.target.elements['password'].value,
                nickname: e.target.elements['nickname'].value,
                first_name: e.target.elements['firstName'].value,
                last_name: e.target.elements['lastName'].value,
                phone: e.target.elements['phone'].value,
                gender_orientation: e.target.elements['gender'].value,
                city: e.target.elements['city'].value,
                country: e.target.elements['country'].value,
                date_of_birth_day: birthDate.getDate(),
                date_of_birth_month: birthDate.getMonth() + 1,
                date_of_birth_year: birthDate.getFullYear(),
            };

            // prevent sending an http-request to the server if not all user data is provided
            for (let key in userData) {
                if (!userData[key]) return;
            }

            this._authService.signup(userData)
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }
}
