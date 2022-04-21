import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function SmallerThen(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        console.log('yes')
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        console.log(control.value)
        console.log(matchingControl.value)
        // set error on matchingControl if validation fails
        if (parseInt(matchingControl.value)> parseInt(control.value) ) {
            console.log('here')
            matchingControl.setErrors({ more: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
