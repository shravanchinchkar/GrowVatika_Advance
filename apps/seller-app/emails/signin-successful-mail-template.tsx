import React from "react";
import { Section } from "@react-email/components";

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

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
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
      </div>

      {/* Main Content */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "5px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        {/* Welcome Message */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              marginBottom: "15px",
            }}
          >
            {"🏪"}
          </div>
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
            You've successfully signed in to your{" "}
            {accountType}
          </p>
        </div>

        {/* Sign-in Details */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
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
            🔐 Sign-in Details
          </h3>
          <div
            style={{ color: "#666666", fontSize: "14px", lineHeight: "1.6" }}
          >
            <p style={{ margin: "5px 0" }}>
              <strong>Account Type:</strong>{" "}
              {accountType}
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
            ⚠️ Security Notice
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
          If you need any assistance, please contact our customer support team
          at support@growvatika.com.
        </p>
      </div>

      {/* Footer description */}
      <div
        style={{
          textAlign: "center",
          margin: "30px 0 10px",
          color: "#666666",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        <p>© 2025 Growvatika. All rights reserved.</p>
        <p>
          <a
            href="https://growvatika.live/"
            style={{
              color: "#2e7d32",
              textDecoration: "none",
              marginRight: "15px",
            }}
          >
            Terms of Service
          </a>
          <a
            href="https://growvatika.live/"
            style={{ color: "#2e7d32", textDecoration: "none" }}
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
