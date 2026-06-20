'use server';

import prisma from '@/lib/prisma';

export async function subscribeToNewsletter(email: string) {
  try {
    if (!email || !email.includes('@')) {
      return { error: 'Please enter a valid email address.' };
    }

    // Check if they are already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email }
    });

    if (existing) {
      if (!existing.active) {
        // Reactivate
        await prisma.newsletterSubscriber.update({
          where: { email },
          data: { active: true }
        });
        return { success: true, message: 'Welcome back! You have been re-subscribed.' };
      }
      return { success: true, message: 'You are already subscribed!' };
    }

    // Create new subscriber
    await prisma.newsletterSubscriber.create({
      data: { email }
    });

    // Send Welcome Email asynchronously
    import('@/lib/email').then(({ sendEmail }) => {
      sendEmail({
        to: email,
        subject: "Welcome to Desimann's Newsletter!",
        templateName: "newsletter_welcome",
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #333;">
            <h1 style="color: #E2B254;">Welcome to Desimann!</h1>
            <p>Thank you for subscribing to our newsletter.</p>
            <p>We're thrilled to have you join our community. You'll now be the first to know about our upcoming product launches, exclusive offers, and behind-the-scenes stories of our authentic, homemade Indian food.</p>
            <p>Stay tuned for delicious updates!</p>
            <p>Best regards,<br>The Desimann Team</p>
          </div>
        `
      }).catch(console.error);
    });

    return { success: true, message: 'Successfully subscribed to the newsletter!' };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { error: 'An unexpected error occurred. Please try again later.' };
  }
}
