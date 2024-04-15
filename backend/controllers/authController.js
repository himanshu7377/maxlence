const authService = require('../services/authService.js');
const User = require('../models/User.js');
const userService = require('../services/userService');
exports.register = async (req, res) => {
    try {
        // Call registerUser function from authService
        

        const newUser = await authService.registerUser(req.body, req.file.path);

        // Handle the result and send appropriate response
        res.status(201).json(newUser);
    } catch (error) {
        // Handle errors
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    try {
        // Call loginUser function from authService
        const data = await authService.loginUser(req.body.email, req.body.password);

        // Handle the result and send appropriate response
        res.status(data.statusCode || 500).json({ data });
    } catch (error) {
        // Handle errors
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.changePassword = async (req, res) => {
    try {
        // Call forgotPassword function from authService
        const id = req.user.id || req.body.userId;

        const result = await authService.changePassword(id, req.body);
        // Handle the result and send appropriate response
        res.status(200).json(result);

    } catch (error) {
        // Handle errors
        console.error('Error changing password :', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.forgotPassword = async (req, res) => {
    try {
        // Call forgotPassword function from authService
        const origin = req.get('origin');

        const result = await authService.forgotPassword(req.body.email, origin);
        // Handle the result and send appropriate response
        res.status(200).json({ message: 'Password reset link sent successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error sending password reset link:', error?.message || error);
        res.status(500).json({ error: error?.message || 'Internal server error' });
    }
};


exports.resetPassword = async (req, res) => {
    try {
        // Call resetPassword function from authService
        const result = await authService.resetPassword(req.params.token, req.body.password);

        // Handle the result and send appropriate response
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error resetting password:', error);

        res.status(500).json({ error, message: error?.message || 'Internal server error' });
    }


    
};




// Function to handle email verification
exports.verifyEmail = async (req, res) => {
    const { emailVerificationToken } = req.params;

         console.log("email token from verifyemail function ",emailVerificationToken)
    

    try {
        // Find the user by verification token
        const user = await User.findOne({ where: { emailVerificationToken: emailVerificationToken } });
        // console.log("user detail from verifyemail function",user)

        if (!user) {
            return res.status(404).json({ message: 'User not found or invalid token' });
        }

        user.isEmailVerified = true;
        await user.save();

        // Update the user's email verification status
        // await userService.updateUser(user.id, { isEmailVerified: true });

        // Send response indicating successful email verification
        return res.status(200).json({ message: 'Email verification successful' });
    } catch (error) {
        console.error('Error verifying email:', error);
        return res.status(500).json({ message: 'Error verifying email', error });
    }
};