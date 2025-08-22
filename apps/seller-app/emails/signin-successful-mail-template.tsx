import React from "react";
import {
  Body,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

interface SignInEmailTemplateProps {
  username: string;
  accountType: string;
  signintime: string;
  ipAddress: string;
  location: string;
}

export default function SignInEmailTemplate({
  username,
  accountType,
  signintime,
  ipAddress,
  location,
}: SignInEmailTemplateProps) {
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

  const backgroundColor = "#f5f5f5";
  const textColor = "#333333";
  const mainColor = "#2e7d32"; // Forest green color

  return (
    <Html>
      <Head />
      <Preview>GrowVatika seller-accout signin notification</Preview>
      <Body
        style={{
          backgroundColor,
          fontFamily: "Arial, sans-serif",
          margin: "0",
          padding: "0",
        }}
      >
        <div
          style={{
            margin: "40px auto",
            maxWidth: "600px",
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

          {/* Main Content */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "10px 30px",
            }}
          >
            {/* Welcome Message */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "30px",
              }}
            >
              <h2
                style={{
                  color: "#2e7d32",
                  fontSize: "24px",
                  marginBottom: "5px",
                  fontWeight: "600",
                }}
              >
                Welcome Back, {username}!
              </h2>
              <p
                style={{
                  color: "#666666",
                  margin: "0",
                  fontSize: "16px",
                }}
              >
                You've successfully signed in to your {accountType}
              </p>
            </div>

            {/* Sign-in Details */}
            <div
              style={{
                backgroundColor,
                padding: "25px",
                borderRadius: "8px",
                borderLeft: "4px solid #2e7d32",
                marginBottom: "30px",
              }}
            >
              <h3
                style={{
                  color: "#2e7d32",
                  margin: "0 0 15px 0",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
              Sign-in Details
              </h3>
              <div
                style={{
                  color: "#666666",
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}
              >
                <p style={{ margin: "5px 0" }}>
                  <strong>Account Type:</strong> {accountType}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>Time:</strong> {signintime}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>IP Address:</strong> {ipAddress}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>Location:</strong> {location}
                </p>
              </div>
            </div>

            {/* Security Notice */}
            <div
              style={{
                backgroundColor: "#fff3cd",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #ffeaa7",
                marginBottom: "30px",
              }}
            >
              <h4
                style={{
                  color: "#856404",
                  margin: "0 0 10px 0",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
              Security Notice
              </h4>
              <p
                style={{
                  color: "#856404",
                  margin: "0",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}
              >
                If this wasn't you, please secure your account immediately by
                changing your password and contacting our support team.
              </p>
            </div>

            {/* Help Message */}
            <p
              style={{
                color: "#333333",
                fontSize: "16px",
                lineHeight: "1.5",
                marginBottom: "25px",
              }}
            >
              If you need any assistance, please contact our customer support
              team at growvatika@gmail.com.
            </p>
            <Hr style={{ borderColor: "#e0e0e0", margin: "10px 0" }} />
            <Text style={{ fontSize: "16px", color: textColor }}>
              Happy Gardening!
            </Text>
            <Text
              style={{ fontSize: "16px", fontWeight: "bold", color: mainColor }}
            >
              The GrowVatika Team
            </Text>
          </div>

          {/* Footer description */}
          <Section
            style={{
              backgroundColor: "#f0f7f0",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <Text
              style={{ fontSize: "14px", color: "#333333", margin: "0 0 10px" }}
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
        </div>
      </Body>
    </Html>
  );
}
