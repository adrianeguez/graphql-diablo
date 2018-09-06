import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'frontent-graphql';
  constructor(private apollo: Apollo) {

  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            traerTodos{
              id
              nombre
              acreditada
            }
          }
        `,
      })
      .valueChanges
      .subscribe(result => {
        console.log(result.data && result.data  );
        console.log(result.loading);
        console.log(result.errors);
      });
  }

}
