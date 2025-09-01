import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

interface GrowVatikaSellerAccountSetUp {
  name: string;
  email: string;
}

const SellerAccountSetupMail = ({ name, email }: GrowVatikaSellerAccountSetUp) => {
  const mainColor = "#2e7d32"; // Forest green color
  const backgroundColor = "#f5f5f5";
  const textColor = "#333333";

  const brandTitle = {
    fontSize: "30px",
    fontFamily: "'Impact', 'Poppins', sans-serif",
    color: "#123524",
    lineHeight: "1.2",
  };

  const brandTagLine = {
    fontSize: "12px",
    color: "#123524",
    lineHeight: "1.2",
  };
  return (
    <Html>
      <Head />
      <Preview>Setup your Growvatika Seller account</Preview>
      <Body
        style={{
          backgroundColor,
          fontFamily: "Arial, sans-serif",
          margin: "0",
          padding: "0",
        }}
      >
        <Container
          style={{
            margin: "40px auto",
            maxWidth: "600px",
            backgroundColor: "#ffffff",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Section
            style={{
              backgroundColor: "#FFF6F4",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <div style={brandTitle}>GrowVatika</div>
            <div style={brandTagLine}>Nursery For EveryOne</div>
          </Section>

          {/* Content */}
          <Section style={{ padding: "30px" }}>
            <Heading
              style={{
                fontSize: "24px",
                color: textColor,
                marginBottom: "20px",
              }}
            >
              Congratulations , {name}!
            </Heading>

            <Text
              style={{ fontSize: "16px", lineHeight: "1.5", color: textColor }}
            >
              Thankyou for collaborating with GrowVatika. The GrowVatika team
              has verified you details successfully. To complete your seller
              account setup, please follow the below mentioned steps:
            </Text>
            <Section
              style={{ fontSize: "16px", lineHeight: "1.5", color: textColor }}
            >
              <Text
                style={{
                  fontSize: "16px",
                  lineHeight: "1.5",
                  color: "#FF4B4B",
                }}
              >
                Step 1: Copy and past the below link in tablet,laptop or desktop
                only.{" "}
              </Text>
              <p
                style={{
                  fontSize: "14px",
                  wordBreak: "break-all",
                  backgroundColor: "#f5f5f5",
                  padding: "10px",
                  borderRadius: "4px",
                  marginBottom: "25px",
                }}
              >
                {`https://seller.growvatika.live/register?email=${email}`}
              </p>
              <Text
                style={{
                  fontSize: "16px",
                  lineHeight: "1.5",
                  color: textColor,
                }}
              >
                Step 2: Setup your password and click on Create Account button.
                Wait until the email verification page opens.
              </Text>
              <Text
                style={{
                  fontSize: "16px",
                  lineHeight: "1.5",
                  color: textColor,
                }}
              >
                Step 3: Verify your email by entering the OTP sent to your
                register email Id.Wait until the signin page opens.
              </Text>
              <Text
                style={{
                  fontSize: "16px",
                  lineHeight: "1.5",
                  color: textColor,
                }}
              >
                Step 4: Signin using the email and password.Wait until the
                seller dashboard opens.
              </Text>
              <Text
                style={{
                  fontSize: "16px",
                  lineHeight: "1.5",
                  color: textColor,
                }}
              >
                Step 5: Fill all the required details in the seller dashboard to
                start publishing your products.
              </Text>
            </Section>

            <Text
              style={{ fontSize: "16px", lineHeight: "1.5", color: textColor }}
            >
              If you did not request this collaboration, please ignore this
              email or contact our support team at growvatika@gmail.com
            </Text>

            <Hr style={{ borderColor: "#e0e0e0", margin: "30px 0" }} />

            <Text style={{ fontSize: "16px", color: textColor }}>
              Happy Gardening!
            </Text>
            <Text
              style={{ fontSize: "16px", fontWeight: "bold", color: mainColor }}
            >
              The GrowVatika Team
            </Text>
          </Section>

          {/* Footer */}
          <Section
            style={{
              backgroundColor: "#f0f7f0",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <Text
              style={{ fontSize: "14px", color: textColor, margin: "0 0 10px" }}
            >
              © {new Date().getFullYear()} growvatika.live | All Rights
              Reserved
            </Text>
            <Text
              style={{ fontSize: "12px", color: "#777777", marginTop: "15px" }}
            >
              Please do not reply to this email. This mailbox is not monitored.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
export default SellerAccountSetupMail;
