import { PrismaClient } from '@prisma/client';
import GoogleProvider from 'next-auth/providers/google';
import { User as NextAuthUser, Account, Profile, Session } from 'next-auth';

const prisma = new PrismaClient()

export const NEXT_AUTH_CONFIG = {
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID || "",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
          authorization: {
            params: {
              redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
            },
          },
          
        }),
        
      ],
      callbacks: {
        async signIn({
            user,
            account,
          }: {
            user: NextAuthUser;
            account: Account | null;
          }) {
            try {
                // Check if the user already exists in the database by email
                const existingUser = await prisma.user.findUnique({
                  where: { email: user.email as string },
                });
        
                if (!existingUser && account) {
                  // If the user doesn't exist, create a new entry
                  await prisma.user.create({
                    data: {
                      userId: account.providerAccountId as string, // Google ID as userId
                      name: user.name || null,
                      email: user.email || "",
                      profileImage: user.image || null,
                      localGoogleId: account.provider === 'google' ? account.providerAccountId : null,
                      googleResourceId: account.provider === 'google' ? account.id_token : null,
                    },
                  });
                }
        
                return true; // Allow sign-in
              }catch (error) {
                console.error("Error creating user in database:", error);
                return false; // Block sign-in on error
              }
        },
        async redirect({  }) {
          // Always redirect to /dashboard after login
          return "/dashboard";
        },
        jwt: async ({ user, token }: any) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
            },
        session: ({ session, token, user }: any) => {
          if (session.user) {
              session.user.id = token.uid
          }
          return session
        }
      },
      pages: {
        signIn: '/sign-in',  // Customize the sign-in page if needed
      },
      
      secret: process.env.NEXTAUTH_SECRET,  // Important for production environments
}