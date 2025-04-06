import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface SuccessfulEmailProp {
  nurseryName: string;
  ownerName: string;
  registrationDate: string;
  email: string;
  verifyCode: string;
}

export const NurseryCollaborationEmail = ({
  nurseryName,
  ownerName,
  registrationDate,
  email,
  verifyCode,
}: SuccessfulEmailProp) => {
  const main = {
    backgroundColor: "#f6f9fc",
    fontFamily: "Arial, sans-serif",
  };

  const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const header = {
    backgroundColor: "#f0f7f0",
    borderRadius: "5px 5px 0 0",
    padding: "20px",
    textAlign: "center" as const,
  };

  const logo = {
    margin: "0 auto",
    width: "120px",
  };

  const button = {
    backgroundColor: "#f0f7f0",
    borderRadius: "5px",
    color: "#123524",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px 20px",
  };

  const footer = {
    color: "#8898aa",
    fontSize: "12px",
    marginTop: "20px",
    textAlign: "center" as const,
  };

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
  const mainColor = "#2e7d32"; // Forest green color

  const verificationUrl = `https://growvatika.live/verify?email=${encodeURIComponent(email)}&seller=${true}`; //for production
  // const verificationUrl = `http://localhost:3002/verify?email=${encodeURIComponent(email)}&seller=${true}`; //for development
  return (
    <Html>
      <Head></Head>
      <Preview>
        Welcome to Growvatika - Your Nursery Registration Confirmation
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <div style={brandTitle}>GrowVatika</div>
            <div style={brandTagLine}>Nursery For EveryOne</div>
          </Section>
          <Section>
            <Heading as="h1" style={{ color: "#123524" }}>
              Welcome to GrowVatika!
            </Heading>
            <Text>Respected {ownerName},</Text>

            <Text>
              Thank you for registering your nursery "{nurseryName}" on the
              Growvatika platform. We're excited to have you join our community
              of plant sellers!
            </Text>
            <Text>
              Your registration has been received on {registrationDate}. Our
              team will review your details shortly, and once approved, you'll
              be able to start listing your plants and products.
            </Text>
            <Text style={{ fontWeight: "bold" }}>Next Steps:</Text>
            <Text>
              Your One-Time Password(OTP) is:
              <Section style={{ textAlign: "center", margin: "10px 0" }}>
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
            </Text>
            <Text>
              1. Verify your email address by clicking the button below.
            </Text>
            <Text>
              2. Complete your nursery profile with high-quality images
            </Text>
            <Text>3. Add your catalog of plants and products</Text>
            <Text>4. Start receiving orders from plant enthusiasts!</Text>

            <Button style={button} href={verificationUrl}>
              Verify Email Address
            </Button>
            <Hr style={{ margin: "20px 0" }} />
            <Text>
              If you have any questions or need assistance, please don't
              hesitate to contact our support team at support@growvatika.live.
            </Text>
            <Text style={{ marginTop: "20px" }}>
              Happy Growing!
              <br />
              The Growvatika Team
            </Text>
          </Section>
          <Hr />
          <Section style={footer}>
            <Text>
              © 2025 Growvatika. All rights reserved.
              <br />
              Pune, India
            </Text>
            <Text>
              <Link href="https://growvatika.live/privacy">Privacy Policy</Link>{" "}
              •{" "}
              <Link href="https://growvatika.live/terms">Terms of Service</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default NurseryCollaborationEmail;
