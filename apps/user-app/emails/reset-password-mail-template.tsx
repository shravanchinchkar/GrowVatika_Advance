import React from "react";
import { Section } from "@react-email/components";

const ResetPasswordMailTemplate = ({ email }: { email: string }) => {
  // Access environment variable to determine environment
  const isProduction = process.env.NODE_ENV === "production";

  const baseUrl =
    isProduction === false
      ? process.env.RESET_PASSWORD_DEVELOPMENT_URL
      : process.env.RESET_PASSWORD_PRODUCTION_URL;

  const resetUrl = `${baseUrl}/resetpassword?email=${encodeURIComponent(email)}`;

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

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "5px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            color: "#2e7d32",
            fontSize: "24px",
            marginBottom: "20px",
            fontWeight: "600",
          }}
        >
          Password Reset Request
        </h1>

        <p
          style={{
            color: "#333333",
            fontSize: "16px",
            lineHeight: "1.5",
            marginBottom: "25px",
          }}
        >
          Hello,
        </p>

        <p
          style={{
            color: "#333333",
            fontSize: "16px",
            lineHeight: "1.5",
            marginBottom: "25px",
          }}
        >
          We received a request to reset the password for your Growvatika
          account associated with <strong>{email}</strong>. If you didn't make
          this request, you can safely ignore this email.
        </p>

        <p
          style={{
            color: "#333333",
            fontSize: "16px",
            lineHeight: "1.5",
            marginBottom: "30px",
          }}
        >
          To reset your password, please click the button below:
        </p>

        <div
          style={{
            textAlign: "center",
            margin: "30px 0",
          }}
        >
          <a
            href={resetUrl}
            style={{
              backgroundColor: "#2e7d32",
              color: "#ffffff",
              padding: "12px 30px",
              borderRadius: "4px",
              textDecoration: "none",
              fontWeight: "bold",
              display: "inline-block",
              fontSize: "16px",
            }}
          >
            Reset Your Password
          </a>
        </div>

        <p
          style={{
            color: "#333333",
            fontSize: "16px",
            lineHeight: "1.5",
            marginBottom: "25px",
          }}
        >
          If the button doesn't work, you can also paste this link into your
          browser:
        </p>

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
          {resetUrl}
        </p>

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

        <p
          style={{
            color: "#333333",
            fontSize: "16px",
            lineHeight: "1.5",
          }}
        >
          Happy Gardening,
          <br />
          The Growvatika Team
        </p>
      </div>

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
};

export default ResetPasswordMailTemplate;
