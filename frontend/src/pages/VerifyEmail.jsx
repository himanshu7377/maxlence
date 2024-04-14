import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { verifyemailApi } from '../constants/apiUrl';
import axios from 'axios'; // Import Axios for making HTTP requests

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { emailVerificationToken } = useParams(); // Extract the token from the URL
  console.log("token from verifyemail.jsx", emailVerificationToken);
  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.put(`${verifyemailApi}/${emailVerificationToken}`);

        console.log('Response from server:', response);

        // Check the response status to determine the outcome
        if (response.status == 200) {
          // If verification is successful, update state with success message
          setVerificationStatus('success');
          // navigate('/login');
        } else {
          // If the response status is not 200, consider it as an error
          setVerificationStatus('error');
        }
      } catch (error) {
        // If there's an error in the request, update state with error message
        setVerificationStatus('error');
        console.error('Error verifying token:', error);
      }
    };

    verifyToken();
  }, [emailVerificationToken, navigate]);

  useEffect(() => {
    console.log("verificationStatus is", verificationStatus);
  }, [verificationStatus]);

  const handleLogin = () => {
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <div className="flex items-center justify-center mb-6 text-green-500">
          <FaCheckCircle className="w-12 h-12 mr-2" />
          <h2 className="text-xl font-bold">Email Verified</h2>
        </div>
        {verificationStatus === 'success' ? (
          <>
            <p className="mb-4 text-gray-700">
              Your email has been successfully verified. Please login again to continue.
            </p>
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Login
            </button>
          </>
        ) : (
          <p className="mb-4 text-red-500">Verification failed. Please try again.</p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
