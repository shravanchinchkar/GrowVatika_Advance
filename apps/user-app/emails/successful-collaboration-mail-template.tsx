import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface SuccessfulEmailProp {
  nurseryName: string;
  ownerName: string;
  registrationDate: string;
}

export const NurseryCollaborationEmail = ({
  nurseryName,
  ownerName,
  registrationDate,
}: SuccessfulEmailProp) => {
  const backgroundColor = "#f5f5f5";
  const main = {
    backgroundColor,
    fontFamily: "Arial, sans-serif",
    margin: "0",
    padding: "0",
  };

  const container = {
    margin: "40px auto",
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    overflow: "hidden",
  };

  const header = {
    backgroundColor: "#FFF6F4",
    padding: "20px",
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
  const textColor = "#333333";

  return (
    <Html>
      <Head></Head>
      <Preview>
        Welcome to Growvatika - Your Nursery Registration Confirmation
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header section */}
          <Section style={header}>
            <div style={brandTitle}>GrowVatika</div>
            <div style={brandTagLine}>Nursery For EveryOne</div>
          </Section>

          {/* Main Content */}
          <Section style={{ padding: "30px" }}>
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
          
            <Hr style={{ margin: "20px 0" }} />
            <Text>
              If you have any questions or need assistance, please don't
              hesitate to contact our support team at growvatika@gmail.com.
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

          {/* Footer Section */}
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
export default NurseryCollaborationEmail;
