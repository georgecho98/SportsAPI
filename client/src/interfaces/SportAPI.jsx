export class SportAPI {
  constructor(title, authors, description, imageLinks){
    this.title = title;
    this.authors =authors;
    this.description= description;
    this.imageLinks =imageLinks; 

  };
}

export class GoogleAPIBook {
  constructor(id, volumeInfo){
    this.id = id;
    this.volumeInfo=volumeInfo;

  }

}
