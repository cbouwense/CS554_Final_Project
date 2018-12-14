import React from 'react';
import axios from 'axios';

export class ExerciseEventList extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // Get the user id from the redux store
        let user_id;
        
        // Get the exercise event list from the db
        axios.get(`/api/${user_id}`)
            .then((res) => {

            })
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        
                    }
                </ul>
            </div>
        );
    }
}
