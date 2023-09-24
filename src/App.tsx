
import React, { useReducer } from 'react';

import './App.css';
import Filter from './Filter.jsx'
import UserCard from './UserCard.jsx'
import UserContext from './UserContext';

interface User  {
  login:{
    uuid:string,
  },
  picture:{
    thumbnail:string,
  }
  name: {
    title:string,
    first:string,
    last:string
  },
  location:{
    street:{
      number:number,
      name:string,
    },
    city:string,
    postcode:number
  },
  phone:string,
  email:string,
  dob:{
    date:string,
    age:number
  }
};

function Grid <T>({ elements } : {elements : T[]}) {
	return (
		<div className="grid">
      {elements.map((user, index) => ( <UserCard {...user} key={index}></UserCard>))}
		</div>
	)
}


function App() {
  function reducer(state:any, action:any) {
    if (action.type === 'filter') {
      return {
        ...state,
        filter: action.filter,
      };
    }

    if (action.type === 'user_changed') {
      let new_state = {...state};
      for(let i in new_state.users) {
        if(new_state.users[i].login.uuid === action.user.login.uuid) {
          new_state.users[i] = action.user;
          break;
        }
      }
      return new_state;
    }

    if (action.type === 'set_users') {
      return {
        ...state,
        users: action.users,
      };
    }

    if (action.type === 'set_sort') {
      return {
        ...state,
        sort: action.sort,
      };
    }

    throw Error('Unknown action.');
  }

  const store = {
    filter: '',
    sort:false,
    users:[]
 };

  const [state, dispatch] = useReducer(reducer, store);

  function handleFilter(e:any) {
    dispatch({type:'filter', filter:e.target.value});
  }

  function handleSort(e:any) {
    dispatch({type:'set_sort', sort:e.target.value});
  }

  React.useEffect(()=>{
    fetch("https://randomuser.me/api/?page=3&results=100&seed=abc")
    .then(response=>response.json())
    .then(data => {
      dispatch({type:'set_users', users:data.results});
    });
  }, []);

  return (
    <UserContext.Provider value={{dispatch}}>
      <div className="App">
        <header className="App-header">
          <h2>One Hour Challenge</h2>
          <Filter value={state.filter} onChange={handleFilter}></Filter>
          <select className="sort" value={state.sort} onChange={handleSort}>
            <option value="0">Sort By</option>
            <option value="1">Last Name Asc</option>
            <option value="2">Last Name Desc</option>
            <option value="3">First Name Asc</option>
            <option value="4">First Name Desc</option>
            <option value="5">Zipcode Asc</option>
            <option value="6">Zipcode Desc</option>
            <option value="7">Age Asc</option>
            <option value="8">Age Desc</option>
          </select>
        </header>
        <main>
        <Grid elements={state.users.sort( (a:User, b:User) => {
          console.log(state.sort);
            if(!state.sort) return 1;

            switch(state.sort) {
              case '1': return a.name.last >= b.name.last ? 1 : -1;
              case '2': return a.name.last <= b.name.last ? 1 : -1;
              case '3': return a.name.first >= b.name.first ? 1 : -1;
              case '4': return a.name.first <= b.name.first ? 1 : -1;
              case '5': return a.location.postcode >= b.location.postcode ? 1 : -1;
              case '6': return a.location.postcode <= b.location.postcode ? 1 : -1;
              case '7': return a.dob.age >= b.dob.age ? 1 : -1;
              case '8': return a.dob.age <= b.dob.age ? 1 : -1;
            }; })
              .filter((user:User) =>
          user.name.last.indexOf(state.filter) >=0 ||
          user.name.first.indexOf(state.filter) >=0 ||
          user.phone.indexOf(state.filter) >=0 ||
          user.email.indexOf(state.filter) >=0 ||
          user.dob.date.substring(0,10).indexOf(state.filter) >=0
          )}></Grid>
        </main>
        <footer>
          by Jason Dobrinski jcdobrin@gmail.com
        </footer>
      </div>
    </UserContext.Provider>
  );
}

export default App;
