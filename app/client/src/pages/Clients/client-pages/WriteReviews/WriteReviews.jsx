import './WriteReviews.css';
import {useEffect, useState} from "react";
import {getAllDriversThatRented, writeReview} from "../../../../services/apiService.js";
import useGetIdentity from "../../../../utils/hooks/useGetIdentity.jsx";

const WriteReviews = () => {
    const [allDrivers, setAllDrivers] = useState([]);
    const {identity} = useGetIdentity();

    const handleReviewSubmission = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const reviewMessage = formData.get('reviewMessage');

        if (!reviewMessage.trim()) {
            alert("Review message cannot be empty!");
            return;
        }

        const rating = formData.get('rating');
        const driver = formData.get('driver');
        console.log("Driver: ", driver);
        console.log("Rating: ", rating);
        console.log("Review: ", reviewMessage);

        writeReview(identity.email, driver, rating, reviewMessage).then(
            (data) => {
                console.log("Review submitted: ", data);
            }
        ).catch(
            (error) => {
                console.log("Error submitting review: ", error);
                alert("Error submitting review: " + error);
            }
        )
    };




    useEffect(
        () => {
            getAllDriversThatRented(identity.email).then(
                (data) => {
                    console.log("Drivers: ", data);
                    setAllDrivers(data);
                }
            )
        }, []
    )


    return (
        <div className={'review-page-container'}>
                <h2>Write a Review</h2>
            <form onSubmit={(event) => {
                handleReviewSubmission(event);
            }} className={'write-review-form'}>
                <select id="driver" name="driver">
                    {
                        allDrivers && allDrivers.map((driver) => {
                            return (
                                <option key={driver[0]} value={driver[0]}>
                                    {driver[0]}
                                </option>
                            )
                        })
                    }
                </select>

                <textarea className={'write-review-input'}
                name={'reviewMessage'}
                />
                <div className={'review-form'}>
                    <div className={'rating-label-container'}>
                        <label>Rating:</label>
                        <select id="rating" name="rating">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <button type="submit" className={'submit-review-button'}>Submit Review</button>
                </div>
            </form>
        </div>
    );
}

export default WriteReviews;