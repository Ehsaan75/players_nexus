// RatingReviewModal.tsx
import React, { useState } from 'react';
import StarRating from './StarRatings'; // Ensure this import path is correct

const RatingReviewModal = ({ showModal, setShowModal, onSubmit }) => {
  const [overall, setOverall] = useState(0);
  const [story, setStory] = useState(0);
  const [gameplay, setGameplay] = useState(0);
  const [graphics, setGraphics] = useState(0);
  const [audio, setAudio] = useState(0);
  const [multiplayer, setMultiplayer] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [activeTab, setActiveTab] = useState('Rate');

  const handleSubmit = () => {
    const review = {
      overall,
      story,
      gameplay,
      graphics,
      audio,
      multiplayer,
      reviewTitle,
      reviewText,
    };
    onSubmit(review);
    setShowModal(false); // Close the modal
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-black text-white p-4 rounded-lg shadow-lg max-w-2xl w-full">
        <div className="flex justify-between items-start mb-4">
          <div className="flex space-x-4">
            <button
              className={`text-xl font-bold ${activeTab === 'Rate' ? 'underline' : ''}`}
              onClick={() => setActiveTab('Rate')}
            >
              Rate
            </button>
            <button
              className={`text-xl font-bold ${activeTab === 'Review' ? 'underline' : ''}`}
              onClick={() => setActiveTab('Review')}
            >
              Review
            </button>
          </div>
          <button onClick={() => setShowModal(false)} className="text-xl hover:text-gray-500">
            &times;
          </button>
        </div>

        {activeTab === 'Rate' && (
          <div className="flex flex-col space-y-8 mb-8">
            <div>
              <label className="text-white text-lg font-bold">Overall:</label>
              <StarRating rating={overall} setRating={setOverall} />
            </div>
            <div>
              <label className="text-whit text-lg font-bold">Story:</label>
              <StarRating rating={story} setRating={setStory} />
            </div>
            <div>
              <label className="text-white text-lg font-bold">Gameplay:</label>
              <StarRating rating={gameplay} setRating={setGameplay} />
            </div>
            <div>
              <label className="text-white text-lg font-bold">Graphics:</label>
              <StarRating rating={graphics} setRating={setGraphics} />
            </div>
            <div>
              <label className="text-white text-lg font-bold">Audio:</label>
              <StarRating rating={audio} setRating={setAudio} />
            </div>
            <div>
              <label className="text-white text-lg font-bold">Multiplayer:</label>
              <StarRating rating={multiplayer} setRating={setMultiplayer} />
            </div>
          </div>
        )}

        {activeTab === 'Review' && (
          <div className="flex flex-col space-y-4 mb-4">
            <input
              type="text"
              placeholder="Title of your review"
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
            />
            <textarea
              placeholder="Write your review"
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              rows="4"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
          </div>
        )}

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default RatingReviewModal;
