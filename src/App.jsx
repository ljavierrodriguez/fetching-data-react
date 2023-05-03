import React, { useEffect, useState } from 'react'
import CardInfo from './components/CardInfo';

const App = () => {
    const [url] = useState("https://rickandmortyapi.com/api/character");
    const [characters, setCharacters] = useState(null);
    const [urlDocs] = useState('https://api.bsale.cl/v1/documents.json?limit=50&offset=0');
    const [docs, setDocs] = useState(null);

    useEffect(() => {

        //getCharacters(url);
        getAsyncCharacters(url);
        getDocumentos(urlDocs);

    }, [])

    const getCharacters = (url) => {
        fetch(url, {
            method: 'GET', // GET, POST, PUT, DELETE 
            //body: data, // POST, PUT
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                //console.log(response.status)
                return response.json()
            })
            .then((data) => {
                //console.log(data);
                setCharacters(data);
            })
    }


    const getAsyncCharacters = async (url) => {

        try {

            const response = await fetch(url, {
                method: 'GET', // GET, POST, PUT, DELETE 
                //body: data, // POST, PUT
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json();

            setCharacters(data)

        } catch (error) {
            console.log(error)
        }
    }

    const getDocumentos = async (url) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'access_token': '',
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setDocs(data);
        } catch (error) {

        }
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                {
                    /* Si character es distinto de null o undefined */
                    !!characters && /* entonces */
                    characters.results.map((character, i) => {
                        return (
                            <div className="col-md-3 col-sm-6 col-12" key={i}>
                                <CardInfo id={character.id} name={character.name} image={character.image} />
                            </div>
                        )
                    })
                }
            </div>
            <div className="row">
                <div className="col-md-12 d-flex justify-content-center">
                    <button className='btn btn-primary my-2 mx-1' onClick={() => getCharacters(characters?.info?.prev)}>Prev</button>
                    <button className='btn btn-primary my-2 mx-1' onClick={() => getCharacters(characters?.info?.next)}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default App