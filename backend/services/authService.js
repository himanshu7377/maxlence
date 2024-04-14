const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { sendEmailVerification } = require('./emailService.js');
const generateToken = require('../utils/generateToken.js');
const { uploadOnCloudinary } = require('../utils/cloudinary.js');


// Function to handle email verification
const verifyEmail = async (req, res) => {
    const { token } = req.params;
    console.log("token from authservice" ,token)

    try {
        // Find the user by verification token
        const user = await User.findOne({ where: { token:token } });

        if (!user) {
            return res.status(404).json({ message: 'User not found or invalid token' });
        }

        // Mark the user's email as verified
        user.emailVerified = true;
        await user.save();

        // Redirect the user to the login page (replace '/login' with your actual login page route)
    //    res.redirect('/login');
    // Send response indicating successful email verification
    return res.status(200).json({ message: 'Email verification successful' });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ message: 'Error verifying email', error });
    }
};


// Register a new user
const registerUser = async (userData, localFilePath) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        // Generate a verification token
        const verificationToken = uuidv4();

        // Upload avatar to Cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
        const origin = 'him.singh7069@gmail.com'
        // console.log("origin-->",origin)
        // Create a new user in the database
        const newUser = await User.create({
            
            fullName: userData.fullName,
            email: userData.email,
            password: hashedPassword,
            avatar: cloudinaryResponse?.secure_url || "https://as2.ftcdn.net/v2/jpg/02/44/43/69/1000_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
            token: verificationToken, // Assign the verification token to the user
            role: userData.role,
        });

        // Send email verification
        await sendEmailVerification(userData.email, verificationToken, origin);

        return newUser;

    } catch (error) {
        throw error;
    }
};

// Login user and generate JWT
const loginUser = async (email, password) => {
    try {
        // Find the user by email
        
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return { statusCode: 404, status: false, message: "User not found!" };
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return { statusCode: 401, status: false, message: 'Invalid credentials' };
        }

        // Generate JWT token
        const token = generateToken(user);

        // Return the user details along with the token
        return { statusCode: 200, status: true, message: 'Successfully logged in', token: token, user: user };


    } catch (error) {
        return { statusCode: 500, status: false, message: 'invalid credentials', error };
    }
};


const changePassword = async (id, newUserDetails) => {
    try {
        // Find the user by ID
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newUserDetails.newPassword, 10);

        // Update the password field of the user with the new hashed password
        await user.update({ password: hashedPassword });

        // Return success message or any other desired response
        return { message: 'Password changed successfully' };
    } catch (error) {
        return { message: error?.message || 'User not found', error };
    }
}

const forgotPassword = async (email, origin) => {
    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }

        // Generate a unique token
        const resetToken = uuidv4();

        // Update user's resetToken in the database
        await user.update({ resetToken });

        // Send password reset email with reset link
        await sendPasswordResetEmail(email, resetToken, origin);

        return { message: 'Password reset email sent successfully' };
    } catch (error) {
        throw error;
    }
};


const resetPassword = async (token, newPassword) => {
    try {
        // Find user by resetToken
        const user = await User.findOne({ where: { resetToken: token } });
        if (!user) {
            throw new Error('Invalid or expired reset token');
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10); // You can adjust the salt rounds as needed

        // Update user's password and resetToken in the database
        await user.update({ password: hashedPassword, resetToken: null });

        return { message: 'Password reset successfully' };
    } catch (error) {
        throw error;
    }
};


module.exports = { registerUser, loginUser, changePassword, forgotPassword, resetPassword ,verifyEmail}