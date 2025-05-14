import React from 'react';
import { useLoaderData } from 'react-router';

const Update = () => {

    const user = useLoaderData();
 
    const handleUpdate = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const updatedUser = {name,email};
        

        // Updated section
        fetch(`http://localhost:5000/users/${user._id}`, {
            method:'PUT',
            headers: {
                'content-type': 'application/json' 
            },
            body:JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                
                console.log('after update ', data);
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleUpdate}>
                <input name='name' type="text" defaultValue={user.name} />
                <br />
                <input name='email' type="text" defaultValue={user.email} />
                <br />
                <input  type="submit" value="update users" />
            </form>
        </div>
    );
};

export default Update;