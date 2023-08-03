import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import newimg from './cornerlogobeta.png';
import axios from 'axios';


const CompanySearch = () => {
    const navigate = useNavigate();
    const [CCname, setCCname] = useState('')
    const [suggestions, setSuggestions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(CCname)

        if (CCname === '') {
            setErrorMessage('Please fill in all fields.');
            return;
            }

        try {
            const registrationData = JSON.parse(localStorage.getItem('registrationData'));
            const { name, accountType, email, password } = registrationData
            console.log(accountType)
            const CalendarData = { name, CCname, accountType};
            localStorage.setItem('CalendarData', JSON.stringify(CalendarData));

            const formData = {
                name,
                accountType,
                email,
                password,
                CCname
            };

            const response = await axios.post('https://timesyncv2-a367bdb60782.herokuapp.com/api/data', formData, {
              headers: {
                'Content-Type': 'application/json'
              }

            });

             // Handle the response or perform additional actions as needed
             console.log(response.data);
             
             if (response.data.message === 'Data stored successfully'){
                navigate('/calendar')
             } else {
                // If the response contains an error message, set the error state
                setErrorMessage('Company Not Found');
            }

        } catch (error) { 
            console.log(error);
            setErrorMessage('Company Not Found. Please Try Again');
        }
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setCCname(value);
        // Perform autocomplete or suggestion logic here
        // For example, fetch suggestions from an API based on the input value
        // const suggestions = fetchSuggestions(value); // Replace with your own suggestion fetching logic
        setSuggestions(suggestions);
    };

    return (
        <div>
            <div>
                <img src={newimg} className='CC-sm-logo' alt="small-logo"/>
            </div>
            <div className = 'CSinfo2'>
                <h5 className="other-larger-header3">Please Search for Your Organization</h5>
                <form className = 'CompCreation-form' onSubmit={handleSubmit}>
                    <input
                        className='CS-input'
                        type="text"
                        placeholder="Search Organization"
                        value={CCname}
                        onChange={handleInputChange}
                        list="suggestions-list" //Associate the input with the datalis
                    />
                    <datalist id="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <option key={index} value={suggestion} />
                    ))}
                    </datalist>
                    {errorMessage && <p className='CS-error'>{errorMessage}</p>}
                    <button className = 'logbutton2' type="submit">Search</button>
                    
                </form>
              
        

            </div>
        </div>
        )
}


export default CompanySearch