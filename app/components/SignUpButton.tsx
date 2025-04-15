import React from 'react';

interface SignUpButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        backgroundColor: '#FFFFFF',
        color: 'black',
        border: '1.5px solid #000000',
        borderRadius: '10px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#E6979B";
        e.currentTarget.style.color = "#FFFFFF";
        e.currentTarget.style.borderColor = "#E6979B"; // Change the border color on hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#FFFFFF";
        e.currentTarget.style.color = "#000000";
        e.currentTarget.style.borderColor = "#000000"; // Reset border color to white on mouse leave
      }}
    >
      Sign Up
    </button>
  );
};

export default SignUpButton;
