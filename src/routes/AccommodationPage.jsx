import React from "react";
import Tag from "../components/Tag.jsx";
import Rating from "../components/Rating.jsx";
import Gallery from "../components/Gallery.jsx";
import Collapse from "../components/Collapse.jsx";
import { Navigate, useParams } from "react-router-dom";
import database from "../database.json";

//Component to render the accommodation page
export default function AccommodationPage(){
    let params = useParams()
    let currentId = params.accommodationId

    const data = database.data
    
    //match the url-id to an accommodation in the database
    let currentData = data.find((accommodation) => accommodation.id === currentId)

    return(
        <section>
            {currentData? <section>
                <Gallery pictures = {currentData.pictures} />
                <section className="information">
                    <section className="information__title-location-tag">
                        <h1>{currentData.title}</h1>
                        <p>{currentData.location}</p>
                        <Tag tags={currentData.tags} />
                    </section>
                    <section className="information__rating-host">
                        <Rating rating={currentData.rating} />
                        <section className="information__host">
                            <p>{currentData.host.name.split(" ")[0]} <br /> {currentData.host.name.split(" ")[1]}</p>
                            <img src={currentData.host.picture} alt="of the host" />
                        </section>
                    </section>
                </section>
                <section className="description-equipements">
                    <Collapse tabName="Description" data={currentData.description} page="accommodation"/>
                    <Collapse tabName="Equipements" data={currentData.Amenities} page="accommodation"/>
                </section>
            </section> : <Navigate to="/error" replace={true}/>}
        </section>
        
    )
}