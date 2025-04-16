import React, { useState } from 'react';

interface RegisterButtonProps {
  userId: number;
  eventId: number;
  onSuccess?: () => void;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ userId, eventId, onSuccess }) => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    if (isRegistered || isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/event/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, event_id: eventId }),
      });

      if (!response.ok) throw new Error('Registration failed');

      alert('Successfully registered for event!');
      setIsRegistered(true);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert('Something went wrong during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleRegister}
      className="EventRegister"
      disabled={isRegistered || isLoading}
    >
      {isRegistered ? 'Registered' : isLoading ? 'Registering...' : 'Register'}
    </button>
  );
};

export default RegisterButton;
