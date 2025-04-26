
import React, { useState } from 'react';
import { toast } from "sonner";
import { Check, X, Book, IndianRupee, Clock } from "lucide-react";
import "./BiddingWar.css";

const BiddingWar = () => {
  const [bids, setBids] = useState([
    { id: 1, bidder: "Dwiti Oberoi", amount: 450, timestamp: "10 minutes ago", status: "pending" },
    { id: 2, bidder: "Sanskriti Jain", amount: 470, timestamp: "25 minutes ago", status: "pending" },
    { id: 3, bidder: "Neha Tanwar", amount: 480, timestamp: "42 minutes ago", status: "pending" },
    { id: 4, bidder: "Zara Singh", amount: 400, timestamp: "1 hour ago", status: "declined" },
  ]);

  const handleAcceptBid = (bidId) => {
    setBids(prevBids => 
      prevBids.map(bid => 
        bid.id === bidId ? { ...bid, status: "accepted" } : bid
      )
    );
    toast.success("Bid accepted successfully!");
  };

  const handleDeclineBid = (bidId) => {
    setBids(prevBids => 
      prevBids.map(bid => 
        bid.id === bidId ? { ...bid, status: "declined" } : bid
      )
    );
    toast.info("Bid declined");
  };

  const sortedBids = [...bids].sort((a, b) => {
    if (a.status === "pending" && b.status !== "pending") return -1;
    if (a.status !== "pending" && b.status === "pending") return 1;
    return b.amount - a.amount;
  });

  return (
    <div className="bidding-war-container">
      <div className="bidding-war-content-wrapper">
        <div className="bidding-war-header">
          <Book className="bidding-war-icon" />
          <h1 className="bidding-war-heading">Book Bidding War</h1>
          <p className="bidding-war-description">
            Accept or decline bids from potential buyers. The highest bid appears at the top.
          </p>
        </div>

        <div className="bidding-war-book-details">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Book Details</h3>
              <p className="card-description">The book you're selling</p>
            </div>
            <div className="card-content">
              <div className="bidding-war-book-info">
                <img 
                  src="https://m.media-amazon.com/images/I/71eV-iAVGwL._SL1500_.jpg" 
                  alt="Engineering Physics Book Cover" 
                  className="bidding-war-book-cover" 
                />
                <div className="bidding-war-book-metadata">
                  <h2 className="bidding-war-book-title">Engineering Physics</h2>
                  <p className="bidding-war-book-author">HK Malik</p>
                  <p className="bidding-war-book-category">Engineering</p>
                  <p className="bidding-war-book-description">
                    Engineering Physics, 2e, provides a comprehensive overview of the subject for first year engineering students. It provides an excellent coverage of the syllabus for all major universities. The book emphasizeson tutorial approach (teach-by-example) towards the subject. Ample solved examples and rich pedagogical pool will help the students understand the subject matter and prepare them for the questions asked inexamination.
                  </p>
                  <div className="bidding-war-book-starting-price">
                    <IndianRupee className="bidding-war-price-icon" />
                    <span>Starting Price: ₹500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bidding-war-bids-section">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Current Bids</h3>
              <p className="card-description">Manage bids from potential buyers</p>
            </div>
            <div className="card-content">
              <div className="bidding-war-bids-list">
                {sortedBids.length === 0 ? (
                  <div className="bidding-war-no-bids">
                    <p>No bids have been placed yet.</p>
                  </div>
                ) : (
                  sortedBids.map((bid) => (
                    <div 
                      key={bid.id} 
                      className={`bidding-war-bid-item ${
                        bid.status === "accepted" 
                          ? "bidding-war-bid-accepted" 
                          : bid.status === "declined" 
                          ? "bidding-war-bid-declined" 
                          : ""
                      }`}
                    >
                      <div className="bidding-war-bid-info">
                        <div className="bidding-war-bid-amount">
                          ₹{bid.amount.toFixed(2)}
                        </div>
                        <div className="bidding-war-bid-details">
                          <span className="bidding-war-bidder-name">{bid.bidder}</span>
                          <span className="bidding-war-bid-time">
                            <Clock className="bidding-war-time-icon" />
                            {bid.timestamp}
                          </span>
                        </div>
                      </div>
                      <div className="bidding-war-bid-actions">
                        {bid.status === "pending" ? (
                          <>
                            <button 
                              onClick={() => handleAcceptBid(bid.id)}
                              className="btn btn-outline bidding-war-accept-btn"
                            >
                              <Check /> Accept
                            </button>
                            <button 
                              onClick={() => handleDeclineBid(bid.id)}
                              className="btn btn-outline bidding-war-decline-btn"
                            >
                              <X /> Decline
                            </button>
                          </>
                        ) : (
                          <div className="bidding-war-bid-status">
                            {bid.status === "accepted" ? (
                              <span className="bidding-war-status-accepted">
                                <Check /> Accepted
                              </span>
                            ) : (
                              <span className="bidding-war-status-declined">
                                <X /> Declined
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="card-footer">
              <p className="bidding-war-bid-note">
                Once you accept a bid, you'll be able to arrange delivery details with the buyer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiddingWar;
