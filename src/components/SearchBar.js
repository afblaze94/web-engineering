import React, {useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    searchbar: {
      paddingTop: "10px",
      paddingLeft: "10%",
      flexDirection: "column",
      alignItems: "right",
      width: "350px",
    },
}));

export default function SearchBar() {
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');

    const updateSearch = e => {
        setSearch(e.target.value);
        console.log(search);
    }
    
    const getSearch = e => {
        e.preventDefault();
        //console.log(search)
        //setQuery(search);
        return(
          <div>
            hello
            {search}
                  {/* <Route exact path='/signup' component={ViewProduct}/> */}
          </div>
        )
      }

    return (
        <div className={classes.searchbar}>
            <form onSubmit = {getSearch} className = "App" >
                <input className = "search-bar"
                  type = "text"
                  placeholder = "Product Name"
                  value = {search}
                  onChange = {updateSearch}>
                </input>
              </form>
        </div>
    )
}
