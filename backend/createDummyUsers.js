// create-user.js

const db = require('./db/database.js');
const User = require('./models/User.js');

async function createUser() {
    try {
        // Synchronize the model with the database
        await db.sync();
        
        // Add a user
        const newUser = await User.create({
            fullName: 'John Doe',
            email: 'john@example.com',
            avatar: 'avatar_url',
            password: 'password',
            token: 'token_value',
            role: 'user',
            isEmailVerified: false,
            emailVerificationToken: 'verification_token',
            emailVerificationTokenExpiresAt: new Date(),
            resetToken: 'reset_token'
        });
        
        console.log('User created:', newUser);
    } catch (error) {
        console.error('Error creating user:', error);
    } finally {
        // Close the database connection
        await db.close();
    }
}

// Call the function to create a user
createUser();
