import React from 'react';
import axios from 'axios';

export class ExerciseEventList extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            exerciseList: []
        };
    }

    componentDidMount() {
        // TODO: Get the user id from the redux store
        let user_id;

        // Get the exercise event list from the db
        axios.get(`/api/${user_id}`)
            .then(user => {
                this.setState({
                    loaded: true,
                    exerciseList: user.exerciseEvents
                });
            })
            .catch((err) => {
                console.log(error);
            });
    }

    // TODO: this is completely untested
    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.loaded && 
                        this.state.exerciseList.map(e => <li><ExerciseEvent exercise={e}/></li>)
                    }
                </ul>
            </div>
        );
    }
}
