import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  successMessage: string = '';

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Create a new FormData object to hold the form data
      const formData = new FormData();
      formData.append('email', form.value.email);
      formData.append('message', form.value.message);
      
      // Use fetch API to submit the form data to Formspree
      fetch('https://formspree.io/f/mgvwwdvj', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          console.log('Form submitted successfully', data);
          this.successMessage = 'Your message has been sent successfully.';
          // Optionally, reset the form
          form.resetForm();
        } else {
          console.error('Form submission error', data);
          // Optionally, show an error message to the user
        }
      })
      .catch(error => {
        console.error('Form submission error', error);
        // Optionally, show an error message to the user
      });
    }
  }
}
