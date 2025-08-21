import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "../prisma"; 
import { nextCookies } from "better-auth/next-js";
import { resend } from "lib/email";
 
export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "sqlite", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
        maxPasswordLength: 128,
        autoSignIn: true,
        requireEmailVerification: true
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url}) => {
            await resend.emails.send({
                from: process.env.EMAIL_FROM,
                to: user.email,
                subject: "Verify your email",
                html: `
                    <p>Hi ${user.name},</p>
                    <p>Thanks for signing up! Please verify your email by clicking the link below:</p>
                    <a href="${url}">Verify Email</a>
                `,
            });
        },
    },
    account: {
        accountLinking: {
            enabled: true,
        }
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
    },

    plugins: [nextCookies()],
});