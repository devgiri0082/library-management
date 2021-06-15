import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import BooksList from "./BooksList";
import Categories from "./Categories";
import Issue from "./Issue";
import Main from "./Main";
import Member from "./Member";
import Signup from "./Signup";
import Wrapper from "./Wrapper";
import Login from "./Login";


export default function App() {
    return (

        <Router>
            <Wrapper>
                <Switch>
                    <Route exact path="/">
                        <Main />
                    </Route>
                    <Route path="/Books">
                        <BooksList />
                    </Route>
                    <Route path="/Signup">
                        <Signup />
                    </Route>
                    <Route path="/Login">
                        <Login />
                    </Route>
                    <Route path="/Categories">
                        <Categories />
                    </Route>
                    <Route path="/Member">
                        <Member />
                    </Route>
                    <Route path="/Issue">
                        <Issue />
                    </Route>
                </Switch>
            </Wrapper>
        </Router>

    )
}
