import React from 'react';

interface ShareButtonProps {
  eventTitle: string;
  eventId: number;
}

const ShareButton: React.FC<ShareButtonProps> = ({ eventTitle, eventId }) => {
  const shareUrl = `${window.location.origin}/events/${eventId}`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: eventTitle,
          text: `Check out this event: ${eventTitle}`,
          url: shareUrl,
        });
        console.log('Event shared successfully!');
      } catch (error) {
        console.error('Error sharing the event:', error);
      }
    } else {
      alert('Sharing is not supported in this browser. Please copy the URL manually.');
    }
  };

  return (
    <button className="native-share-button" onClick={handleNativeShare}>Share</button>
  );
};

export default ShareButton;
