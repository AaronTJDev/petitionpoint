import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { userContext } from '../../userContext';
import { Route, Link } from 'react-router-dom';
import NewPetition from './NewPetition'
import Row from './Row';
import { initial } from 'lodash';

function PetitionDashboard(props){
    const user = useContext(userContext);
    const [petitions, setPetitions] = useState([]);

    useEffect(() => {
        if(petitions.length === 0 && user.user._id) {
            axios.get(`/petition/${user.user._id}`)
                .then( res => {
                    if(res.data.length)
                    {
                        setPetitions(petitions => petitions.concat(res.data));
                    }
                }) 
                .catch( err => console.log(err));
        }
    });

    return (
        <div className="row mt-4">
            <h1 className="display-4 col-12">Petitions</h1>
            <Link to="/petition/new" className="px-3">New Petition<i className="fa fa-plus-square mx-2"></i></Link>
            <div class="table-responsive">
            <table class="table mx-auto mt-3">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Pay Per Signature</th>
                        <th>Published On</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        petitions.map( petition => <Row data={petition}/> )
                    }
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default class Petition extends React.Component {
    render(){
        console.log(this.context);
        return (
            <div>
                <Route exact path="/petition" component={ PetitionDashboard } />
                <Route path="/petition/new" component={ NewPetition } />
            </div>
        )
    }
}
Petition.contextType = userContext;
 
/* 
    Petitions will be scoped to organization
    Petitions will allow versioning of the petition
    Petitions that are currently active or archived AND that are associated with a turnin can not be deleted
    Petitions will have 3 states [ inactive, active, archived ]
        inactive - initial phase, used for drafting, accessible to coordinators
        active - live phase, signatures are being accepted, can be viewed by everyone within a organization
        closed - final phase, signatures are no longer being accepted, can be optionally viewed by everyone within a organization, can't be edited.
    Clicking New petition should navigate the user to NewPetition page
    Clicking Edit should navigate the user to Edit Page
    Clicking Delete should prompt the user to delete the petition
        if petition is active or archived it cannot be deleted


*/

function containsObject(obj, list) {;
    for (let i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}