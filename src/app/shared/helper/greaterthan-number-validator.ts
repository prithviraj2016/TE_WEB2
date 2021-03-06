import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function GreaterThenNumber(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if ( parseInt(matchingControl.value) > parseInt(control.value)  ) {
            matchingControl.setErrors({ greaterThanBudget: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
