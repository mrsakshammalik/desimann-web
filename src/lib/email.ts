import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";

/**
 * Fetches the SMTP configuration from the database.
 * Returns null if the configuration is not found or if SMTP is disabled.
 */
async function getSmtpConfig() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "singleton" },
  });

  if (!settings || !settings.smtpEnabled) {
    return null;
  }

  return settings;
}

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
  templateName?: string;
};

/**
 * Sends an email using the SMTP settings from the database.
 * If SMTP is disabled or not configured, it logs a warning and skips sending.
 * Logs the success or failure in the EmailLog table.
 */
export async function sendEmail({ to, subject, html, templateName = "custom" }: SendEmailParams) {
  const config = await getSmtpConfig();

  if (
    !config ||
    !config.smtpHost ||
    !config.smtpPort ||
    !config.smtpUser ||
    !config.smtpPass ||
    !config.senderEmail
  ) {
    console.warn("SMTP is not configured or disabled. Skipping email sending.");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass,
      },
    });

    const from = config.senderName
      ? `"${config.senderName}" <${config.senderEmail}>`
      : config.senderEmail;

    await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });

    await prisma.emailLog.create({
      data: {
        recipient: to,
        subject,
        template: templateName,
        status: "SUCCESS",
      },
    });
  } catch (error: any) {
    console.error("Failed to send email:", error);
    await prisma.emailLog.create({
      data: {
        recipient: to,
        subject,
        template: templateName,
        status: "FAILED",
        error: error.message || "Unknown error occurred",
      },
    });
  }
}
