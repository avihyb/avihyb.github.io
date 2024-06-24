import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycby4BkFRUjVJfmRnZIvkAulB7Lvx9Ths3GFffBae7cQ/dev'; 
    const params = new HttpParams()
      .set('name', this.contact.name)
      .set('email', this.contact.email)
      .set('message', this.contact.message);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(scriptURL, params, { headers }).subscribe(
      response => {
        console.log('Contact form submitted', response);
        alert('Form submitted successfully!');
      },
      error => {
        console.error('Error submitting contact form', error);
        alert('There was an error submitting the form.');
      }
    );
  }
}
