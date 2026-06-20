'use server';

import prisma from '@/lib/prisma';
import crypto from 'crypto';

function generateReferralCode(): string {
  return crypto.randomBytes(4).toString('hex').toUpperCase(); // 8 characters
}

export async function submitWaitlist(formData: FormData) {
  try {
    const name = formData.get('name')?.toString();
    const email = formData.get('email')?.toString();
    const phone = formData.get('phone')?.toString();
    const city = formData.get('city')?.toString();
    const interestedProduct = formData.get('interestedProduct')?.toString();
    const referredByCode = formData.get('referredByCode')?.toString();

    // Validate basic data
    if (!name || !email || !phone || !city || !interestedProduct) {
      return { error: 'Please fill out all required fields.' };
    }

    // Check if email already exists
    const existingLead = await prisma.waitlistLead.findUnique({
      where: { email },
    });

    if (existingLead) {
      return { error: 'This email is already on the waitlist.' };
    }

    // Generate unique referral code
    let referralCode = generateReferralCode();
    let codeExists = await prisma.waitlistLead.findUnique({ where: { referralCode } });
    while (codeExists) {
      referralCode = generateReferralCode();
      codeExists = await prisma.waitlistLead.findUnique({ where: { referralCode } });
    }

    // Validate referral code if provided
    let validReferredByCode = null;
    if (referredByCode) {
      const referrer = await prisma.waitlistLead.findUnique({
        where: { referralCode: referredByCode }
      });
      if (referrer) {
        validReferredByCode = referredByCode;
      }
    }

    // Create the lead
    const newLead = await prisma.waitlistLead.create({
      data: {
        name,
        email,
        phone,
        city,
        interestedProduct,
        referralCode,
        ...(validReferredByCode ? { referredByCode: validReferredByCode } : {}),
      },
    });

    // Send Welcome Email asynchronously
    import('@/lib/email').then(({ sendEmail }) => {
      sendEmail({
        to: email,
        subject: "Welcome to the Desimann Waitlist!",
        templateName: "waitlist_welcome",
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #333;">
            <h1 style="color: #E2B254;">Welcome, ${name}!</h1>
            <p>Thank you for reserving your spot with Desimann.</p>
            <p>We're thrilled to have you join our journey to bring authentic, homemade Indian food to modern homes.</p>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Your Referral Code:</h3>
              <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #111;">${referralCode}</p>
              <p style="font-size: 14px; color: #666;">Share this code with your friends and family to move up the waitlist and unlock exclusive rewards!</p>
            </div>
            <p>Best regards,<br>The Desimann Team</p>
          </div>
        `
      }).catch(console.error);
    });

    return { 
      success: true, 
      referralCode: newLead.referralCode, 
      message: 'Successfully joined the waitlist!' 
    };
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return { error: 'An unexpected error occurred. Please try again later.' };
  }
}

export async function getReferralStats(referralCode: string) {
  try {
    if (!referralCode) {
      return { error: 'Referral code is required.' };
    }

    const lead = await prisma.waitlistLead.findUnique({
      where: { referralCode },
      include: {
        _count: {
          select: { referrals: true }
        }
      }
    });

    if (!lead) {
      return { error: 'Invalid referral code.' };
    }

    // Determine position - count all leads created before this one
    const positionCount = await prisma.waitlistLead.count({
      where: {
        createdAt: {
          lt: lead.createdAt
        }
      }
    });

    return {
      success: true,
      data: {
        signups: lead._count.referrals,
        position: positionCount + 1, // position is index + 1
        name: lead.name
      }
    };
  } catch (error) {
    console.error('Fetch referral stats error:', error);
    return { error: 'An unexpected error occurred while fetching referral stats.' };
  }
}
