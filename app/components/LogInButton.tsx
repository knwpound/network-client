import React from 'react';

interface LogInButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const LogInButton: React.FC<LogInButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        backgroundColor: '#F8A1A6',
        color: 'white',
        border: '2px solid #F8A1A6',
        borderRadius: '10px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#E6979B";
        e.currentTarget.style.color = "#fff";
        e.currentTarget.style.borderColor = "#E6979B"; // Change the border color on hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#F8A1A6";
        e.currentTarget.style.color = "#FFFFFF";
        e.currentTarget.style.borderColor = "#F8A1A6";
      }}
    >
      Log In
    </button>
  );
};

export default LogInButton;
