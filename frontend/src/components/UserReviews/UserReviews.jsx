import React from 'react'
import './UserReviews.css'
import { assets } from '../../assets/frontend_assets/assets'

const UserReviews = () => {
  return (
     <section className="user-reviews" id="user-reviews">
      <h2 className='heading'>What Our Customers Say:</h2>
      <div className="review-card">
        <div className="user-info">
          <img
            src={assets.user1}
            alt="Rahul Sharma"
            className="avatar"
          />
          <div>
            <h3>Rahul Sharma</h3>
            <p className="placement">Regular Customer</p>
            <div className="rating">★★★★★</div>
          </div>
        </div>

        <p className="review-text">
          Foodify has completely changed the way I order food. The delivery is
          always on time, and the food arrives fresh and hot. Love the smooth
          checkout experience!
        </p>
      </div>

      <div className="review-card">
        <div className="user-info">
          <img
            src={assets.user2}
            alt="Ananya Verma"
            className="avatar"
          />
          <div>
            <h3>Ananya Verma</h3>
            <p className="placement">Food Lover</p>
            <div className="rating">★★★★☆</div>
          </div>
        </div>

        <p className="review-text">
          The variety of restaurants on Foodify is amazing. I especially like
          how easy it is to track my orders and make payments securely using
          Razorpay.
        </p>
      </div>

      <div className="review-card">
        <div className="user-info">
          <img
            src={assets.user3}
            alt="Karthik R"
            className="avatar"
          />
          <div>
            <h3>Karthik R</h3>
            <p className="placement">Frequent User</p>
            <div className="rating">★★★★★</div>
          </div>
        </div>

        <p className="review-text">
          Great UI, fast ordering, and reliable delivery. Foodify is my go-to app
          whenever I don’t feel like cooking.
        </p>
      </div>
    </section>
  );
};

export default UserReviews;
