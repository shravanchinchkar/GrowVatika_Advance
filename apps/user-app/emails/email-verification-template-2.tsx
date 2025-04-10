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
  Button,
  Hr,
  Img,
  Link,
} from "@react-email/components";

interface GrowVatikaVerifyEmailProp {
  name: string;
  verifyCode: string;
}

const VerificationEmail = ({ name, verifyCode }: GrowVatikaVerifyEmailProp) => {
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
      <Preview>Verify your Growvatika account</Preview>
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
            borderRadius: "8px",
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
              Welcome to GrowVatika, {name}!
            </Heading>

            <Text
              style={{ fontSize: "16px", lineHeight: "1.5", color: textColor }}
            >
              Thank you for registering with GrowVatika. To complete your
              account setup, please verify your email address using the
              following One-Time Password (OTP):
            </Text>

            <Section style={{ textAlign: "center", margin: "30px 0" }}>
              <Text
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  letterSpacing: "4px",
                  padding: "15px 25px",
                  backgroundColor: "#f0f7f0",
                  color: mainColor,
                  borderRadius: "6px",
                  display: "inline-block",
                  border: `2px dashed ${mainColor}`,
                }}
              >
                {verifyCode}
              </Text>
            </Section>

            <Text
              style={{ fontSize: "16px", lineHeight: "1.5", color: textColor }}
            >
              This code will expire in 2 minutes. If you did not request this
              verification, please ignore this email or contact our support
              team.
            </Text>

            <Hr style={{ borderColor: "#e0e0e0", margin: "30px 0" }} />

            <Text style={{ fontSize: "16px", color: textColor }}>
              Happy Gardening!
            </Text>
            <Text
              style={{ fontSize: "16px", fontWeight: "bold", color: mainColor }}
            >
              The Growvatika Team
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
              © {new Date().getFullYear()} Growvatika.live | All Rights
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
export default VerificationEmail;
