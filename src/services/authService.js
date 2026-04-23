import { supabase } from './supabaseClient';

// Helper to simulate network delay so the UI loading spinners show up
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  /**
   * MOCKED: Starts the phone OTP flow.
   * @param {string} phone - The phone number
   */
  async sendOtp(phone) {
    await delay(1500); // Simulate 1.5s network request
    // Always return success for testing
    return { data: { message: 'Mock OTP sent' }, error: null };
  },

  /**
   * MOCKED: Verifies the OTP code sent to the phone.
   * @param {string} phone - The phone number
   * @param {string} token - The 6-digit code
   */
  async verifyOtp(phone, token) {
    await delay(1500); // Simulate 1.5s network request
    // Always return success and a fake session for testing
    return { 
      session: { 
        access_token: 'mock-token', 
        user: { id: 'mock-user-123', phone } 
      }, 
      error: null 
    };
  },

  /**
   * MOCKED: Get the current active session
   */
  async getSession() {
    // Always return null session so the app starts at the login UI for testing
    return { session: null, error: null };
  },

  /**
   * MOCKED: Updates the user's profile metadata
   */
  async updateProfile(updates) {
    await delay(1500); // Simulate 1.5s network request
    // Always return success for testing
    return { data: { user: { user_metadata: updates } }, error: null };
  },

  /**
   * MOCKED: User sign out
   */
  async signOut() {
    await delay(500);
    return { error: null };
  },
};
