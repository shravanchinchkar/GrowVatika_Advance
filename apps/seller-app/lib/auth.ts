import bcrypt from "bcrypt";
import client from "@repo/db/client";
import { authRateLimit } from "./rate-limit";
import { getIp } from "../helper/get-ip-address";
import { SignInSchema } from "@repo/common-types/types";
import CredentialsProvider from "next-auth/providers/credentials";
import { sendSignInSuccessfulMail } from "../helper/send-signin-successful-mail";
import {
  getCurrentFormattedDateTimeString,
  getLocationFromIP,
  getCurrentDateTime,
} from "@repo/shared/utilfunctions";

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "email",
          type: "email",
          placeholder: "abc@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        //validate the user Input
        const inputResult = SignInSchema.safeParse(credentials);
        if (!inputResult.success) {
          console.error("input Eror:", inputResult.error.flatten().fieldErrors);
          throw new Error(
            JSON.stringify({
              success: false,
              message: "Invalid input",
              error: inputResult.error.flatten().fieldErrors,
              status: "400",
            })
          );
        }
        //If the count of signin request goes beyond 5 wihin 5 minutes then  the user gets blocked for 5 minutes, following is its logic
        const IpAddress = await getIp();
        const currentLocation = await getLocationFromIP(IpAddress);
        const { success } = await authRateLimit.limit(IpAddress);
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
          //extract the email and password send by the user
          const { email, password,userTimezone } = inputResult.data;
          //check if the user with the entered email already exists in db
          const sellerExists = await client.seller.findFirst({
            where: {
              email: email,
            },
          });
          if (!sellerExists) {
            console.error("User doesn't exists");
            throw new Error(
              JSON.stringify({
                success: false,
                error: "User doesn't exist",
                status: "404",
              })
            );
          } else {
            const passwordValidation = await bcrypt.compare(
              password,
              sellerExists.password
            );

            if (passwordValidation) {
              const currentDateTime = getCurrentDateTime(userTimezone);

              //send signin email notification
              const emailResponse = await sendSignInSuccessfulMail({
                username: sellerExists.nurseryName,
                email: sellerExists.email,
                accountType: "Seller Account",
                ipAddress: IpAddress,
                signintime: currentDateTime,
                location: currentLocation || "",
              });

              if (!emailResponse.success) {
                console.error(
                  "Failed to send signin successful email notification:",
                  emailResponse.message
                );
                throw new Error(
                  JSON.stringify({
                    success: false,
                    error:
                      "Failed to send signin successful email notification",
                  })
                );
              }

              console.log(
                "Signin Mail send successfully:",
                emailResponse.success,
                emailResponse.message
              );
              return {
                id: sellerExists.id.toString(),
                name: sellerExists.firstName,
                email: sellerExists.email,
                isVerified: sellerExists.isVerified,
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
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // following code is imp because it prevent conflict between the user and seller local signin
  cookies: {
    sessionToken: {
      name: "sellerapp-nextauth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
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
      if (session && session.user) {
        session.user.id = token.id as string;
        session.user.isVerified = token.isVerified as boolean; // Pass isVerified to the session
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
