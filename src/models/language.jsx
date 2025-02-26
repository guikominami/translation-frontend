class Language{
  id;
  name;
  
  constructor(languageName){
    this.name = languageName;
    this.id = new Date().toISOString();
  }
}

export default Language;