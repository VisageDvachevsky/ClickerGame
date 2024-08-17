const HairStatus = require('../models/hairStatus');

let dynamicInterval = 60 * 1000; 
let lastCheckTime = Date.now();
let pendingResets = 0; 

const resetHair = async (userId) => {
    try {
        let hairStatus = await HairStatus.findOneAndUpdate(
            { userId }, 
            { $set: { hairCount: 5000, resetScheduled: null } },
            { new: true, useFindAndModify: false }
        );

        if (!hairStatus) {
            console.warn(`User not found: ${userId}`);
            return;
        }

        console.log(`Hair reset for user: ${userId}`);
    } catch (error) {
        console.error('Error resetting hair:', error);
    }
};

const checkAndResetHair = async () => {
    try {
        const now = new Date();
        console.log(`Checking for users to reset at ${now}`);

        const usersToReset = await HairStatus.find({ resetScheduled: { $lte: now } });
        console.log(`Found ${usersToReset.length} users to reset.`);

        pendingResets = usersToReset.length;

        for (const user of usersToReset) {
            await resetHair(user.userId);
        }

        console.log('Hair reset job completed.');

        const timeSinceLastCheck = Date.now() - lastCheckTime;

        if (pendingResets > 0) {
            dynamicInterval = Math.max(40 * 1000, dynamicInterval * 0.9); 
        } else {
            dynamicInterval = Math.min(60 * 1000, dynamicInterval * 1.1); 
        }

        lastCheckTime = Date.now();
    } catch (error) {
        console.error('Hair reset job error:', error);
    }
};

const startDynamicScheduler = () => {
    const executeReset = async () => {
        await checkAndResetHair();
        setTimeout(executeReset, dynamicInterval);
    };
    executeReset(); 
};

module.exports = startDynamicScheduler;