  import React, { useState, useEffect } from 'react';
  import ReactMapGL, { Marker, Popup } from 'react-map-gl';
  import {getAllVisitedPlaces} from './apis/visits';


  const App = () => {

    const [visitEntries, setVisitEntries] = useState([]);
    const [showPopUp, setShowPopUp] = useState({});
    const [viewport, setViewport] = useState({
      width: '100vw',
      height: '50vh',
      latitude: 38.7166700,
      longitude: -9.1333300,
      zoom: 2
    });

    useEffect(() => {
      ( async () => {
        const visitEntries = await getAllVisitedPlaces();
        console.log(visitEntries);
        setVisitEntries(visitEntries);
      })();
    }, []);

    const showAddNewPopUp = (event) => {
      setShowPopUp({})
      console.log(event);
    };

    return (
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/pandinni/ck8ajqdzs14lw1jo5big4ew5k"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={setViewport}
        onClick={() => setShowPopUp({})}
        onDblClick={showAddNewPopUp}
      >  

      {
        visitEntries.map(each => (
          <div key={each._id}>
            <Marker 
             
              latitude={each.latitude}
              longitude={each.longitude}
              captureClick={true}
              offsetLeft={-12}
              offsetTop={-24}

            > 
            <svg className='pin' 
            viewBox="0 0 24 24"
              style={ {
                width: '24',
                height: '24'
              }}
              strokeWidth="2" 
              fill="none" 
              strokeLinecap="round" 
              strokeinejoin="round"
              onClick={() => setShowPopUp({
                [each._id] : true,
              })}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </Marker>
              
              {
                showPopUp[each._id] &&
                <Popup
                  longitude={each.longitude}
                  latitude={each.latitude}
                  anchor="top"
                  onClose={() => setShowPopUp({})}>
                <div className="popup"> 
                  <h3>{each.title}</h3>  
                  <p>{each.comments}</p>
              <small>I've visited on {new Date(each.visitDate).toLocaleString()}</small>
                </div>
                </Popup>
            }
            


            </div>
  
        ))
      }

      </ReactMapGL>
    );
  };

  export default App;
