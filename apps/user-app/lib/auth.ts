import bcrypt from "bcrypt";
import client from "@repo/db/client";
import { getIp } from "../helper/get-ip-address";
import { authRateLimit } from "./rate-limit";
import GoogleProvider from "next-auth/providers/google";
import { SignInSchema } from "@repo/common-types/types";
import { getExpiryDate } from "@repo/shared/utilfunctions";
import { generateVerifyCode } from "@repo/shared/utilfunctions";
import CredentialsProvider from "next-auth/providers/credentials";
import { sendVerificationEmail } from "../helper/sendVerificationMail";


console.log("NextAuth Secret in user-app:",process.env.NEXTAUTH_SECRET);
export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Placeholder",
        },
      },
      async authorize(credentials: any) {
        //validate the user Input
        const inputResult = SignInSchema.safeParse(credentials);
        if (!inputResult.success) {
          console.error(
            "Input Error:",
            inputResult.error.flatten().fieldErrors
          );
          throw new Error(
            JSON.stringify({
              success: false,
              error: "Invalid Inputs",
              status: "400",
            })
          );
        }
        //If the count of signin request gose beyond 5 wihin 5 minutes then  the user gets blocked for 5 minutes, following is its logic
        const IpAddress = await getIp();
        console.log("Ip address is:", IpAddress);
        const { success, pending, limit, reset, remaining } =
          await authRateLimit.limit(IpAddress);
        if (!success) {
          console.error("Signin Limit Exhausted,try again after 5 minutes.");
          throw new Error(
            JSON.stringify({
              success: false,
              error: "Sigin Limit Exhausted,Try again after 5 minutes!",
              status: "429",
            })
          );
        } else {
          console.log("remaining:", remaining);
          //extract the email and password send by the user
          const { email, password } = inputResult.data;
          //check if the user with the entered email already exists in db
          const userExists = await client.user.findFirst({
            where: {
              email: email,
            },
          });
          if (!userExists) {
            console.error("User doesn't exists");
            throw new Error(
              JSON.stringify({
                success: false,
                error: "User doesn't exist",
                status: "404",
              })
            );
          }
          // User has signedup but not verified then the below block
          else if (!userExists.isVerified) {
            const passwordValidation = await bcrypt.compare(
              password,
              userExists.password
            );
            // If Correct Password then execute the below block
            if (passwordValidation) {
              const verifyCode = generateVerifyCode(); //Generate the verify Code for email Authentication
              const expiryDate = getExpiryDate();

              const updateExistingUser = await client.user.update({
                where: { email: userExists.email },
                data: {
                  verifyCode: verifyCode,
                  verifyCodeExpiry: expiryDate,
                },
              });
              if (updateExistingUser) {
                // Send verification email for the unverified user
                const emailResponse = await sendVerificationEmail(
                  userExists.name,
                  userExists.email,
                  verifyCode
                );
                // If error while sending email
                if (!emailResponse.success) {
                  throw new Error(
                    JSON.stringify({
                      success: false,
                      error: emailResponse.message,
                      status: "500",
                    })
                  );
                }
                // If success in sending email
                return {
                  id: userExists.id.toString(),
                  name: userExists.name,
                  email: userExists.email,
                  isVerified: userExists.isVerified,
                  customResponse: {
                    success: true,
                    message:
                      "Verification email sent. Please verify your account.",
                    status: "200",
                  },
                };
              } else {
                return null;
              }
            } else {
              throw new Error(
                JSON.stringify({
                  success: false,
                  error: "Invalid password",
                  status: "401",
                })
              );
            }
          }
          // Initially user has signedin using Google but now the user is signing using credentials then the following code block
          else if (
            userExists.isOAuth &&
            userExists.password === "oauth-no-password"
          ) {
            console.error(
              "OAuth user has not set a password for credential login."
            );
            throw new Error(
              JSON.stringify({
                success: false,
                error: "OAuth user cannot use credentials login",
                status: "403",
              })
            );
          }
          // Normal use Case
          else {
            const passwordValidation = await bcrypt.compare(
              password,
              userExists.password
            );

            if (passwordValidation) {
              return {
                id: userExists.id.toString(),
                name: userExists.name,
                email: userExists.email,
                isVerified: userExists.isVerified,
                customResponse: {
                  success: true,
                  message: "Sign-in successful",
                  status: "200",
                },
              };
            } else {
              console.error("Invalid Password!");
              throw new Error(
                JSON.stringify({
                  success: false,
                  error: "Invalid password",
                  status: "401",
                })
              );
            }
          }
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "userappSecret",
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }: any) => {
      if (account.provider === "google") {
        console.log("Signin withe google!");
        const upsertedUser = await client.user.upsert({
          where: { email: user.email },
          update: {
            name: user.name,
            email: user.email,
            password: "oauth-no-password",
            isOAuth: true,
            isVerified: true,
          },
          create: {
            name: user.name,
            email: user.email,
            password: "oauth-no-password",
            isOAuth: true,
            isVerified: true,
          },
        });
        user.id = upsertedUser.id;
        return true;
      }
      return true;
    },
    async jwt({ token, user }: any) {
      // When the user signs in, `user` contains the object returned by `authorize`
      if (user) {
        token.id = user.id;
        token.isVerified = user.isVerified; // Pass isVerified to the token
        // token.iat = Math.floor(Date.now() / 1000); // Add timestamp to help with session persistence
      }
      return token; //Always return the token to maintain session
    },
    // The session callback helps in displaying the  userId in client component
    session: ({ session, token }: any) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.isVerified = token.isVerified as boolean; // Pass isVerified to the session
      }
      console.log("User session details are:", session);
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
