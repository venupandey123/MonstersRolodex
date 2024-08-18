import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters : [],
      searchField : '',
    }
    console.log('constructor');
  }

  componentDidMount() {
    console.log('componentDidMount');
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => {
      this.setState(
        () => {
          return { monsters: users };
        }, 
        () => {
          console.log(this.state);
        }
      );
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
    });
   }

   onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField }
    })
  }
   // This was a anonymous function, again & again it was getting initialized inside render and was making the performance slow. Hence it is moved in a seperate method so that it can be initialized only once, when class component initializes.  
  
  render() {
    console.log('render');
    const {monsters, searchField} =  this.state;
    const {onSearchChange} = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField)
   })
   
    return (
      <div className="App"> 
      <h1 className='app-title'>Monsters Rolodex</h1>


        <SearchBox onChangeHandler={onSearchChange} placeholder='search monsters' className='monsters-search-box' /> 
        <CardList monsters={filteredMonsters} /> 
        {/* This component must always begin with a Caps letter */}   
      </div>
    );
  }
}

export default App;
